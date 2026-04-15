'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowLeft, ShoppingCart } from 'lucide-react'

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?available=true')
        if (!res.ok) throw new Error('Gagal memuat produk')
        const data = await res.json()
        setProducts(data || [])
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Gagal memuat produk. Silakan coba lagi.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: Product) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-warm flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Coba Lagi
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">Katalog Bunga</h1>
          <p className="text-text-light max-w-2xl mx-auto">
            Temukan koleksi buket dan rangkaian bunga indah kami untuk setiap kesempatan istimewa
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-light text-lg">Belum ada produk tersedia.</p>
            <Link href="/" className="mt-4 inline-block">
              <Button variant="outline">Kembali ke Beranda</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} hover className="overflow-hidden">
                <Link href={`/produk/${product.id}`}>
                  <div className="relative h-64 overflow-hidden">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary-soft flex items-center justify-center">
                        <span className="text-text-light">Tidak ada gambar</span>
                      </div>
                    )}
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link href={`/produk/${product.id}`}>
                    <h3 className="font-semibold text-text mb-2 hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-accent font-bold text-lg mb-4">
                    {formatPrice(product.price)}
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Tambah ke Keranjang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
