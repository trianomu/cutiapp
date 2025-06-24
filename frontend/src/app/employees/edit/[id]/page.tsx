'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import EmployeeForm from '@/components/EmployeeForm'
import { getEmployeeById, updateEmployee } from '@/api/employee'
import { useAuthRedirect } from '@/hooks/authRedirect'

export default function EditEmployeePage() {
   useAuthRedirect()
  const [data, setData] = useState<any>(null)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employee = await getEmployeeById(Number(params.id))
        setData(employee)
      } catch (err) {
        alert('Gagal mengambil data pegawai')
        router.push('/employees')
      }
    }

    if (params.id) fetchData()
  }, [params.id, router])

  const handleSubmit = async (form: any) => {
    try {
      await updateEmployee(Number(params.id), form)
      router.push('/employees')
    } catch (err) {
      alert('Gagal mengupdate pegawai')
    }
  }

  if (!data) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Edit Pegawai</h1>
      <EmployeeForm onSubmit={handleSubmit} defaultValues={data} />
    </div>
  )
}