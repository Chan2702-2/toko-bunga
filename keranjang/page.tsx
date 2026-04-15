'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react'

interface CartItem extends Product {
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItems(cart)
      setLoading(false)
    }

    loadCart()

    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItems(cart)
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )
    
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const getSubtotal = (item: CartItem) => {
    return item.price * item.quantity
  }

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + getSubtotal(item), 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-text mb-8">Keranjang Belanja</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-secondary-soft rounded-full mb-6">
              <ShoppingCart className="h-12 w-12 text-text-light" />
            </div>
            <h2 className="text-2xl font-semibold text-text mb-4">Keranjang Anda Kosong</h2>
            <p className="text-text-light mb-8">
              Sepertinya Anda belum menambahkan produk apapun ke keranjang.
            </p>
            <Link href="/katalog">
              <Button size="lg">
                Lihat Katalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary-soft rounded-lg flex items-center justify-center">
                            <span className="text-text-light text-xs">Tidak ada gambar</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link 
                              href={`/produk/${item.id}`}
                              className="text-lg font-semibold text-text hover:text-accent transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-accent font-bold">{formatPrice(item.price)}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-text-light hover:text-red-500 transition-colors p-2"
                            aria-label="Hapus produk"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-2 text-text hover:text-accent transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-text font-medium min-w-[50px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 text-text hover:text-accent transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-right">
                            <p className="text-sm text-text-light">Subtotal</p>
                            <p className="text-lg font-bold text-text">
                              {formatPrice(getSubtotal(item))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-text mb-6">Ringkasan Pesanan</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-text-light">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-text font-medium">
                          {formatPrice(getSubtotal(item))}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-text">Total</span>
                      <span className="text-2xl font-bold text-accent">
                        {formatPrice(getTotal())}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full" size="lg">
                      Lanjut ke Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
