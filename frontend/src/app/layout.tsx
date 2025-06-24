import "./globals.css";
import type { Metadata } from "next";
import AuthLayout from "@/components/layout/AuthLayout";

export const metadata: Metadata = {
  title: "Aplikasi Cuti Pegawai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AuthLayout>{children}</AuthLayout>
      </body>
    </html>
  );
}