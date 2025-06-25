'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client' // If in a client component

type KYCRequest = {
  id: string
  user_id: string
  status: string
  document_url: string
  submitted_at: string
}

type VideoReport = {
  id: string
  video_id: string
  reason: string
  reported_by: string
  created_at: string
}

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [kycRequests, setKycRequests] = useState<KYCRequest[]>([])
  const [videoReports, setVideoReports] = useState<VideoReport[]>([])
  const router = useRouter()

  useEffect(() => {
    async function checkAuthAndFetch() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/auth/login')
      } else {
        setUser(data.user)
        setLoading(false)

        const { data: kycData } = await supabase
          .from('kyc_requests')
          .select('*')
          .order('submitted_at', { ascending: false })
        setKycRequests(kycData || [])

        const { data: reportsData } = await supabase
          .from('video_reports')
          .select('*')
          .order('created_at', { ascending: false })
        setVideoReports(reportsData || [])
      }
    }

    checkAuthAndFetch()
  }, [router])

  if (loading) return <p className="p-4">Checking access...</p>

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-xl font-semibold text-gray-700">Welcome, {user?.email}</h1>

      <section>
        <h1 className="text-2xl font-bold mb-3">🛡️ KYC Requests</h1>
        {kycRequests.length === 0 ? (
          <p className="text-gray-600">No pending KYC requests.</p>
        ) : (
          <div className="space-y-4">
            {kycRequests.map((req) => (
              <div key={req.id} className="bg-white p-4 shadow rounded">
                <p>User ID: {req.user_id}</p>
                <p>Status: {req.status}</p>
                <a
                  href={req.document_url}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View Document
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Submitted: {new Date(req.submitted_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">🚩 Video Reports</h2>
        {videoReports.length === 0 ? (
          <p className="text-gray-600">No video reports found.</p>
        ) : (
          <div className="space-y-4">
            {videoReports.map((rep) => (
              <div key={rep.id} className="bg-white p-4 shadow rounded">
                <p>Video ID: {rep.video_id}</p>
                <p>Reported by: {rep.reported_by}</p>
                <p>Reason: {rep.reason}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Reported: {new Date(rep.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
