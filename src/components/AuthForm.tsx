'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession } from '../context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthFormProps = {
  isLogin: boolean;
};

export default function AuthForm({ isLogin }: AuthFormProps) {
  const { login } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    ...(!isLogin
      ? {
          name: z.string().min(2, 'Nombre demasiado corto'),
          company: z.string().min(2, 'Nombre de empresa inválido'),
        }
      : {}),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const onSubmit = async (data: any) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.access_token) {
        login(result.access_token);
        router.push('/dashboard');
      } else {
        setErrorMessage(result.message || 'Credenciales inválidas');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      {!isLogin && (
        <>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input id="name" {...register('name')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Empresa</label>
            <input id="company" {...register('company')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
            {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
          </div>
        </>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" type="email" {...register('email')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input id="password" type="password" {...register('password')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

      <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        {loading ? 'Procesando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
      </button>
    </form>
  );
}
