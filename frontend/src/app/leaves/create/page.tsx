'use client';
import { useRouter } from 'next/navigation';
import LeaveForm from '@/components/LeaveForm';
import { createLeave } from '@/api/leave';
import { useAuthRedirect } from '@/hooks/authRedirect';

export default function CreateLeavePage() {
  useAuthRedirect()
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createLeave(data)
      router.push('/leaves')
    } catch (err) {
      alert('Gagal menambahkan cuti (cek validasi max 12 hari / 1x per bulan)')
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-6">
      <div className="flex items-center justify-center px-4">
        <div className="w-full bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-xl font-bold mb-4">Tambah Cuti Pegawai</h1>
          <LeaveForm onSubmit={handleSubmit} />
        </div>
      </div>

    </div>
  );
}