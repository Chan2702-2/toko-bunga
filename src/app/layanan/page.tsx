'use client'

import { Truck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function LayananPage() {
  const layanan = [
    {
      emoji: '💐',
      title: 'Bouquet Bunga',
      subtitle: 'Buket Fresh, Langsung Bikin Meleleh',
      description: 'Buket segar untuk wisuda, ulang tahun, anniversary, atau sekadar bilang "aku sayang kamu". Desain kekinian yang dijamin bikin penerima senyum seharian.',
      highlight: 'Ready same-day, anti telat',
    },
    {
      emoji: '🎀',
      title: 'Bunga Papan',
      subtitle: 'Tampil Prestige di Setiap Acara',
      description: 'Grand Opening, pernikahan, atau ucapan selamat — bunga papan elegan kami selalu tampil wah dan sampai tepat waktu di lokasi acara.',
      highlight: 'Pesan pagi, sore sudah sampai',
    },
    {
      emoji: '🎁',
      title: 'Flower Box',
      subtitle: 'Hadiah Estetik, Gak Pasaran',
      description: 'Kotak bunga premium yang cantik dan Instagramable. Cocok buat birthday surprise, corporate gift, atau sekadar bikin someone\'s day lebih berwarna.',
      highlight: 'Desain eksklusif, limited edition',
    },
    {
      emoji: '✨',
      title: 'Custom Design',
      subtitle: 'Mau yang Beda? Kita Buatin!',
      description: 'Punya request khusus? Tim florist kami siap wujudkan rangkaian bunga sesuai keinginanmu. Dari warna, jenis bunga, sampai tema — semuanya custom.',
      highlight: 'Konsultasi gratis, gak ribet',
    },
  ]

  const keunggulan = [
    {
      emoji: '🌸',
      title: 'Bunga Selalu Fresh',
      description: 'Dipilih & diseleksi setiap hari dari petani lokal terbaik.',
    },
    {
      emoji: '⚡',
      title: 'Kirim Hari Ini Juga',
      description: 'Same-day delivery ke seluruh Jakarta, Tangerang, Depok, Bekasi & Bogor.',
    },
    {
      emoji: '💯',
      title: 'Harga Teman, Hasil Sultan',
      description: 'Premium look tapi tetap ramah di kantong.',
    },
  ]

  return (
    <div className="min-h-screen bg-background-warm">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-soft via-white to-background-warm pt-16 pb-20 lg:pt-20 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-soft/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4 leading-tight">
            Semua Kebutuhan Bunga Kamu,<br />Kami Handle Sat-Set 🌸
          </h1>
          <p className="text-text-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Dari bouquet sampai dekorasi — semua bisa dipesan dalam hitungan menit. Bunga fresh, desain kekinian, langsung kirim hari ini.
          </p>
          <div className="mt-8">
            <Link href="/katalog">
              <Button size="lg" className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                Lihat Katalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Layanan Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">
              Layanan Kami
            </h2>
            <p className="text-text-light max-w-xl mx-auto">
              Pilih layanan yang paling cocok buat kebutuhanmu
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {layanan.map((item, index) => (
              <div
                key={index}
                className="bg-background-warm rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold text-text mb-1 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-accent font-medium text-sm mb-3">
                  {item.subtitle}
                </p>
                <p className="text-text-light text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-secondary-soft/50 text-accent text-xs font-medium px-3 py-1.5 rounded-full">
                  <Truck className="h-3.5 w-3.5" />
                  {item.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="py-16 lg:py-20 bg-background-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">
              Kenapa Harus di Sini?
            </h2>
            <p className="text-text-light max-w-xl mx-auto">
              Bukan cuma jual bunga, kami deliver kebahagiaan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keunggulan.map((item, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-soft rounded-full mb-4 text-3xl">
                  {item.emoji}
                </div>
                <h3 className="text-lg font-bold text-text mb-2">{item.title}</h3>
                <p className="text-text-light text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proses Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">
              Cara Pesan? Gampang Banget
            </h2>
            <p className="text-text-light max-w-xl mx-auto">
              4 langkah sampai bunga di tangan penerima
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '1', emoji: '🔍', title: 'Pilih Produk', desc: 'Browse katalog & pilih yang paling cocok' },
              { step: '2', emoji: '💬', title: 'Chat / Konsultasi', desc: 'Diskusi desain, budget, dan detail' },
              { step: '3', emoji: '💳', title: 'Bayar & Konfirmasi', desc: 'Transfer mudah, langsung diproses' },
              { step: '4', emoji: '🚀', title: 'Kirim Hari Ini!', desc: 'Bunga sampai fresh di lokasi penerima' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-secondary-soft rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  {item.emoji}
                </div>
                <div className="text-xs text-accent font-bold mb-1">STEP {item.step}</div>
                <h3 className="font-bold text-text text-sm mb-1">{item.title}</h3>
                <p className="text-text-light text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-secondary-soft to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary-soft rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Pesan Sekarang, Kirim Hari Ini Juga 🚀
          </h2>
          <p className="text-text-light text-base md:text-lg max-w-xl mx-auto mb-8">
            Jangan sampai momen spesial lewat gara-gara kehabisan bunga. Stok terbatas setiap hari!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/katalog">
              <Button size="lg" className="w-full sm:w-auto hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                Lihat Katalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/kontak">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Konsultasi Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
