// src/components/EmployeeTable.tsx
'use client'

import { useMemo, useState, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
} from '@tanstack/react-table'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { Employee } from '@/types/employee'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function EmployeeTable() {
  const [data, setData] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  // Definición de columnas
  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre',
        cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
      },
      {
        accessorKey: 'department.name',
        header: 'Departamento',
        cell: ({ row }) => (
          <div className="capitalize">{row.original.department?.name || 'Sin departamento'}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => (
          <div className="capitalize">
            {row.getValue('status') === 'active' ? 'Activo' : 'Inactivo'}
          </div>
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Acciones',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Editar
            </Button>
            <Button variant="destructive" size="sm">
              Eliminar
            </Button>
          </div>
        ),
      },
    ],
    []
  )

  // Carga de datos
  useEffect(() => {
    const loadData = async () => {
      try {
        const employees = await fetchWrapper('/employees')
        setData(employees)
      } catch (error) {
        console.error('Error loading employees:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Configuración de la tabla
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Filtros */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nombre..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Tabla */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}