'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function KontakPage() {
  const [formData, setFormData] = useState({ nama: '', email: '', whatsapp: '', pesan: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const message = `*Hi Jasmine Florist!*\n\nSaya ingin bertanya:\n\n*Nama:* ${formData.nama}\n*Email:* ${formData.email}\n*WhatsApp:* ${formData.whatsapp}\n\n*Pesan:*\n${formData.pesan}`
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank')
  }

  const contactInfo = [
    { icon: Phone, title: 'Telepon', value: '+62 812 3456 7890', description: '08:00 - 20:00' },
    { icon: Mail, title: 'Email', value: 'hello@tokobungaa.com', description: 'Respon 24 jam' },
    { icon: MapPin, title: 'Alamat', value: 'Jl. Kebon Jeruk Raya No. 123', description: 'Jakarta Barat' },
    { icon: Clock, title: 'Jam Buka', value: '08:00 - 20:00', description: 'Setiap hari' }
  ]

  return (
    <div className="min-h-screen bg-background-warm">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-soft via-white to-background-warm pt-10 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
            <MessageCircle className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-text mb-2 animate-fade-in-up">
            Hubungi <span className="text-accent">Kami</span>
          </h1>
          <p className="text-sm text-text-light max-w-xl mx-auto animate-fade-in-up delay-200">
            Tim kami siap membantu Anda. Hubungi via formulir atau langsung via WhatsApp
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="space-y-6 animate-slide-in-left">
              {/* Contact Cards */}
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-background-warm rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text text-xs">{info.title}</h3>
                      <p className="text-text font-medium text-sm mt-0.5">{info.value}</p>
                      <p className="text-text-light text-xs mt-0.5">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Card */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Chat via WhatsApp</h3>
                    <p className="text-green-100 text-sm">Respon cepat</p>
                  </div>
                </div>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white text-green-600 py-2.5 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Mulai Chat
                </a>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-md h-52">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521472322638!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b38f%3A0x37c1d1e0c0e0c0c0!2sJakarta%2C%20Kota%20Jakarta%20Barat!5e0!3m2!1sen!2sid!4v1605060123456" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi" />
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="animate-slide-in-right">
              <div className="bg-background-warm rounded-xl p-5 lg:p-6">
                <h2 className="text-lg font-bold text-text mb-5">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input label="Nama Lengkap" placeholder="Nama lengkap" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} required />
                  <Input label="Email" type="email" placeholder="email@anda.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  <Input label="WhatsApp" type="tel" placeholder="+62 812 3456 7890" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} required />
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Pesan</label>
                    <textarea placeholder="Tulis pesan Anda di sini..." value={formData.pesan} onChange={(e) => setFormData({ ...formData, pesan: e.target.value })} required rows={3} className="input-field resize-none" />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Kirim via WhatsApp
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-6 lg:py-8 bg-background-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">Pertanyaan Umum</h2>
            <p className="text-text-light text-sm">Pertanyaan yang sering diajukan pelanggan kami</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: 'Apakah pengiriman same-day tersedia?', a: 'Ya, untuk area Jakarta. Pesanan sebelum jam 12:00.' },
              { q: 'Berapa lama ketahanan bunga?', a: 'Dengan perawatan tepat, 3-7 hari.' },
              { q: 'Apakah bisa custom rangkaian?', a: 'Tentu! Hubungi kami untuk discuss kebutuhan.' },
              { q: 'Metode pembayaran apa saja?', a: 'Transfer Bank, QRIS, dan COD.' }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="font-semibold text-text text-sm mb-1">{faq.q}</h3>
                <p className="text-text-light text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
