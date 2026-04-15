'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return
      
      try {
        const res = await fetch(`/api/products/${productId}`)
        if (!res.ok) throw new Error('Produk tidak ditemukan')
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Gagal memuat produk. Silakan coba lagi.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const addToCart = () => {
    if (!product) return
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: Product & { quantity?: number }) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    alert('Produk berhasil ditambahkan ke keranjang!')
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background-warm flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Produk tidak ditemukan'}</p>
          <Link href="/katalog">
            <Button>Kembali ke Katalog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/katalog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Katalog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <Card className="overflow-hidden">
              <div className="relative h-96 lg:h-[500px] w-full">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-secondary-soft flex items-center justify-center">
                    <span className="text-text-light text-lg">Tidak ada gambar</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-secondary-soft text-text text-sm rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-text">
                {product.name}
              </h1>
            </div>

            <p className="text-3xl font-bold text-accent">
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold text-text mb-2">Deskripsi</h3>
                <p className="text-text-light">{product.description}</p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text">Jumlah</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="px-4 py-3 text-text hover:text-accent transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="px-4 py-3 text-text font-medium min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="px-4 py-3 text-text hover:text-accent transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <span className="text-text-light">
                  Subtotal: <span className="font-semibold text-text">{formatPrice(product.price * quantity)}</span>
                </span>
              </div>
            </div>

            <Button 
              className="w-full lg:w-auto" 
              size="lg"
              onClick={addToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Tambah ke Keranjang
            </Button>

            {!product.is_available && (
              <p className="text-red-500 text-sm">Maaf, produk ini sedang tidak tersedia.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
