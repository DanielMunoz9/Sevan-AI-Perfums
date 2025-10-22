import React from 'react';

// Placeholder admin component to keep legacy admin test route compiling.
const RealCMSAdminLimpio: React.FC = () => {
  return (
    <div className="p-6 border border-dashed border-neutral-400 text-center">
      <h2 className="text-lg font-semibold">Panel CMS temporalmente deshabilitado</h2>
      <p className="mt-3 text-sm text-neutral-600">
        Este componente es un stub y debe reemplazarse por la implementación real del CMS
        cuando el módulo esté listo.
      </p>
    </div>
  );
};

export default RealCMSAdminLimpio;
