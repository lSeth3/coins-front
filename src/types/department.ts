export interface Department {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export type CreateDepartmentDto = Omit<Department, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateDepartmentDto = Partial<CreateDepartmentDto>