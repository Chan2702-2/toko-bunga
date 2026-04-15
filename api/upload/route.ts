import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const token = request.headers.get('x-admin-token')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const timestamp = Date.now()
    const ext = path.extname(file.name)
    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '-').toLowerCase()
    const fileName = `${timestamp}-${safeName}`

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    const filePath = path.join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    return NextResponse.json({
      url: `/uploads/${fileName}`,
      message: 'File berhasil diunggah',
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Gagal mengunggah file' }, { status: 500 })
  }
}
