'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Package,
  Calendar,
  DollarSign,
  ArrowRight,
  Edit2,
  Save,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Order {
  id: string;
  order_date: string;
  total: number;
  status: string;
  items_count: number;
}

interface CustomerProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
}

export default function AccountPage() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'profile' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<CustomerProfile | null>(null);

  // Proteger la página: redirigir admins y no autenticados
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (isAdmin) {
        router.push('/admin');
      }
    }
  }, [user, loading, isAdmin, router]);

  // Cargar datos del cliente
  useEffect(() => {
    if (user && !isAdmin) {
      loadCustomerData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin]);

  const loadCustomerData = async () => {
    try {
      setLoadingData(true);

      // Obtener perfil del cliente
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('email', user?.email)
        .single();

      if (customerError && customerError.code !== 'PGRST116') {
        console.error('Error fetching customer:', customerError);
      } else if (customerData) {
        setProfile({
          first_name: customerData.first_name || '',
          last_name: customerData.last_name || '',
          email: customerData.email,
          phone: customerData.phone,
          address: customerData.address,
          city: customerData.city,
        });
        setEditForm({
          first_name: customerData.first_name || '',
          last_name: customerData.last_name || '',
          email: customerData.email,
          phone: customerData.phone,
          address: customerData.address,
          city: customerData.city,
        });
      }

      // Obtener órdenes del cliente
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('id, order_date, total, status')
        .eq('customer_email', user?.email)
        .order('order_date', { ascending: false })
        .limit(10);

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      } else if (ordersData) {
        setOrders(
          ordersData.map((order: any) => ({
            id: order.id,
            order_date: order.order_date,
            total: order.total,
            status: order.status || 'pending',
            items_count: 1, // Ajustar según estructura real
          }))
        );
      }
    } catch (error) {
      console.error('Error loading customer data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!editForm || !user?.email) return;

    try {
      const { error } = await supabase
        .from('customers')
        .upsert(
          {
            email: user.email,
            first_name: editForm.first_name,
            last_name: editForm.last_name,
            phone: editForm.phone,
            address: editForm.address,
            city: editForm.city,
          },
          { onConflict: 'email' }
        );

      if (error) {
        console.error('Error updating profile:', error);
        alert('Error al guardar el perfil');
      } else {
        setProfile(editForm);
        setIsEditing(false);
        alert('Perfil actualizado correctamente');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error al guardar el perfil');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-28 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full"
        />
      </div>
    );
  }

  if (!user || isAdmin) {
    return null;
  }

  const totalSpent = orders.reduce((sum: number, order: Order) => sum + (order.total || 0), 0);
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-28 sm:pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
              Mi Cuenta
            </h1>
            <p className="text-gray-300">
              Bienvenido de vuelta, {profile?.first_name || 'cliente'}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </motion.button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex gap-2 sm:gap-4 border-b border-gray-700 overflow-x-auto"
        >
          {['overview', 'orders', 'profile', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-medium text-sm sm:text-base transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-gray-400 hover:text-gold'
              }`}
            >
              {tab === 'overview' && 'Inicio'}
              {tab === 'orders' && 'Mis Órdenes'}
              {tab === 'profile' && 'Perfil'}
              {tab === 'settings' && 'Configuración'}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-gold/20 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-gray-300 text-sm">Órdenes Totales</h3>
                </div>
                <p className="text-3xl font-bold text-gold">{totalOrders}</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-gray-300 text-sm">Gastado</h3>
                </div>
                <p className="text-3xl font-bold text-green-400">
                  ${totalSpent.toLocaleString('es-CO')}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Heart className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-gray-300 text-sm">Favoritos</h3>
                </div>
                <p className="text-3xl font-bold text-purple-400">0</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Package className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-gray-300 text-sm">Puntos</h3>
                </div>
                <p className="text-3xl font-bold text-blue-400">{totalOrders * 100}</p>
              </motion.div>
            </div>

            {/* Recent Orders */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Órdenes Recientes</h2>
                <Link href="/account?tab=orders" className="text-gold hover:text-gold-light text-sm flex items-center gap-1">
                  Ver todo <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order: Order) => (
                    <motion.div
                      key={order.id}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-gold/30 transition-all"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-gold/10 rounded-lg">
                          <Package className="w-4 h-4 text-gold" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold">Orden #{order.id.slice(0, 8)}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(order.order_date).toLocaleDateString('es-CO')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">${order.total.toLocaleString('es-CO')}</p>
                        <p className={`text-xs font-semibold ${
                          order.status === 'completed' ? 'text-green-400' :
                          order.status === 'pending' ? 'text-yellow-400' :
                          'text-gray-400'
                        }`}>
                          {order.status === 'completed' ? '✓ Entregada' :
                           order.status === 'pending' ? '⏳ Pendiente' :
                           order.status}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No tienes órdenes aún</p>
                  <Link href="/products" className="text-gold hover:text-gold-light font-semibold flex items-center justify-center gap-2">
                    Comenzar a comprar <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/30 border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Mis Órdenes</h2>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order: Order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ x: 4 }}
                    className="p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-gold/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white font-bold mb-1">Orden #{order.id}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.order_date).toLocaleDateString('es-CO')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {order.items_count} artículo(s)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">${order.total.toLocaleString('es-CO')}</p>
                        <p className={`text-xs font-semibold mt-1 ${
                          order.status === 'completed' ? 'text-green-400' :
                          order.status === 'pending' ? 'text-yellow-400' :
                          'text-gray-400'
                        }`}>
                          {order.status === 'completed' ? '✓ Entregada' :
                           order.status === 'pending' ? '⏳ Pendiente' :
                           order.status}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No tienes órdenes aún</p>
                <Link href="/products" className="inline-block px-6 py-2 bg-gold/20 border border-gold/40 text-gold rounded-lg hover:bg-gold/30 transition-all">
                  Explorar Productos
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Mi Perfil</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/40 text-gold rounded-lg hover:bg-gold/30 transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 transition-all"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={editForm?.first_name || ''}
                      onChange={(e) =>
                        setEditForm((f: CustomerProfile | null) => f ? { ...f, first_name: e.target.value } : null)
                      }
                      className="px-4 py-2 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-gold"
                    />
                    <input
                      type="text"
                      placeholder="Apellido"
                      value={editForm?.last_name || ''}
                      onChange={(e) =>
                        setEditForm((f: CustomerProfile | null) => f ? { ...f, last_name: e.target.value } : null)
                      }
                      className="px-4 py-2 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-gold"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    disabled
                    value={editForm?.email || ''}
                    className="w-full px-4 py-2 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-500 opacity-50 cursor-not-allowed"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={editForm?.phone || ''}
                    onChange={(e) =>
                      setEditForm((f: CustomerProfile | null) => f ? { ...f, phone: e.target.value } : null)
                    }
                    className="w-full px-4 py-2 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-gold"
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={editForm?.address || ''}
                    onChange={(e) =>
                      setEditForm((f: CustomerProfile | null) => f ? { ...f, address: e.target.value } : null)
                    }
                    className="w-full px-4 py-2 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-gold"
                  />
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={editForm?.city || ''}
                    onChange={(e) =>
                      setEditForm((f: CustomerProfile | null) => f ? { ...f, city: e.target.value } : null)
                    }
                    className="w-full px-4 py-2 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-gold"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="w-full px-4 py-3 bg-gold/20 border border-gold/40 text-gold rounded-lg hover:bg-gold/30 transition-all flex items-center justify-center gap-2 font-semibold"
                  >
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Nombre</p>
                    <p className="text-white font-semibold">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <div className="flex items-center gap-2 text-white">
                      <Mail className="w-4 h-4 text-gold" />
                      {profile?.email}
                    </div>
                  </div>
                  {profile?.phone && (
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Teléfono</p>
                      <div className="flex items-center gap-2 text-white">
                        <Phone className="w-4 h-4 text-gold" />
                        {profile.phone}
                      </div>
                    </div>
                  )}
                  {profile?.address && (
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Dirección</p>
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="w-4 h-4 text-gold" />
                        {profile.address}
                      </div>
                    </div>
                  )}
                  {profile?.city && (
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Ciudad</p>
                      <p className="text-white">{profile.city}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Notificaciones</h3>
                <label className="flex items-center gap-3 text-gray-300">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-gold" />
                  Recibir notificaciones por email sobre mis órdenes
                </label>
              </div>

              <hr className="border-gray-700" />

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Cuenta</h3>
                <button className="w-full px-4 py-3 bg-red-500/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-500/30 transition-all font-semibold">
                  Cambiar Contraseña
                </button>
              </div>

              <hr className="border-gray-700" />

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Zona de Peligro</h3>
                <button className="w-full px-4 py-3 bg-red-600/20 border border-red-600/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all font-semibold">
                  Eliminar Cuenta
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
