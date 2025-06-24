'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/login'

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token && !isLoginPage) {
      router.replace('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [pathname, router, isLoginPage])

  if (isAuthenticated === null && !isLoginPage) {
    return <div className="p-10 text-center text-gray-500">Memuat...</div>
  }

  // Layout khusus halaman login
  if (isLoginPage) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-blue-100">
        {children}
      </div>
    )
  }

  // Layout utama setelah login
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-500 text-white h-screen fixed top-0 left-0 shadow-lg">
        <div className="text-2xl font-bold p-6 border-b border-white">CutiApp</div>
        <nav className="p-4 space-y-4 text-sm">
          <Link href="/dashboard" className="block px-2 py-2 rounded hover:bg-blue-700">Dashboard</Link>
          <Link href="/employees" className="block px-2 py-2 rounded hover:bg-blue-700">Pegawai</Link>
          <Link href="/leaves" className="block px-2 py-2 rounded hover:bg-blue-700">Cuti</Link>
          <Link href="/employees/with-leaves" className="block px-2 py-2 rounded hover:bg-blue-700">Pegawai & Cuti</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        <header className="bg-white shadow px-6 py-6">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard Cuti Pegawai</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}