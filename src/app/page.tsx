'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import bgBrandStory from '@/app/assets/img/gambar/bg-1.png'
import logoBca from '@/app/assets/img/bca.png'
import logoAirasia from '@/app/assets/img/airasia.png'
import logoAirnav from '@/app/assets/img/airnav.png'
import logoPupr from '@/app/assets/img/pupr.png'
import logoGmf from '@/app/assets/img/gmf.png'
import { Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowRight, ShoppingCart, CheckCircle, ChevronDown } from 'lucide-react'

// Custom hook for scroll reveal
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-semibold text-text text-sm md:text-base pr-4">{question}</span>
        <ChevronDown className={`h-5 w-5 text-text-light flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-5 pb-5 text-text-light text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?available=true&featured=true&limit=6')
        if (!res.ok) throw new Error('Gagal memuat produk')
        const data = await res.json()
        setFeaturedProducts(data || [])
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const productCategories = [
    {
      title: 'Hand Bouquet Jakarta (Korean Style)',
      description: 'Desain buket terkini ala Korea yang lagi hits — cocok buat wisuda, anniversary, atau surprise spesial. Dijamin Instagramable!',
    },
    {
      title: 'Bunga Papan Ucapan Jakarta',
      description: 'Grand Opening, pernikahan, atau duka cita — bunga papan elegan kami selalu tampil prestige dan tepat waktu di lokasi.',
    },
    {
      title: 'Standing Flower Mewah Jakarta',
      description: 'Beri kesan mewah di setiap acara. Ribuan pilihan bunga dengan rangkaian tinggi yang megah dan penuh karakter.',
    },
    {
      title: 'Bunga Meja & Home Decor Jakarta',
      description: 'Percantik ruang kerja, kantor, atau sudut rumah favoritmu. Bunga segar yang ganti suasana jadi lebih hidup setiap hari.',
    },
  ]

  const features = [
    {
      emoji: '🌸',
      title: 'Fresh, No Kaleng-Kaleng',
      description: 'Bunga kami dipetik & diseleksi setiap hari. Dijamin fresh sampai di tangan penerima — bukan stok kemarin yang udah layu.'
    },
    {
      emoji: '⚡',
      title: 'Sat-Set, Anti Telat',
      description: 'Pesan sekarang, sampai hari ini juga. Same-day delivery ke seluruh Jakarta, gak pake nunggu besok.'
    },
    {
      emoji: '🎨',
      title: 'Desain yang Beda dari yang Lain',
      description: 'Bukan rangkaian pasaran yang itu-itu aja. Setiap buket dirancang unik, aesthetic, dan Instagram-worthy.'
    },
    {
      emoji: '💰',
      title: 'Premium Look, Friendly Price',
      description: 'Keluar dikit, hasil wah. Harga terjangkau tapi hasil akhir tetap terlihat mewah & berkelas.'
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

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
    alert('Produk berhasil ditambahkan ke keranjang!')
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-soft via-white to-background-warm pt-16 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium animate-fade-in">
                Selamat Datang di Jasmine Florist
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight animate-fade-in-up delay-100">
                Florist Jakarta Favorit-Buket Aesthetic{' '}
                <span className="text-accent gradient-text">Kirim Same Day!</span>
              </h1>
              <p className="text-lg text-text-light max-w-lg animate-fade-in-up delay-200">
                Pesan bunga segar & desain kekinian ke seluruh Jakarta — Jakarta Selatan, Pusat, Barat, Timur & Utara. Buka 24 jam, tiba hari ini.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                <Link href="/katalog">
                  <Button className="w-full sm:w-auto hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    Lihat Katalog
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/katalog#products">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Pesan Sekarang
                  </Button>
                </Link>
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-secondary-soft rounded-full opacity-50 blur-3xl animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-accent/20 rounded-full opacity-50 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="relative rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                <Image
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=600&fit=crop"
                  alt="Buket bunga indah"
                  width={600}
                  height={600}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <ScrollReveal>
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Banner */}
          <div className="bg-gradient-to-br from-secondary-soft via-secondary to-secondary-dark rounded-2xl p-8 md:p-12 lg:p-16 text-text mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Bunga Fresh. Kirim Cepat.<br />Nggak Ribet.
              </h2>
              <p className="text-text-light text-base md:text-lg max-w-2xl leading-relaxed">
                Semua bunga dipilih fresh setiap hari. Pesan sekarang, tiba hari ini &mdash; 24 jam ke seluruh Jakarta, Tangerang, Depok, Bekasi &amp; Bogor.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Side Feature Bar */}
            <div className="lg:col-span-1">
              <div className="bg-secondary-soft rounded-2xl p-8 h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-accent mb-4 leading-snug">
                  Buat Momen Kamu Jadi Tak Terlupakan 🌸
                </h3>
                <p className="text-text-light leading-relaxed">
                  Dari wisuda, anniversary, ulang tahun, sampai surprise romantis &mdash; florist Jakarta kami siap rangkai bunga fresh yang bikin orang nangis terharu (yang baik-baik ya).
                </p>
              </div>
            </div>

            {/* Product Categories Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {productCategories.map((category, index) => (
                  <div
                    key={index}
                    className={`bg-background-warm rounded-xl p-6 border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300 group ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                          {category.title}
                        </h4>
                        <p className="text-text-light text-sm leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Features Section */}
      <ScrollReveal delay={100}>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Kenapa Ribuan Pelanggan Balik Lagi ke Kami?
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              Bukan cuma jual bunga — kami deliver experience yang bikin kamu & penerima sama-sama senyum.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`text-center p-6 transition-all duration-500 hover:scale-105 hover:bg-secondary-soft/30 rounded-xl ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-soft rounded-full mb-4 hover:bg-accent/20 transition-colors duration-300 text-3xl">
                  {feature.emoji}
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-text-light text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Featured Products Section */}
      <ScrollReveal delay={100}>
      <section className="py-8 bg-background-warm" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text mb-1">
                Produk Unggulan
              </h2>
              <p className="text-text-light text-sm">
                Rangkaian bunga populer kami
              </p>
            </div>
            <Link href="/katalog">
              <Button variant="outline" className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                Lihat Semua
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200 animate-shimmer"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-light">Belum ada produk tersedia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  hover 
                  className="overflow-hidden group hover:-translate-y-2 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link href={`/produk/${product.id}`}>
                    <div className="relative h-64 overflow-hidden">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary-soft flex items-center justify-center">
                          <span className="text-text-light">Tidak ada gambar</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/produk/${product.id}`}>
                      <h3 className="font-semibold text-text mb-2 hover:text-accent transition-colors duration-300">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-accent font-bold text-lg mb-3">
                      {formatPrice(product.price)}
                    </p>
                    <Button
                      className="w-full hover:scale-105 hover:shadow-lg transition-all duration-300"
                      variant="secondary"
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
      </section>
      </ScrollReveal>

      {/* Social Proof & Trust Section */}
      <ScrollReveal delay={100}>
      <section className="py-10 bg-background-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl mb-12">
            <div className="bg-[#1a2332] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Bunga dari Jakarta,<br />Rasanya Beda.
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Tiap buket dipilih manual, tiap warna dipasangkan sama perasaan — bukan hasil template. Itulah kenapa 9 dari 10 penerima bilang: &ldquo;Ini hadiah paling berkesan yang pernah aku terima.&rdquo;
              </p>
            </div>
            <div className="relative h-80 lg:min-h-[450px]">
              <Image
                src={bgBrandStory}
                alt="Wanita memegang buket bunga segar"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Key Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { emoji: '⭐', value: '4.9/5', label: 'Rating' },
              { emoji: '🌸', value: '5.000+', label: 'Bouquet Terkirim' },
              { emoji: '📦', value: 'Same Day', label: 'Delivery' },
              { emoji: '💚', value: '100%', label: 'Fresh Guarantee' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-xl md:text-2xl font-bold text-text">{stat.value}</div>
                <div className="text-text-light text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trusted Partners */}
          <div className="text-center">
            <p className="text-text-light text-sm mb-8">
              Dipercaya oleh berbagai instansi & perusahaan
            </p>
            <div className="grid grid-cols-3 md:grid-cols-5 items-center justify-items-center gap-8 md:gap-12">
              <div className="relative h-20 md:h-28 w-56 md:w-80">
                <Image src={logoBca} alt="BCA" fill className="object-contain" />
              </div>
              <div className="relative h-20 md:h-28 w-56 md:w-80">
                <Image src={logoAirasia} alt="AirAsia" fill className="object-contain" />
              </div>
              <div className="relative h-20 md:h-28 w-56 md:w-80">
                <Image src={logoAirnav} alt="AirNav Indonesia" fill className="object-contain" />
              </div>
              <div className="relative h-20 md:h-28 w-56 md:w-80">
                <Image src={logoPupr} alt="PUPR" fill className="object-contain" />
              </div>
              <div className="relative h-20 md:h-28 w-56 md:w-80">
                <Image src={logoGmf} alt="GMF AeroAsia" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* CTA Banner Section */}
      <ScrollReveal delay={100}>
      <section className="py-12 lg:py-16 bg-gradient-to-r from-secondary-soft to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary-dark/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">
            Pesan Sekarang
          </h2>
          <p className="text-text-light max-w-xl mx-auto mb-6 text-sm md:text-base">
            Ingin rangkaian bunga kustom untuk acara special Anda? 
            Hubungi kami dan kami akan mewujudkan visi Anda.
          </p>
          <Link href="/katalog">
            <Button className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              Jelajahi Katalog
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal delay={100}>
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="text-text-light">
              Masih ragu? Cek jawaban di bawah ini
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'Apakah Jasmine Florist buka 24 jam?',
                a: 'Ya! Kami melayani pemesanan 24 jam, 7 hari seminggu — termasuk hari libur nasional. Chat WhatsApp kami kapan saja.',
              },
              {
                q: 'Berapa lama pengiriman bunga ke Jakarta?',
                a: 'Kami menyediakan same day delivery ke seluruh wilayah Jakarta.',
              },
              {
                q: 'Apakah bisa pesan buket dengan desain custom?',
                a: 'Tentu! Kami spesialis buket custom. Ceritakan momen dan preferensi kamu, florist kami akan rangkai sesuai keinginan.',
              },
              {
                q: 'Berapa harga buket bunga di Jasmine Florist?',
                a: 'Harga mulai Rp 150.000 untuk buket mini hingga Rp 2.000.000+ untuk rangkaian premium. Ada pilihan untuk semua budget!',
              },
            ].map((faq, index) => (
              <FAQItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  )
}
