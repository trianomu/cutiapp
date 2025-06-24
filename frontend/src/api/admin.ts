import { fetchWithToken } from '@/utils/fetchWithToken';

export async function getAdminProfile() {
  return await fetchWithToken<{ user: any }>('http://localhost:3001/admin/profile');
}
