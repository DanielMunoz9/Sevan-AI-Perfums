// Product types
export interface Product {
  id: string | number;
  sku?: string;
  title: string;
  visible_title: string;
  name?: string; // Para compatibilidad
  slug: string;
  description: string;
  short_description?: string;
  long_description?: string;
  price: number;
  sale_price?: number;
  currency?: string;
  category: string;
  stock: number;
  weight?: number;
  images?: string[];
  image_url?: string; // Para compatibilidad
  scent_notes?: {
    top?: string[];
    heart?: string[];
    middle?: string[];
    base?: string[];
  };
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  legal_note?: string;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  // Campos adicionales para compatibilidad
  brand?: string;
  inspiration?: string;
  inspiration_brand?: string;
  inspiration_fragrance?: string;
  genre?: string;
  concentration?: string;
  size?: string;
  duration?: string;
  scent_family?: string;
  top_notes?: string[];
  middle_notes?: string[];
  base_notes?: string[];
  avg_rating?: number;
  review_count?: number;
  sales?: number;
}

// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  phone?: string;
  address?: string;
}

// Cart types
export interface CartItem {
  id: number;
  user_id: string;
  product_id: number;
  quantity: number;
  created_at: string;
  product?: Product;
}

// Order types
export interface Order {
  id: number;
  user_id: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  shipping_address?: string;
  epayco_order_id?: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  product?: Product;
}

// AI types
export interface AIInteraction {
  id: number;
  user_id: string;
  message: string;
  response: string;
  created_at: string;
  context?: any;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Payment types
export interface EPaycoPayment {
  amount: number;
  currency: string;
  description: string;
  order_id: string;
  customer_email: string;
  customer_name?: string;
  return_url: string;
  confirmation_url: string;
}

export interface EPaycoResponse {
  success: boolean;
  payment_url?: string;
  error?: string;
  data?: any;
}

// Component props types
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  isLoading?: boolean;
}

// Filter types
export interface ProductFilters {
  category?: string;
  brand?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  scentFamily?: string;
  genre?: string;
  concentration?: string;
  searchQuery?: string;
}

// Admin types
export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  recentOrders: Order[];
  topProducts: Product[];
}