// ============================================
// Cartify — Shared TypeScript Types
// These mirror the backend DTOs exactly.
// ============================================

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stockQuantity: number
  imageUrl: string | null
  categoryName: string | null
  categorySlug: string | null
  ratingAvg: number
  ratingCount: number
  isFeatured: boolean
  createdAt: string
}

export interface PagedResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}

export interface User {
  id: string
  email: string
  fullName: string
  role: 'CUSTOMER' | 'ADMIN'
  avatarUrl: string | null
}

export interface AuthResponse {
  token: string
  tokenType: string
  user: User
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingAddress {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface Order {
  id: string
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  totalAmount: number
  shippingAddress: ShippingAddress
  items: OrderItem[]
  createdAt: string
}

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  unitPrice: number
}
