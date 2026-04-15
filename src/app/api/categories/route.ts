import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Gagal memuat kategori' }, { status: 500 })
  }
}
