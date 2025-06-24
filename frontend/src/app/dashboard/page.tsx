'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminProfile } from '@/api/admin';
import { useAuthRedirect } from '@/hooks/authRedirect';

export default function DashboardPage() {
   useAuthRedirect()
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getAdminProfile();
        setAdmin(data.user);
      } catch (err) {
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <div className="p-6">Memuat...</div>;

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-8 w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Selamat Datang, Admin</h1>
        <div className="space-y-4 text-gray-700 text-lg">
          <p><span className="font-semibold">Nama:</span> {admin.firstName} {admin.lastName}</p>
          <p><span className="font-semibold">Email:</span> {admin.email}</p>
          <p><span className="font-semibold">Gender:</span> {admin.gender === 'MALE' ? 'Laki-laki' : 'Perempuan'}</p>
          {mounted && (
            <p>{new Date(admin.birthDate).toLocaleDateString('id-ID')}</p>
          )}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/login');
          }}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
