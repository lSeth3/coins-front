'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession } from '../context/AuthContext';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto'),
  description: z.string().optional(),
});

type DepartmentFormProps = {
  departmentId?: string; // Para editar un departamento
};

export default function DepartmentForm({ departmentId }: DepartmentFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { session } = useSession();

  const onSubmit = async (data: any) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/departments${departmentId ? `/${departmentId}` : ''}`, {
        method: departmentId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Error al guardar el departamento');
      }

      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input id="name" {...register('name')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea id="description" {...register('description')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

      <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        {loading ? 'Procesando...' : departmentId ? 'Actualizar Departamento' : 'Crear Departamento'}
      </button>
    </form>
  );
}
