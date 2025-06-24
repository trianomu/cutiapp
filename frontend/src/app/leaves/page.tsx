'use client';
import { useEffect, useState } from 'react';
import { deleteLeave, getLeaves, Leave } from '@/api/leave';
import Link from 'next/link';
import { useAuthRedirect } from '@/hooks/authRedirect';

export default function LeaveList() {
   useAuthRedirect()
  const [leaves, setLeaves] = useState<Leave[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLeaves();
        setLeaves(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus cuti ini?')) return;

    try {
      await deleteLeave(id);
      setLeaves((prev) => prev.filter((leave) => leave.id !== id));
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan saat menghapus');
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Daftar Cuti Pegawai</h1>


      <div className="flex justify-end mb-4">
        <Link
          href="/leaves/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          + Tambah Cuti
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">

        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Pegawai</th>
              <th className="px-4 py-3">Tanggal Mulai</th>
              <th className="px-4 py-3">Tanggal Selesai</th>
              <th className="px-4 py-3">Alasan Cuti</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr
                  key={leave.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3 font-medium">{index + 1}</td>
                  <td className="px-4 py-3">
                    {leave.employee?.firstName} {leave.employee?.lastName}
                  </td>
                  <td className="px-4 py-3">{new Date(leave.tanggalMulai).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-3">  {new Date(leave.tanggalSelesai).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-3">{leave.alasan}</td>
                  <td className="px-4 py-4 text-center space-x-2">
                    <Link
                      href={`/leaves/edit/${leave.id}`}
                      className="inline-block px-3 py-1 bg-yellow-400 text-white rounded-md text-xs hover:bg-yellow-500 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(leave.id)}
                       className="inline-block px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
                  Belum ada data cuti.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}