'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteEmployee, Employee, getEmployees } from '@/api/employee'
import { useAuthRedirect } from '@/hooks/authRedirect'


export default function EmployeeList() {
   useAuthRedirect()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [token, setToken] = useState('')
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('token')
    if (stored) {
      setToken(stored)
      fetchEmployees(stored)
    }
  }, [])

  const fetchEmployees = async (t: string) => {
    try {
      const data = await getEmployees()
      setEmployees(data)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id)
      fetchEmployees(token)
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="w-full mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Daftar Pegawai</h1>

      <div className="flex justify-end mb-4">
        <Link
          href="/employees/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          + Tambah Pegawai
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Telepon</th>
              <th className="px-6 py-3">Jenis Kelamin</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{emp.firstName} {emp.lastName}</td>
                <td className="px-6 py-4">{emp.email}</td>
                <td className="px-6 py-4">{emp.phoneNumber}</td>
                <td className="px-6 py-4">{emp.gender === 'MALE' ? 'Laki-laki' : 'Perempuan'}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <Link
                    href={`/employees/edit/${emp.id}`}
                    className="inline-block px-3 py-1 bg-yellow-400 text-white rounded-md text-xs hover:bg-yellow-500 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="inline-block px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

}