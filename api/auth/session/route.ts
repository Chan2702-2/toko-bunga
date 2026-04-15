import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const token = request.headers.get('x-admin-token')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const [rows] = await pool.query('SELECT id, email, name FROM users LIMIT 1')
    const users = rows as Record<string, unknown>[]

    if (users.length === 0) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ user: users[0] })
  } catch (error) {
    console.error('Error checking session:', error)
    return NextResponse.json({ user: null })
  }
}
