'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface EmployeeFormProps {
  onSubmit: (data: any) => void
  defaultValues?: any
}

const fieldLabels: Record<string, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  phoneNumber: 'Phone Number',
  address: 'Address',
}

export default function EmployeeForm({ onSubmit, defaultValues }: EmployeeFormProps) {
  const router = useRouter()

  const initialForm = {
    firstName: defaultValues?.firstName || '',
    lastName: defaultValues?.lastName || '',
    email: defaultValues?.email || '',
    phoneNumber: defaultValues?.phoneNumber || '',
    address: defaultValues?.address || '',
    gender: defaultValues?.gender || 'MALE',
  }

  const [form, setForm] = useState(initialForm)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  const handleClear = () => {
    setForm(initialForm)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.keys(fieldLabels).map(field => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
            {fieldLabels[field]}
          </label>
          <input
            id={field}
            name={field}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            placeholder={fieldLabels[field]}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MALE">Laki-laki</option>
          <option value="FEMALE">Perempuan</option>
        </select>
      </div>
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
  )
}