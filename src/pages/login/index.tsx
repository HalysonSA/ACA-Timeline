import { InputsLogin } from '@/types/hookForm';
import { Users } from '@/types/users';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { supabase } from '../../lib/supabaseClient';

const SignIn = () => {
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
    watch,
    formState: { errors },
  } = useForm<InputsLogin>();

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
        const user: Users = data[0];

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
    <div className="flex flex-row items-center justify-center min-h-screen py-8 min-w-screen bg-cyan-900 font-Roboto">
      <div className="w-11/12 h-screen bg-white shadow-2xl md:h-screen-3/4 md:w-1/2 lg:w-1/4 rounded-xl shadow-cyan-600">
        <div className="flex flex-col items-center justify-center w-full h-full px-2 text-center">
          <Image src="logo.svg" alt="Logo" width={'150'} height={'150'} />
          <h1 className="mt-4 text-2xl font-bold text-gray-800">Login</h1>

          <p className="mt-2 text-sm text-gray-500 w-52">
            Entre com seu usuário e senha
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full  h-1/2 mt-5"
          >
            <div className="flex flex-col items-center justify-center w-full gap-3 ">
              <input
                type="text"
                placeholder="Usuário"
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Endereço de email inválido',
                  },
                })}
                className="w-3/4 px-4 py-2 text-gray-800  bg-gray-100 rounded-lg h-9 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              />

              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}

              <div className="flex flex-row items-center w-3/4 h-9 ">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  {...register('password', {
                    required: true,
                  })}
                  className="z-10 w-11/12 px-4 py-2 h-9 text-gray-800 bg-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                />
                <button
                  className="p-2 m-0 bg-gray-100 rounded-r-lg h-9 outline-none text-cyan-600 hover:text-cyan-700 "
                  onMouseDown={() => handleShowPassword()}
                >
                  {showPassword ? (
                    <AiFillEye size={24} />
                  ) : (
                    <AiFillEyeInvisible size={24} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-3/4 px-4 py-2 mt-4 text-white rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-500"
              >
                Entrar
              </button>

              {findedUser === undefined && (
                <span className="text-sm text-red-500">
                  Usuário ou senha incorretos
                </span>
              )}

              <p className="mt-4 text-sm text-gray-500">
                Ainda não tem uma conta?{' '}
                <Link
                  href={'login/signup'}
                  className="text-cyan-600 hover:underline"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
