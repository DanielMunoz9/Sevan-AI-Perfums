import RealCMSAdminLimpio from '@/components/admin/RealCMSAdminLimpio';

export default function AdminTest() {
  return (
    <div>
      <div className="bg-red-600 text-white p-4 text-center font-bold text-xl">
        🧪 ADMIN TEST - RUTA DE DIAGNÓSTICO
      </div>
      <div className="p-8 text-center">
        <p className="mb-6">Admin test page - temporalmente deshabilitado para deploy</p>
        <RealCMSAdminLimpio />
      </div>
    </div>
  );
}