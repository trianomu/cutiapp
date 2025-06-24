import { fetchWithToken } from '@/utils/fetchWithToken';
import { Employee } from './employee';

const BASE_URL = 'http://localhost:3001/leaves';

export interface Leave {
  id: number;
  alasan  : string;
  tanggalMulai: string;
  tanggalSelesai: string;
  employeeId: number;
  employee?: Employee
}

export async function getLeaves(): Promise<Leave[]> {
  return await fetchWithToken(BASE_URL);
}

export async function getLeaveById(id: number | string) {
  return await fetchWithToken<Leave>(`${BASE_URL}/${id}`);
}

export async function createLeave(data: Partial<Leave>) {
  return await fetchWithToken(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateLeave(id: number | string, data: Partial<Leave>) {
  return await fetchWithToken(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteLeave(id: number | string) {
  return await fetchWithToken(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}