"use client";
import React, { useEffect, useState } from 'react';
import SummaryCard from '@/components/DashboardCards';
import ChartComponent from '@/components/ChartComponent';
import QuickLinks from '@/components/QuickLinks';

const Home = () => {
  const [totalEmpleados, setTotalEmpleados] = useState(0);
  const [totalDepartamentos, setTotalDepartamentos] = useState(0);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const empleadosResponse = await fetch('http://localhost:3000/api/empleados');
        const departamentosResponse = await fetch('http://localhost:3000/api/departments');
        const empleados = await empleadosResponse.json();
        const departamentos = await departamentosResponse.json();

        setTotalEmpleados(empleados.length);
        setTotalDepartamentos(departamentos.length);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dashboard de Empleados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard title="Total Empleados" value={totalEmpleados} />
        <SummaryCard title="Total Departamentos" value={totalDepartamentos} />
      </div>
      <ChartComponent />
      <QuickLinks />
    </div>
  );
};

export default Home;
