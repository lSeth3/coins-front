import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DepartmentTable from '@/components/DepartmentTable';

export default async function DepartmentsPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Departamentos</h1>
      <DepartmentTable />
    </div>
  );
}
