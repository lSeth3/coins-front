import DepartmentForm from '@/components/DepartmentForm';

export default function NewDepartmentPage() {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Departamento</h1>
      <DepartmentForm />
    </div>
  );
}
