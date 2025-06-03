// components/QuickLinks.js
import React from 'react';
import { useRouter } from 'next/navigation';

const QuickLinks = () => {
  const router = useRouter();

  const handleEmpleadosClick = () => {
    router.push('/empleados');
  };

  const handleDepartamentosClick = () => {
    router.push('/departamentos');
  };

  return (
    <div className="flex justify-around mt-4">
      <button 
        onClick={handleEmpleadosClick} 
        className="bg-blue-500 text-white p-2 rounded"
      >
        CRUD Empleados
      </button>
      <button 
        onClick={handleDepartamentosClick} 
        className="bg-green-500 text-white p-2 rounded"
      >
        CRUD Departamentos
      </button>
    </div>
  );
};

export default QuickLinks;
