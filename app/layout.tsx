// app/layout.tsx
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
