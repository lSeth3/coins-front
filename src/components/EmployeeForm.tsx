'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession } from '../context/AuthContext';
import { useState, useEffect } from 'react';

type EmployeeFormProps = {
  employeeId?: string; // Para editar un empleado
};

const schema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto'),
  email: z.string().email('Email inválido'),
  departmentId: z.string().min(1, 'Departamento requerido'),
  hireDate: z.string().min(1, 'Fecha de contratación requerida'),
  salary: z.number().min(0, 'Salario debe ser positivo'),
});

export default function EmployeeForm({ employeeId }: EmployeeFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { session } = useSession();

// En EmployeeForm.tsx
useEffect(() => {
  if (employeeId) {
    const loadEmployeeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${employeeId}`, {
          headers: {
            Authorization: session?.token ? `Bearer ${session.token}` : '',
          },
        });
        const data = await response.json();
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('departmentId', data.departmentId);
        setValue('hireDate', data.hireDate);
        setValue('salary', data.salary);
      } catch (error) {
        console.error('Error loading employee data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEmployeeData();
  }
}, [employeeId, setValue, session?.token]);

  const onSubmit = async (data: any) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees${employeeId ? `/${employeeId}` : ''}`, {
        method: employeeId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: session?.token ? `Bearer ${session.token}` : '',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Error al guardar el empleado');
      }

      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Error desconocido');
      }
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" type="email" {...register('email')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">Departamento</label>
        <select id="departmentId" {...register('departmentId')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
          {/* Aquí deberías mapear los departamentos disponibles */}
          <option value="">Seleccionar departamento</option>
          {/* Ejemplo: <option value="1">Departamento 1</option> */}
        </select>
        {errors.departmentId && <p className="text-red-500 text-sm">{errors.departmentId.message}</p>}
      </div>
      <div>
        <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">Fecha de Contratación</label>
        <input id="hireDate" type="date" {...register('hireDate')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
        {errors.hireDate && <p className="text-red-500 text-sm">{errors.hireDate.message}</p>}
      </div>
      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salario</label>
        <input id="salary" type="number" {...register('salary')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
        {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
      </div>

      {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

      <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        {loading ? 'Procesando...' : employeeId ? 'Actualizar Empleado' : 'Crear Empleado'}
      </button>
    </form>
  );
}
