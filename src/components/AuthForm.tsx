// src/components/AuthForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Definimos el tipo de props
type AuthFormProps = {
  isLogin: boolean
}

export default function AuthForm(props: AuthFormProps) {
  // Primero definimos el esquema dinámico basado en props.isLogin
  const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    ...(!props.isLogin ? {
      name: z.string().min(2, 'Nombre demasiado corto'),
      company: z.string().min(2, 'Nombre de empresa inválido'),
    } : {})
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: any) => {
    // Lógica de autenticación
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      {!props.isLogin && (
        <>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message?.toString()}</p>}
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Empresa
            </label>
            <input
              id="company"
              {...register('company')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
            {errors.company && <p className="text-red-500 text-sm">{errors.company.message?.toString()}</p>}
          </div>
        </>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {props.isLogin ? 'Iniciar sesión' : 'Registrarse'}
      </button>
    </form>
  )
}