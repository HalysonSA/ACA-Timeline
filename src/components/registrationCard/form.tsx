import { useEffect, useState } from 'react';
import { InputsRegister } from '../../types/hookForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { supabase } from '@/lib/supabaseClient';
import InputMask from 'react-input-mask';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<InputsRegister>();

  useEffect(() => {
    const entries = Object.keys(errors);

    entries.map((key) => {
      if (key) {
        switch (key) {
          case 'name':
            setTimeout(() => {
              clearErrors('name');
            }, 5000);
            break;
          case 'CPF':
            setTimeout(() => {
              clearErrors('CPF');
            }, 5000);
            break;
          case 'phone_number':
            setTimeout(() => {
              clearErrors('phone_number');
            }, 5000);
            break;
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
          case 'passwordConfirm':
            setTimeout(() => {
              clearErrors('passwordConfirm');
            }, 5000);
            break;
          default:
            break;
        }
      }
    });
  }, [
    errors.email,
    errors.password,
    errors.name,
    errors.CPF,
    errors.phone_number,
    errors.passwordConfirm,
  ]);

  const onSubmit: SubmitHandler<InputsRegister> = async ({
    name,
    CPF,
    phone_number,
    email,
    password,
  }) => {
    //Insert in supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name: name,
          cpf: CPF,
          phone_number: phone_number,
          email: email,
          password: password,
        },
      ])
      .single();

    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full mb-20 gap-y-10">
      <div className="w-1/2 mt-32">
        <div className="flex flex-col text-5xl text-center text-white ">
          <label>
            <h1>Ainda não tem conta?</h1>
          </label>
          <label>
            <h1 className="font-bold ">Registre-se!</h1>
          </label>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-2/6 gap-y-4"
      >
        <div className="flex flex-col w-full border-b border-cyan-600  gap-y-1.5 ">
          <label className="text-white">Nome completo</label>
          <input
            type="text"
            className="h-10 px-2 bg-gray-100 focus:outline-none"
            {...register('name', {
              required: true,
              pattern: {
                value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                message: 'Nome não pode conter números ou caracteres especiais',
              },
            })}
          />
        </div>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        <div className="flex flex-col w-full border-b border-cyan-600  gap-y-1.5 ">
          <label className="text-white">CPF</label>
          <InputMask
            mask="999.999.999-99"
            type="text"
            className="h-10 px-2 bg-gray-100 focus:outline-none"
            {...register('CPF', {
              required: true,
              pattern: {
                value: /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/,
                message: 'Digite o CPF no formato xxx.xxx.xxx-xx',
              },
            })}
          />
        </div>
        {errors.CPF && (
          <span className="text-red-500">{errors.CPF.message}</span>
        )}
        <div className="flex flex-col w-full border-b border-cyan-600  gap-y-1.5 ">
          <label className="text-white">Número de telefone</label>
          <InputMask
            mask="(99) 99999-9999"
            type="tel"
            className="h-10 px-2 bg-gray-100 focus:outline-none"
            {...register('phone_number', {
              required: true,
              pattern: {
                value: /^\([1-9]{2}\) [0-9]{5}\-[0-9]{4}$/,
                message:
                  'Digite o número de telefone no formato (xx) xxxxx-xxxx',
              },
            })}
          />
        </div>
        {errors.phone_number && (
          <span className="text-red-500 ">{errors.phone_number.message}</span>
        )}
        <div className="flex flex-col w-full border-b border-cyan-600  gap-y-1.5 ">
          <label className="text-white">Email</label>
          <input
            type="text"
            className="h-10 px-2 bg-gray-100 focus:outline-none"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                message: 'Digite um email válido',
              },
            })}
          />
        </div>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <div className="flex flex-col w-full border-b border-cyan-600  gap-y-1.5 ">
          <label className="text-white">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="h-10 px-2 bg-gray-100 focus:outline-none"
            {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: 'A senha deve ter no mínimo 6 caracteres',
              },
            })}
          />
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <div className="flex flex-col w-full border-b border-cyan-600  gap-y-1.5 ">
          <label className="text-white">Repita a senha</label>
          <div className="flex flex-row">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-11/12 h-10 px-2 bg-gray-100 focus:outline-none"
              {...register('passwordConfirm', {
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
        {errors.passwordConfirm && (
          <span className="text-red-500">{errors.passwordConfirm.message}</span>
        )}

        <button
          type="submit"
          className="flex items-center justify-center w-full h-12 text-xl transition-all border border-white  text-white hover:bg-cyan-700 "
        >
          Salvar
        </button>
      </form>
    </div>
  );
}