'use client';
import { useEffect, useState } from 'react';
import { fetchWrapper } from '@/lib/fetchWrapper';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchWrapper('/departments');
        setDepartments(data);
      } catch (error) {
        console.error('Error loading departments:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDepartments();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Cargando...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {departments.map((department) => (
          <TableRow key={department.id}>
            <TableCell>{department.name}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">Editar</Button>
              <Button variant="destructive" size="sm">Eliminar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DepartmentTable;
