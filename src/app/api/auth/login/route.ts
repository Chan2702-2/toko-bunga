import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 })
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    const users = rows as Record<string, unknown>[]

    if (users.length === 0) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })
    }

    const user = users[0]
    const isValid = await bcrypt.compare(password, user.password as string)

    if (!isValid) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })
    }

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      token: process.env.ADMIN_TOKEN,
    })
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 })
  }
}
