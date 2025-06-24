'use client';
import { Employee, getEmployees } from '@/api/employee';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface LeaveFormProps {
  onSubmit: (data: any) => void;
   defaultValues?: any
}

function toDateInputValue(dateString: string) {
  if (!dateString) return ''; 
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
}

export default function LeaveForm({ onSubmit, defaultValues }: LeaveFormProps) {
  const router = useRouter()
  const initialForm = {
    employeeId: defaultValues?.employeeId || 0,
    alasan: defaultValues?.alasan || '',
    tanggalMulai: defaultValues?.tanggalMulai || '',
    tanggalSelesai: defaultValues?.tanggalSelesai || '',
  }

  const [form, setForm] = useState(initialForm);
  const [employees, setEmployees] = useState<Employee[]>([]);

useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error('Gagal memuat data pegawai:', err);
    }
  };
  fetchEmployees();
}, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === 'employeeId' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleClear = () => {
    setForm(initialForm)
  }

  const handleCancel = () => {
    router.back()
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <select
        name="employeeId"
        value={form.employeeId}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Pilih Pegawai</option>
        {employees.map((emp: any) => (
          <option key={emp.id} value={Number(emp.id)}>
            {emp.firstName} {emp.lastName}
          </option>
        ))}
      </select>

      <input
        name="alasan"
        placeholder="Alasan Cuti"
        value={form.alasan}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        name="tanggalMulai"
         value={toDateInputValue(form.tanggalMulai)}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        name="tanggalSelesai"
         value={toDateInputValue(form.tanggalSelesai)}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-between items-center pt-4">
        <div className="space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
          >
            Clear
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}