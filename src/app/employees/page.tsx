import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import {EmployeeTable} from '@/components/EmployeeTable';

export default async function EmployeesPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Empleados</h1>
      <EmployeeTable />
    </div>
  );
}
