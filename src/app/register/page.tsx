'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Check, Bot, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ProfessionalAlert, useProfessionalAlert, AlertsContainer } from '@/components/ui/ProfessionalAlert';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const router = useRouter();
  const { alerts, showAlert, removeAlert } = useProfessionalAlert();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmar contraseña es requerido';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
      const result = await signUp(
        formData.email, 
        formData.password, 
        formData.firstName, 
        formData.lastName
      );
      
      if (result.success) {
        showAlert({
          type: 'success',
          title: '¡Registro Exitoso! 🎉',
          message: 'Te hemos enviado un email de confirmación. Verifica tu bandeja de entrada.',
          duration: 5000
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        showAlert({
          type: 'error',
          title: 'Error al Registrar',
          message: result.error || 'Error al crear la cuenta. Inténtalo de nuevo.',
          duration: 5000
        });
      }
    } catch (error) {
      showAlert({
        type: 'error',
        title: 'Error al Registrar',
        message: 'Error al crear la cuenta. Verifica tu conexión e intenta de nuevo.',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    'Acceso exclusivo a nuevas fragancias',
    'Descuentos especiales para miembros',
    'Recomendaciones personalizadas con IA',
    'Historial de compras y favoritos',
    'Envío gratis en compras mayores a $150.000'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900/95 to-black relative overflow-hidden">
      {/* Alerts Container */}
      <AlertsContainer alerts={alerts} onRemove={removeAlert} />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(147,51,234,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-full px-6 py-3 mb-8"
              >
                <UserPlus className="w-4 h-4 text-gold animate-pulse" />
                <span className="text-gold-soft text-sm font-semibold tracking-wide">
                  ÚNETE A SEVÁN PERFUM
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-serif font-light mb-6">
                <span className="bg-gradient-to-r from-gold-deep/90 via-gold/95 to-gold-light/90 bg-clip-text text-transparent">
                  Crea tu Cuenta
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Únete a miles de personas que han descubierto su fragancia perfecta 
                con asesoría personalizada de <span className="text-purple-400 font-medium">Amelie AI</span>.
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-2xl font-serif text-gold-soft mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-gold" />
                Beneficios Exclusivos
              </h3>

              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-gold via-gold-soft to-gold-light rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-black font-bold" />
                  </div>
                  <span className="text-gray-300 text-base leading-relaxed group-hover:text-white transition-colors">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="p-8 bg-gradient-to-br from-purple-900/30 via-gray-800/50 to-gray-900/70 rounded-2xl border-2 border-purple-500/30 backdrop-blur-sm shadow-2xl hover:border-purple-400/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-base mb-2">
                    <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">Amelie AI</span> - Tu asistente personal
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Recibe recomendaciones de fragancias personalizadas basadas en tus gustos, 
                    ocasiones especiales y estilo de vida. Inteligencia artificial al servicio de tu elegancia.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/70 to-gray-900/90 rounded-3xl p-10 border-2 border-white/10 backdrop-blur-md shadow-2xl"
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-serif text-gold mb-2">Formulario de Registro</h2>
              <p className="text-gray-400 text-sm">Completa tus datos para comenzar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">{/* Reducido de space-y-6 a space-y-5 */}
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-200 text-sm font-semibold mb-2.5">
                    Nombre *
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors w-5 h-5" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-black/60 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all outline-none"
                      placeholder="Ej: Juan"
                    />
                  </div>
                  {errors.firstName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs mt-2 flex items-center gap-1"
                    >
                      ⚠️ {errors.firstName}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-200 text-sm font-semibold mb-2.5">
                    Apellido *
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors w-5 h-5" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-black/60 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all outline-none"
                      placeholder="Ej: Pérez"
                    />
                  </div>
                  {errors.lastName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs mt-2 flex items-center gap-1"
                    >
                      ⚠️ {errors.lastName}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-200 text-sm font-semibold mb-2.5">
                  Correo Electrónico *
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-black/60 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all outline-none"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-2 flex items-center gap-1"
                  >
                    ⚠️ {errors.email}
                  </motion.p>
                )}
                <p className="text-gray-500 text-xs mt-1.5 ml-1">Te enviaremos un correo de verificación</p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-200 text-sm font-semibold mb-2.5">
                  Contraseña *
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-black/60 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all outline-none"
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-2 flex items-center gap-1"
                  >
                    ⚠️ {errors.password}
                  </motion.p>
                )}
                <p className="text-gray-500 text-xs mt-1.5 ml-1">Debe contener al menos 6 caracteres</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-200 text-sm font-semibold mb-2.5">
                  Confirmar Contraseña *
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-black/60 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all outline-none"
                    placeholder="Repite tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-2 flex items-center gap-1"
                  >
                    ⚠️ {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Terms */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <p className="text-xs text-gray-300 leading-relaxed">
                  Al crear una cuenta, aceptas nuestros{' '}
                  <a href="/terms" className="text-gold hover:text-gold-light transition-colors font-medium underline">
                    Términos y Condiciones
                  </a>{' '}
                  y{' '}
                  <a href="/privacy" className="text-gold hover:text-gold-light transition-colors font-medium underline">
                    Política de Privacidad
                  </a>
                  .
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-gold-deep via-gold to-gold-light text-black font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
              >{/* Mejorado tamaño texto y espaciado */}
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Crear Cuenta
                  </>
                )}
              </motion.button>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  ¿Ya tienes una cuenta?{' '}
                  <a 
                    href="/login" 
                    className="text-gold hover:text-gold-light transition-colors font-medium"
                  >
                    Inicia sesión aquí
                  </a>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}