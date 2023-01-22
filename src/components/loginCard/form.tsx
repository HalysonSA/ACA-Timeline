import { useEffect, useState } from 'react';
import { InputsLogin } from '../../types/hookForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@/types/users';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { RiAccountCircleFill } from 'react-icons/ri';

export default function SignInForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [findedUser, setFindedUser] = useState<undefined | string>('na');

  const [cookies, setCookie] = useCookies(['user']);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<InputsLogin>();

  useEffect(() => {
    const entries = Object.keys(errors);

    entries.map((key) => {
      if (key) {
        switch (key) {
          case 'email':
            setTimeout(() => {
              clearErrors('email');
            }, 5000);
            break;
          case 'password':
            setTimeout(() => {
              clearErrors('password');
            }, 5000);
            break;
          default:
            break;
        }
      }
    });
  }, [errors.email, errors.password]);

  const onSubmit: SubmitHandler<InputsLogin> = async ({ email, password }) => {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .eq('password', password);

    if (data) {
      if (data.length === 0) {
        setFindedUser(undefined);
        setTimeout(function () {
          setFindedUser('na');
        }, 3000);
      } else {
        const user: User = data[0];

        setFindedUser(user.username);
        setCookie('user', data[0], { path: '/', maxAge: 24 * 60 * 60 });

        switch (data[0].role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'employee':
            router.push('/admin');
          default:
            router.push('/');
            break;
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-4/5 bg-white">
      <div className="flex items-center justify-center my-16">
        <RiAccountCircleFill size={150} fill="#0891b2" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex flex-col w-full border-b border-cyan-600  gap-y-1.5 ">
          <label className="">Usuário</label>
          <input
            type="text"
            className="h-10 px-2 bg-gray-100 focus:outline-none"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Digite um email válido',
              },
            })}
          />
        </div>

        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <div className="flex flex-col w-full border-b border-cyan-600  gap-y-1.5 ">
          <label className="">Senha</label>
          <div className="flex flex-row">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-11/12 h-10 px-2 bg-gray-100 focus:outline-none"
              {...register('password', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'A senha deve ter no mínimo 6 caracteres',
                },
              })}
            />
            <button
              className="flex items-center justify-center w-1/12 bg-gray-100 cursor-pointer focus:outline-none"
              onMouseDown={handleShowPassword}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} fill="#0891b2" />
              ) : (
                <AiOutlineEye size={20} fill="#0891b2" />
              )}
            </button>
          </div>
        </div>

        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <div className="flex flex-row items-center justify-between text-sm">
          <div className="flex flex-row items-center gap-x-1.5">
            <input
              type="checkbox"
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
              className="w-4 h-4 border appearance-none cursor-pointer indeterminate:bg-gray-100 border-cyan-600 checked:bg-cyan-600 checked:tex-white "
            />
            <label>Lembrar de mim</label>
          </div>
          <a href="#" className="hover:underline hover:text-cyan-600">
            Esqueceu a senha?
          </a>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full h-12 text-xl text-white transition-all bg-cyan-600 hover:bg-cyan-700 "
        >
          Entrar
        </button>
        {findedUser === undefined && (
          <span className="text-red-500">Usuário ou senha incorretos </span>
        )}
      </form>
    </div>
  );
}
