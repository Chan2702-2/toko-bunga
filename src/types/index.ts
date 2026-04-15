export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  image_url: string | null
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product_id: string
  product: Product
  quantity: number
  created_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string | null
  total_amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product: Product
  quantity: number
  price_at_time: number
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}