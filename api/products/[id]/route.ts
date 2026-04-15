import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
    const products = rows as Record<string, unknown>[]

    if (products.length === 0) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(products[0])
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Gagal memuat produk' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('x-admin-token')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { name, description, price, category, image_url, is_available, is_featured } = body

    await pool.query(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ?, is_available = ?, is_featured = ? WHERE id = ?',
      [name, description || null, price, category, image_url || null, is_available, is_featured ?? false, id]
    )

    return NextResponse.json({ message: 'Produk berhasil diperbarui' })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Gagal memperbarui produk' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('x-admin-token')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await pool.query('DELETE FROM products WHERE id = ?', [id])

    return NextResponse.json({ message: 'Produk berhasil dihapus' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Gagal menghapus produk' }, { status: 500 })
  }
}
