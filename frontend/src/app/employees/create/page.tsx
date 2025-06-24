'use client'
import { useRouter } from 'next/navigation'
import EmployeeForm from '@/components/EmployeeForm'
import { createEmployee } from '@/api/employee'
import { useAuthRedirect } from '@/hooks/authRedirect'

export default function CreateEmployeePage() {
   useAuthRedirect()
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem('token') || ''
      await createEmployee(data)
      router.push('/employees')
    } catch (err) {
      alert('Gagal menambahkan pegawai')
    }
  }

  return (
      <div className="w-full mx-auto px-4 py-6">
        <div className="flex items-center justify-center px-4">
          <div className="w-full bg-white p-8 rounded-2xl shadow-md">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Pegawai Baru</h1>
            <EmployeeForm onSubmit={handleSubmit} />
          </div>
        </div>

      </div>
  )
}