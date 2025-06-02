export interface Employee {
  id: string
  name: string
  email: string
  department?: {
    id: string
    name: string
  }
  status: 'active' | 'inactive'
  hireDate: string
  salary: number
  createdAt: string
  updatedAt: string
}