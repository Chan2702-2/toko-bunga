'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Flower2, MapPin, Phone, Mail } from 'lucide-react'
import logo from '@/app/assets/img/gambar/logo21.png'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative h-10 w-10">
                <Image src={logo} alt="Jasmine Florist" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-text">Jasmine Florist</span>
            </Link>
            <p className="text-text-light mb-4 max-w-md">
              Jasmine Florist dengan rangkaian bunga segar dan elegan untuk setiap momen special Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-text mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/katalog" className="text-text-light hover:text-accent transition-colors duration-300">
                  Katalog
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="text-text-light hover:text-accent transition-colors duration-300">
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-text-light hover:text-accent transition-colors duration-300">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-text-light hover:text-accent transition-colors duration-300">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-text mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-text-light">Jl. Kebon Jeruk Raya No. 123, Jakarta Barat</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-text-light">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-text-light">hello@tokobungaa.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <p className="text-center text-text-light text-sm">
            © {currentYear} Jasmine Florist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}