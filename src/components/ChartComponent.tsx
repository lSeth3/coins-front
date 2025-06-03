// components/ChartComponent.js
"use client";

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Department = {
  id: number;
  nombre: string;
};

type Employee = {
  id: number;
  departamento_id: number;
  // add other fields if needed
};

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
};

const ChartComponent = () => {
  const [data, setData] = useState<ChartData>({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await fetch('http://localhost:3000/api/departments');
        const employeesResponse = await fetch('http://localhost:3000/api/empleados');
        const departments: Department[] = await departmentsResponse.json();
        const employees: Employee[] = await employeesResponse.json();

        const labels = departments.map((department: Department) => department.nombre);
        const employeeCounts = departments.map((department: Department) =>
          employees.filter((employee: Employee) => employee.departamento_id === department.id).length
        );

        setData({
          labels: labels,
          datasets: [{
            label: 'Empleados por Departamento',
            data: employeeCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h2 className="text-lg font-semibold">Empleados por Departamento</h2>
      <Bar data={data} />
    </div>
  );
};

export default ChartComponent;
