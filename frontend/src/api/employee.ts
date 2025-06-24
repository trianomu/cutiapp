import { fetchWithToken } from '@/utils/fetchWithToken';

const BASE_URL = 'http://localhost:3001/employees';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: 'MALE' | 'FEMALE';
  leaves: Leave[];
}

export interface Leave {
  id: number;
  alasan: string;
  tanggalMulai: string;
  tanggalSelesai: string;
}

export async function getEmployees() {
  return await fetchWithToken<Employee[]>(BASE_URL);
}

export async function getEmployeesWithLeaves(): Promise<Employee[]> {
  return await fetchWithToken<Employee[]>(`${BASE_URL}/with-leaves`);
}

export async function getEmployeeById(id: number | string) {
  return await fetchWithToken<any>(`${BASE_URL}/${id}`);
}

export async function createEmployee(data: any) {
  return await fetchWithToken(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateEmployee(id: number | string, data: any) {
  return await fetchWithToken(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteEmployee(id: number | string) {
  return await fetchWithToken(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}