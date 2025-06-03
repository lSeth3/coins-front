import EmployeeForm from '@/components/EmployeeForm';

export default function NewEmployeePage() {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Empleado</h1>
      <EmployeeForm />
    </div>
  );
}
