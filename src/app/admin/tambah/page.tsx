'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, useAuthStore, getAuthHeaders } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'

interface Category {
  id: number
  name: string
  slug: string
}

export default function AddProductPage() {
  const router = useRouter()
  const { user, isLoading, isInitialized } = useAuthStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAvailable, setIsAvailable] = useState(true)
  const [isFeatured, setIsFeatured] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isInitialized) {
      checkAuth()
    }
  }, [isInitialized])

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/admin/login')
    }
  }, [isInitialized, user, router])

  useEffect(() => {
    if (user) {
      fetchCategories()
    }
  }, [user])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
        if (data.length > 0) {
          setCategory(data[0].slug)
        }
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let imageUrl = null

      // Upload image
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData,
        })

        if (!uploadRes.ok) {
          throw new Error('Gagal mengunggah gambar')
        }

        const uploadData = await uploadRes.json()
        imageUrl = uploadData.url
      }

      // Insert product
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          category,
          image_url: imageUrl,
          is_available: isAvailable,
          is_featured: isFeatured,
        }),
      })

      if (!res.ok) {
        throw new Error('Gagal menambahkan produk')
      }

      router.push('/admin/dashboard')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-text">Tambah Produk Baru</h1>
          </div>
          <p className="text-text-light">Isi formulir di bawah untuk menambahkan produk baru</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text mb-2">Foto Produk</label>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => { setImageFile(null); setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                      Pilih Foto
                    </Button>
                    <p className="text-xs text-text-light mt-2">PNG, JPG, atau GIF. Maksimum 5MB.</p>
                  </div>
                </div>
              </div>

              <Input label="Nama Bunga" type="text" placeholder="Contoh: Rose Bouquet" value={name} onChange={(e) => setName(e.target.value)} required />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Harga (Rp)" type="number" placeholder="Contoh: 150000" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" />
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Kategori</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-4 py-3 rounded-lg border bg-white text-text transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none border-gray-200">
                    <option value="">Pilih Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Deskripsi</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi produk..." rows={4} className="w-full px-4 py-3 rounded-lg border bg-white text-text transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none border-gray-200 resize-none" />
              </div>

              <div className="flex items-center space-x-3">
                <input type="checkbox" id="isAvailable" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent" />
                <label htmlFor="isAvailable" className="text-sm font-medium text-text">Produk ini aktif dan dapat dipesan</label>
              </div>

              <div className="flex items-center space-x-3">
                <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent" />
                <label htmlFor="isFeatured" className="text-sm font-medium text-text">Tandai sebagai produkunggulan</label>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex space-x-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()} disabled={loading}>Batal</Button>
            <Button type="submit" className="flex-1" isLoading={loading}>Simpan Produk</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
