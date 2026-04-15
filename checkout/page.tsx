'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowLeft, ShoppingCart, Send, Loader2 } from 'lucide-react'

interface CartItem extends Product {
  quantity: number
}

// WhatsApp phone number - replace with actual number
const WHATSAPP_NUMBER = '6281234567890'

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
    setLoading(false)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getSubtotal = (item: CartItem) => {
    return item.price * item.quantity
  }

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + getSubtotal(item), 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor WhatsApp wajib diisi'
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Nomor WhatsApp tidak valid'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Alamat lengkap wajib diisi'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateWhatsAppMessage = () => {
    const orderDetails = cartItems
      .map(item => `- ${item.name} x${item.quantity} = ${formatPrice(getSubtotal(item))}`)
      .join('\n')

    const message = `🛒 *Pesanan Jasmine Florist*

*Data Pemesan:*
Nama: ${formData.name}
WhatsApp: ${formData.phone}
Alamat: ${formData.address}

*Detail Pesanan:*
${orderDetails}

*Total: ${formatPrice(getTotal())}*

📝 Catatan: ${formData.notes || '-'}`

    return encodeURIComponent(message)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    // Generate WhatsApp message and open WhatsApp
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
    
    // Clear cart after order
    localStorage.removeItem('cart')
    window.dispatchEvent(new Event('cartUpdated'))
    
    setIsSubmitting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background-warm flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-secondary-soft rounded-full mb-6">
            <ShoppingCart className="h-12 w-12 text-text-light" />
          </div>
          <h2 className="text-2xl font-semibold text-text mb-4">Keranjang Anda Kosong</h2>
          <p className="text-text-light mb-8">
            Silakan tambahkan produk ke keranjang terlebih dahulu.
          </p>
          <Link href="/katalog">
            <Button size="lg">Lihat Katalog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/keranjang">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Keranjang
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-text mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-text mb-6">Ringkasan Pesanan</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary-soft rounded-lg flex items-center justify-center">
                            <span className="text-text-light text-xs">N/A</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-text text-sm">{item.name}</p>
                        <p className="text-text-light text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-text">{formatPrice(getSubtotal(item))}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-text">Total</span>
                    <span className="text-2xl font-bold text-accent">
                      {formatPrice(getTotal())}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-text mb-6">Data Pemesan</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Nama Lengkap"
                    name="name"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    required
                  />

                  <Input
                    label="Nomor WhatsApp"
                    name="phone"
                    placeholder="Contoh: 6281234567890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    required
                  />

                  <div className="w-full">
                    <label className="block text-sm font-medium text-text mb-2">
                      Alamat Lengkap <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      placeholder="Masukkan alamat lengkap Anda"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border bg-white text-text placeholder:text-text-light transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-text mb-2">
                      Catatan Ucapan (Opsional)
                    </label>
                    <textarea
                      name="notes"
                      placeholder="Tuliskan pesan untuk penerima hadiah..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-text placeholder:text-text-light transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    isLoading={isSubmitting}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Kirim ke WhatsApp
                  </Button>

                  <p className="text-sm text-text-light text-center">
                    Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
