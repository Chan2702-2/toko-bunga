'use client'

import { Flower2, Heart, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-background-warm">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-soft via-white to-background-warm pt-16 pb-14 lg:pt-20 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
            <Flower2 className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-3 animate-fade-in-up">
            Tentang <span className="text-accent">Jasmine Florist</span>
          </h1>
          <p className="text-base text-text-light max-w-xl mx-auto animate-fade-in-up delay-200">
            Menghadirkan keindahan bunga untuk setiap momen special dalam hidup Anda
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 animate-slide-in-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-soft rounded-full">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span className="text-xs font-medium text-accent">Cerita Kami</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text">
                Mempercantik Momen Dengan Bunga Segar
              </h2>
              <div className="space-y-3 text-text-light text-sm leading-relaxed">
                <p>
                  Didirikan dengan cinta pada tahun 2015, Jasmine Florist bermula dari sebuah keinginan sederhana: 
                  memberikan kebahagiaan melalui keindahan bunga segar untuk setiap pelanggan.
                </p>
                <p>
                  Kami percaya bahwa setiap momen dalam hidup layak dirayakan dengan keindahan alam. 
                  Dari pernikahan romantis hingga ucapan duka cita - kami hadir untuk mengekspresikan 
                  perasaan Anda melalui rangkaian bunga yang sempurna.
                </p>
                <p>
                  Dengan pengalaman lebih dari 9 tahun, tim florist profesional kami terus berinovasi 
                  menciptakan desain yang unik dan elegan, sambil tetap mempertahankan kualitas bunga segar terbaik.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=750&fit=crop"
                  alt="Jasmine Florist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-accent text-white p-4 rounded-lg shadow-lg animate-fade-in-up delay-300">
                <p className="text-xl md:text-2xl font-bold">9+</p>
                <p className="text-xs opacity-90">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 lg:py-16 bg-background-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
              Nilai-Nilai Kami
            </h2>
            <p className="text-text-light text-sm max-w-xl mx-auto">
              Prinsip yang memandu setiap langkah kami dalam melayani Anda
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { icon: Flower2, title: 'Kualitas Terbaik', description: 'Bunga segar dipilih langsung dari petani lokal terpercaya' },
              { icon: Heart, title: 'Dibuat dengan Cinta', description: 'Setiap rangkaian dibuat dengan penuh perhatian' },
              { icon: Award, title: 'Profesionalisme', description: 'Tim florist berpengalaman dengan kreativitas tinggi' },
              { icon: Users, title: 'Pelayanan Prima', description: 'Mengutamakan kepuasan pelanggan dalam setiap transaksi' }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-secondary-soft rounded-full flex items-center justify-center mb-4 mx-auto">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-text mb-1">{value.title}</h3>
                <p className="text-text-light text-xs leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
              Tim Kami
            </h2>
            <p className="text-text-light text-sm max-w-xl mx-auto">
              Orang-orang passionate di balik setiap keindahan bunga
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { name: 'Sarah Putri', role: 'Head Florist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
              { name: 'Budi Santoso', role: 'Senior Designer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
              { name: 'Diana Chen', role: 'Customer Service', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' }
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-md ring-4 ring-secondary-soft group-hover:ring-accent/30 transition-all duration-300">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-base font-semibold text-text">{member.name}</h3>
                <p className="text-accent font-medium text-sm mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-secondary-soft to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
            Ingin Berkonsultasi?
          </h2>
          <p className="text-text-light text-sm max-w-xl mx-auto mb-6">
            Tim kami siap membantu Anda menemukan rangkaian bunga sempurna
          </p>
          <Link href="/kontak">
            <Button size="lg" className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
