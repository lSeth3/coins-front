'use client';

import { useEffect, useState } from 'react';
import { useSession } from '../context/AuthContext';

type DepartmentDetailProps = {
  departmentId: string;
};

export default function DepartmentDetail({ departmentId }: DepartmentDetailProps) {
  const { session } = useSession();
  const [department, setDepartment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadDepartmentData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/departments/${departmentId}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error al cargar los detalles del departamento');
        }
        const data = await response.json();
        setDepartment(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadDepartmentData();
  }, [departmentId, session.token]);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Cargando...</div>;
  }

  if (errorMessage) {
    return <p className="text-red-600">{errorMessage}</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Detalles del Departamento</h2>
      <p><strong>Nombre:</strong> {department.name}</p>
      <p><strong>Descripción:</strong> {department.description || 'Sin descripción'}</p>
    </div>
  );
}
