'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, User, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ProfessionalAlert, useProfessionalAlert, AlertsContainer } from '@/components/ui/ProfessionalAlert';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const router = useRouter();
  const { alerts, showAlert, removeAlert } = useProfessionalAlert();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        console.log('✅ Login exitoso!', result);

        const normalizedRole = (result.role ?? '').toLowerCase();
        const adminRoleCandidates = new Set(['admin', 'super_admin', 'superadmin', 'manager', 'owner', 'crm', 'staff']);
        const detectedAdmin = typeof result.isAdmin === 'boolean'
          ? result.isAdmin
          : adminRoleCandidates.has(normalizedRole);

        console.log(`🔍 Usuario detectado como: ${detectedAdmin ? 'ADMIN' : 'CLIENTE'} (rol=${normalizedRole || 'sin-rol'})`);
        
        const targetUrl = detectedAdmin ? '/admin' : '/account';
        const message = detectedAdmin 
          ? 'Redirigiendo al CMS Admin...' 
          : 'Redirigiendo a tu panel...';
        
        showAlert({
          type: 'success',
          title: '¡Login Exitoso! 👋',
          message: message,
          duration: 2000
        });

        console.log(`🚀 Redirigiendo a: ${targetUrl}`);
        
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 500);
        
        // Reset form
        setFormData({
          email: '',
          password: ''
        });
        
      } else {
        console.error('❌ Error en login:', result.error);
        showAlert({
          type: 'error',
          title: 'Error al Iniciar Sesión',
          message: result.error || 'Verifica tu email y contraseña.',
          duration: 5000
        });
      }
    } catch (error) {
      console.error('❌ Excepción en login:', error);
      showAlert({
        type: 'error',
        title: 'Error al Iniciar Sesión',
        message: 'Verifica tu conexión e intenta de nuevo.',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900/95 to-black relative overflow-hidden flex items-center justify-center">
      {/* Alerts Container */}
      <AlertsContainer alerts={alerts} onRemove={removeAlert} />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(147,51,234,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-gold-soft hover:text-gold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-full px-6 py-3 mb-6"
              >
                <User className="w-4 h-4 text-gold animate-pulse" />
                <span className="text-gold-soft text-sm font-semibold tracking-wide">
                  INICIAR SESIÓN
                </span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">
                <span className="bg-gradient-to-r from-gold-deep/90 via-gold/95 to-gold-light/90 bg-clip-text text-transparent">
                  Bienvenido de Vuelta
                </span>
              </h1>

              <p className="text-gray-300">
                Accede a tu cuenta y descubre nuevas fragancias con
                <span className="text-purple-400 font-medium"> Amelie AI</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                    placeholder="Tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-300">
                  <input type="checkbox" className="mr-2 accent-gold" />
                  Recordarme
                </label>
                <a 
                  href="/forgot-password" 
                  className="text-gold hover:text-gold-light transition-colors text-sm"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-gold-deep to-gold text-black font-semibold py-3 rounded-xl hover:from-gold hover:to-gold-soft transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Iniciar Sesión
                  </>
                )}
              </motion.button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-10">
              <p className="text-gray-400 text-sm mb-4">
                ¿No tienes una cuenta?
              </p>
              <motion.a
                href="/register"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-purple-700/20 border border-purple-500/30 text-purple-300 font-medium px-6 py-3 rounded-xl hover:border-purple-400/50 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                Crear Cuenta Gratis
              </motion.a>
            </div>

            {/* Legal */}
            <div className="mt-10 pt-6 border-t border-gray-700">
              <p className="text-center text-xs text-gray-500">
                Al iniciar sesión, aceptas nuestros{' '}
                <a href="/terms" className="text-gold hover:text-gold-light transition-colors">
                  Términos de Servicio
                </a>
              </p>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Powered by Amelie AI - Tu asistente personal de fragancias</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}