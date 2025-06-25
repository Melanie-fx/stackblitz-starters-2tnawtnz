// app/layout.tsx
import './globals.css';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import type { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white dark:bg-white dark:text-gray-900">
        <header className="bg-blue-800 p-6 shadow-md dark:bg-blue-100">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold dark:text-blue-900">Tradenova Market Dashboard</h1>
            <p className="text-sm dark:text-blue-900">{user ? `Welcome, ${user.email}` : 'Please log in'}</p>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-blue-800 p-6 text-center dark:bg-blue-100">
          <p className="text-sm dark:text-blue-900">© 2025 Tradenova</p>
        </footer>
      </body>
    </html>
  );
}
