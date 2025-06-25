'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'

type P2POrder = {
  id: string
  user_id: string
  currency: string
  amount: number
  rate: number
  payment_method: string
  status: string
  created_at: string
}

export default function P2PPage() {
  const [orders, setOrders] = useState<P2POrder[]>([])

  useEffect(() => {
    async function loadOrders() {
      const { data, error } = await supabase
        .from('p2p_orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to fetch P2P orders:', error.message)
      } else {
        setOrders(data || [])
      }
    }

    loadOrders()
  }, [])

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🔁 P2P Exchange Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No P2P orders available.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded shadow p-4">
              <p><strong>Currency:</strong> {order.currency}</p>
              <p><strong>Amount:</strong> {order.amount}</p>
              <p><strong>Rate:</strong> {order.rate}</p>
              <p><strong>Payment:</strong> {order.payment_method}</p>
              <p><strong>Status:</strong> <span className={`font-semibold ${order.status === 'active' ? 'text-green-600' : 'text-gray-500'}`}>{order.status}</span></p>
              <p className="text-sm text-gray-500">Posted: {new Date(order.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}