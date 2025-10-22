import { Product } from '@/types';

// Simulación de base de datos local con localStorage
class LocalDatabase {
  private static instance: LocalDatabase;
  
  public static getInstance(): LocalDatabase {
    if (!LocalDatabase.instance) {
      LocalDatabase.instance = new LocalDatabase();
    }
    return LocalDatabase.instance;
  }

  // Productos
  getProducts(): Product[] {
    if (typeof window === 'undefined') return [];
    const products = localStorage.getItem('sevan_products');
    return products ? JSON.parse(products) : this.getDefaultProducts();
  }

  saveProducts(products: Product[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('sevan_products', JSON.stringify(products));
  }

  updateProduct(productId: number, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.saveProducts(products);
      return products[index];
    }
    return null;
  }

  deleteProduct(productId: number): boolean {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => p.id !== productId);
    if (filteredProducts.length < products.length) {
      this.saveProducts(filteredProducts);
      return true;
    }
    return false;
  }

  addProduct(product: Product): void {
    const products = this.getProducts();
    const newProduct = {
      ...product,
      id: Date.now() // Generar ID único
    };
    products.push(newProduct);
    this.saveProducts(products);
  }

  clearProducts(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('sevan_products');
  }

  clearOrders(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('sevan_orders');
  }

  // Carrito
  getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem('sevan_cart');
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(productId: number, quantity: number = 1): void {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: Date.now(),
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem('sevan_cart', JSON.stringify(cart));
    this.notifyCartChange();
  }

  updateCartItem(productId: number, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        localStorage.setItem('sevan_cart', JSON.stringify(cart));
        this.notifyCartChange();
      }
    }
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart();
    const filteredCart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('sevan_cart', JSON.stringify(filteredCart));
    this.notifyCartChange();
  }

  clearCart(): void {
    localStorage.removeItem('sevan_cart');
    this.notifyCartChange();
  }

  getCartWithProducts(): CartItemWithProduct[] {
    const cart = this.getCart();
    const products = this.getProducts();
    
    return cart.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)!
    })).filter(item => item.product);
  }

  // Pedidos
  getOrders(): Order[] {
    if (typeof window === 'undefined') return [];
    const orders = localStorage.getItem('sevan_orders');
    return orders ? JSON.parse(orders) : [];
  }

  createOrder(orderData: CreateOrderData): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      id: Date.now(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    orders.unshift(newOrder);
    localStorage.setItem('sevan_orders', JSON.stringify(orders));
    
    // Limpiar carrito después de crear pedido
    this.clearCart();
    
    return newOrder;
  }

  updateOrderStatus(orderId: number, status: OrderStatus): Order | null {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      localStorage.setItem('sevan_orders', JSON.stringify(orders));
      return order;
    }
    
    return null;
  }

  // Analytics
  getStats(): AdminStats {
    const products = this.getProducts();
    const orders = this.getOrders();
    
    const totalRevenue = orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + order.total, 0);
    
    const thisMonth = new Date();
    thisMonth.setDate(1);
    
    const monthlyOrders = orders.filter(
      o => new Date(o.createdAt) >= thisMonth
    );
    
    const monthlyRevenue = monthlyOrders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + order.total, 0);

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue,
      monthlyRevenue,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      deliveredOrders: orders.filter(o => o.status === 'delivered').length,
      topProducts: products
        .sort((a, b) => (b.sales || 0) - (a.sales || 0))
        .slice(0, 5),
      recentOrders: orders.slice(0, 10)
    };
  }

  // Notificaciones de cambios
  private notifyCartChange(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartChanged'));
    }
  }

  // Datos por defecto - SOLO productos del catálogo oficial
  private getDefaultProducts(): Product[] {
    // Productos del catálogo oficial con imágenes reales
    const defaultProducts: Product[] = [
      {
        id: 1,
        title: 'Inspirado en Blue Seduction For Men (Antonio Banderas)',
        name: 'Inspirado en Blue Seduction For Men (Antonio Banderas)',
        visible_title: 'Inspirado en Blue Seduction For Men (Antonio Banderas)',
        description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h. No somos afiliados a la marca original.',
        short_description: 'Fragancia inspirada artesanal premium',
        price: 82557,
        sale_price: 70173,
        image_url: '/images/external/blue-seduction-1.jpg',
        images: [
          '/images/external/blue-seduction-1.jpg',
          '/images/external/blue-seduction-2.jpg'
        ],
        brand: 'SEVÁN PERFUM',
        category: 'hombre',
        created_at: new Date().toISOString(),
        scent_family: 'Fresco Amaderado',
        scent_notes: {
          top: ['Bergamota', 'Manzana'],
          middle: ['Lavanda', 'Corazón marino'],
          base: ['Sándalo', 'Cedro', 'Almizcle']
        },
        inspiration: 'Blue Seduction For Men',
        inspiration_brand: 'Antonio Banderas',
        inspiration_fragrance: 'Blue Seduction For Men',
        genre: 'Masculino',
        concentration: '18%',
        stock: 100,
        slug: 'inspirado-en-blue-seduction-for-men-antonio-banderas',
        is_featured: true,
        is_active: true,
        avg_rating: 4.8,
        review_count: 124,
        sales: 234
      },
      {
        id: 2,
        title: 'Inspirado en BOSS Bottled (Hugo Boss)',
        name: 'Inspirado en BOSS Bottled (Hugo Boss)',
        visible_title: 'Inspirado en BOSS Bottled (Hugo Boss)',
        description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h. No somos afiliados a la marca original.',
        short_description: 'Fragancia inspirada artesanal premium',
        price: 88528,
        image_url: '/images/products/boss-bottled-hugo-boss.jpg',
        images: ['/images/products/boss-bottled-hugo-boss.jpg'],
        brand: 'SEVÁN PERFUM',
        category: 'hombre',
        created_at: new Date().toISOString(),
        scent_family: 'Fresco Amaderado',
        scent_notes: {
          top: ['Manzana', 'Canela'],
          middle: ['Geranio', 'Clavo'],
          base: ['Sándalo', 'Vetiver', 'Cedro']
        },
        inspiration: 'BOSS Bottled',
        inspiration_brand: 'Hugo Boss',
        inspiration_fragrance: 'BOSS Bottled',
        genre: 'Masculino',
        concentration: '18%',
        stock: 100,
        slug: 'inspirado-en-boss-bottled-hugo-boss',
        is_featured: true,
        is_active: true,
        avg_rating: 4.9,
        review_count: 89,
        sales: 189
      },
      {
        id: 3,
        title: 'Inspirado en Cuero (Jean Pascal)',
        name: 'Inspirado en Cuero (Jean Pascal)',
        visible_title: 'Inspirado en Cuero (Jean Pascal)',
        description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h. No somos afiliados a la marca original.',
        short_description: 'Fragancia inspirada artesanal premium',
        price: 83492,
        sale_price: 70968,
        image_url: '/images/external/cuero-1.jpg',
        images: [
          '/images/external/cuero-1.jpg',
          '/images/external/cuero-2.jpg'
        ],
        brand: 'SEVÁN PERFUM',
        category: 'hombre',
        created_at: new Date().toISOString(),
        scent_family: 'Oriental Amaderado',
        scent_notes: {
          top: ['Cuero', 'Bergamota'],
          middle: ['Rosa', 'Especias'],
          base: ['Ámbar', 'Sándalo', 'Patchouli']
        },
        inspiration: 'Cuero',
        inspiration_brand: 'Jean Pascal',
        inspiration_fragrance: 'Cuero',
        genre: 'Masculino',
        concentration: '18%',
        stock: 100,
        slug: 'inspirado-en-cuero-jean-pascal',
        is_featured: true,
        is_active: true,
        avg_rating: 4.7,
        review_count: 67,
        sales: 156
      },
      {
        id: 4,
        title: 'Inspirado en Good Girl (Carolina Herrera)',
        name: 'Inspirado en Good Girl (Carolina Herrera)',
        visible_title: 'Inspirado en Good Girl (Carolina Herrera)',
        description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h. No somos afiliados a la marca original.',
        short_description: 'Fragancia inspirada artesanal premium',
        price: 79227,
        image_url: '/images/placeholder-product.svg',
        images: ['/images/placeholder-product.svg'],
        brand: 'SEVÁN PERFUM',
        category: 'mujer',
        created_at: new Date().toISOString(),
        scent_family: 'Oriental Floral',
        scent_notes: {
          top: ['Almendra', 'Café'],
          middle: ['Jazmín', 'Tuberosa'],
          base: ['Vainilla', 'Cacao', 'Sándalo']
        },
        inspiration: 'Good Girl',
        inspiration_brand: 'Carolina Herrera',
        inspiration_fragrance: 'Good Girl',
        genre: 'Femenino',
        concentration: '18%',
        stock: 100,
        slug: 'inspirado-en-good-girl-carolina-herrera',
        is_featured: false,
        is_active: true,
        avg_rating: 4.6,
        review_count: 94,
        sales: 201
      }
    ];

    this.saveProducts(defaultProducts);
    return defaultProducts;
  }
}

// Tipos para el sistema de carrito y pedidos
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  addedAt: string;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}

export interface Order extends CreateOrderData {
  id: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  topProducts: Product[];
  recentOrders: Order[];
}

export default LocalDatabase;