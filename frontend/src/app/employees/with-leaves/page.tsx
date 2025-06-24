'use client';

import { useEffect, useState } from 'react';
import { getEmployeesWithLeaves, Employee } from '@/api/employee';
import EmployeeLeavesTable from '@/components/EmployeeLeavesTable';
import { useAuthRedirect } from '@/hooks/authRedirect';

export default function EmployeeWithLeavesPage() {
   useAuthRedirect()
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmployeesWithLeaves();
        setEmployees(data);
      } catch (err) {
        console.error('Gagal mengambil data pegawai dengan cuti:', err);
      }
    };

    fetchData();
  }, []);

  return <EmployeeLeavesTable employees={employees} />;
}