import { z } from 'zod'

export const employeeSchema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto'),
  email: z.string().email('Email inválido'),
  departmentId: z.string().min(1, 'Departamento requerido'),
  hireDate: z.string().min(1, 'Fecha de contratación requerida'),
  salary: z.number().min(0, 'Salario debe ser positivo'),
})

export const departmentSchema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto'),
  description: z.string().optional(),
})