/**
 * SEVAN AI PERFUMES - DEMO PAGE
 * ============================
 * Página de demostración para probar todas las funcionalidades
 */

import dynamicImport from 'next/dynamic';

export const dynamic = 'force-dynamic';

const SevanFunctionalityDemo = dynamicImport(() => import('@/components/SevanFunctionalityDemo'), {
  ssr: false,
  loading: () => null,
});

export default function DemoPage() {
  return <SevanFunctionalityDemo />;
}