'use client';

import { useEffect, useState } from 'react';
import { useSession } from '../context/AuthContext';

type EmployeeDetailProps = {
  employeeId: string;
};

export default function EmployeeDetail({ employeeId }: EmployeeDetailProps) {
  const { session } = useSession();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadEmployeeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error al cargar los detalles del empleado');
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadEmployeeData();
  }, [employeeId, session.token]);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Cargando...</div>;
  }

  if (errorMessage) {
    return <p className="text-red-600">{errorMessage}</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Detalles del Empleado</h2>
      <p><strong>Nombre:</strong> {employee.name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Departamento:</strong> {employee.department?.name || 'Sin departamento'}</p>
      <p><strong>Fecha de Contratación:</strong> {new Date(employee.hireDate).toLocaleDateString()}</p>
      <p><strong>Salario:</strong> ${employee.salary}</p>
    </div>
  );
}
