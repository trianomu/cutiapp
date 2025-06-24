'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import LeaveForm from '@/components/LeaveForm'
import { getLeaveById, updateLeave } from '@/api/leave'
import { Leave } from '@/api/leave'
import { useAuthRedirect } from '@/hooks/authRedirect'

export default function EditLeavePage() {
  useAuthRedirect()
  const router = useRouter()
  const params = useParams()
  const [leave, setLeave] = useState<Leave | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const data = await getLeaveById(Number(params.id))
        setLeave(data)
      } catch (err) {
        console.error('Gagal mengambil data cuti:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLeave()
  }, [params.id])

  const handleSubmit = async (formData: any) => {
    try {
      await updateLeave(Number(params.id), formData)
      router.push('/leaves')
    } catch (err: any) {
      alert(err.message || 'Gagal mengedit cuti.')
    }
  }

  if (loading) return <p className="p-4">Memuat data...</p>
  if (!leave) return <p className="p-4 text-red-500">Data tidak ditemukan.</p>

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Edit Cuti Pegawai</h1>
      <LeaveForm onSubmit={handleSubmit} defaultValues={leave} />
    </div>
  )
}