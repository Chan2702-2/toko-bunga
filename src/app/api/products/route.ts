import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const available = searchParams.get('available')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    let query = 'SELECT * FROM products'
    const params: string[] = []
    const conditions: string[] = []

    if (available === 'true') {
      conditions.push('is_available = 1')
    }

    if (featured === 'true') {
      conditions.push('is_featured = 1')
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY created_at DESC'

    if (limit) {
      query += ` LIMIT ${parseInt(limit)}`
    }

    const [rows] = await pool.query(query, params)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Gagal memuat produk' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('x-admin-token')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, price, category, image_url, is_available, is_featured } = body

    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, category, image_url, is_available, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description || null, price, category, image_url || null, is_available ?? true, is_featured ?? false]
    )

    return NextResponse.json({ id: (result as { insertId: number }).insertId, message: 'Produk berhasil ditambahkan' }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Gagal menambahkan produk' }, { status: 500 })
  }
}
