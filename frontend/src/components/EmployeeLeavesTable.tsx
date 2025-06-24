'use client';

import { Employee } from '@/api/employee';

interface Props {
  employees: Employee[];
}

export default function EmployeeLeavesTable({ employees }: Props) {
  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Pegawai dan Cuti</h1>
      {employees.length > 0 ? (
        employees.map((emp) => (
          <div key={emp.id} className="mb-8 bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">
              {emp.firstName} {emp.lastName}
            </h2>
            <p className="text-gray-600 mb-2">Email: {emp.email}</p>

            {emp.leaves.length > 0 ? (
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-3 py-2">Tanggal Mulai</th>
                      <th className="px-3 py-2">Tanggal Selesai</th>
                      <th className="px-3 py-2">Alasan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emp.leaves.map((leave) => (
                      <tr key={leave.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          {new Date(leave.tanggalMulai).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-3 py-2">
                          {new Date(leave.tanggalSelesai).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-3 py-2">{leave.alasan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Belum ada cuti.</p>
            )}
          </div>
        ))
      ) : (
        <p>Tidak ada data pegawai.</p>
      )}
    </div>
  );
}