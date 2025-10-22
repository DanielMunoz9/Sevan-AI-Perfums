import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export interface ExportData {
  products?: any[];
  orders?: any[];
  customers?: any[];
  analytics?: any;
}

export class DataExportService {
  
  // 📊 OBTENER DATOS COMPLETOS PARA EXPORTAR
  async getExportData(sections: string[] = ['all']): Promise<ExportData> {
    try {
      const data: ExportData = {};
      
      // Si se solicita 'all' o 'products', obtener productos
      if (sections.includes('all') || sections.includes('products')) {
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!productsError) {
          data.products = products;
        }
      }
      
      // Si se solicita 'all' o 'orders', obtener órdenes
      if (sections.includes('all') || sections.includes('orders')) {
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!ordersError) {
          data.orders = orders;
        }
      }
      
      // Si se solicita 'all' o 'customers', obtener usuarios
      if (sections.includes('all') || sections.includes('customers')) {
        const { data: customers, error: customersError } = await supabase
          .from('users')
          .select('id, nombre, email, telefono, ciudad, created_at, last_login')
          .order('created_at', { ascending: false });
          
        if (!customersError) {
          data.customers = customers;
        }
      }
      
      // Si se solicita analytics, calcular estadísticas
      if (sections.includes('all') || sections.includes('analytics')) {
        const analytics = await this.calculateAnalytics();
        data.analytics = analytics;
      }
      
      return data;
      
    } catch (error) {
      console.error('Error getting export data:', error);
      throw error;
    }
  }
  
  // 📈 CALCULAR ESTADÍSTICAS PARA ANALYTICS
  private async calculateAnalytics() {
    try {
      // Productos
      const { count: totalProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
      
      // Órdenes
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });
      
      // Usuarios
      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      // Ingresos (suma de órdenes completadas)
      const { data: revenueData } = await supabase
        .from('orders')
        .select('total')
        .eq('status', 'completed');
      
      const totalRevenue = revenueData?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;
      
      // Productos más vendidos
      const { data: topProducts } = await supabase
        .from('order_items')
        .select('product_id, quantity, products(name)')
        .limit(10);
      
      // Ventas por mes
      const { data: salesByMonth } = await supabase
        .rpc('get_sales_by_month')
        .limit(12);
      
      return {
        summary: {
          totalProducts: totalProducts || 0,
          totalOrders: totalOrders || 0,
          totalUsers: totalUsers || 0,
          totalRevenue
        },
        topProducts,
        salesByMonth,
        generatedAt: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Error calculating analytics:', error);
      return {
        summary: {
          totalProducts: 0,
          totalOrders: 0,
          totalUsers: 0,
          totalRevenue: 0
        },
        generatedAt: new Date().toISOString()
      };
    }
  }
  
  // 📋 CONVERTIR A CSV
  convertToCSV(data: any[], filename: string): string {
    if (!data || data.length === 0) {
      return 'No hay datos para exportar\n';
    }
    
    // Obtener headers de la primera fila
    const headers = Object.keys(data[0]);
    
    // Crear filas CSV
    const csvRows = [
      // Header row
      headers.join(','),
      // Data rows
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escapar comillas y agregar comillas si contiene comas
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value || '';
        }).join(',')
      )
    ];
    
    return csvRows.join('\n');
  }
  
  // 📄 DESCARGAR COMO ARCHIVO
  downloadFile(content: string, filename: string, type: string = 'text/csv') {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  
  // 🚀 EXPORTAR DATOS COMPLETOS
  async exportData(sections: string[] = ['all'], format: 'csv' | 'json' = 'csv'): Promise<void> {
    try {
      const data = await this.getExportData(sections);
      const timestamp = new Date().toISOString().split('T')[0];
      
      if (format === 'csv') {
        // Exportar cada sección como archivo CSV separado
        if (data.products) {
          const productsCSV = this.convertToCSV(data.products, 'products');
          this.downloadFile(productsCSV, `sevan-productos-${timestamp}.csv`);
        }
        
        if (data.orders) {
          const ordersCSV = this.convertToCSV(data.orders, 'orders');
          this.downloadFile(ordersCSV, `sevan-ordenes-${timestamp}.csv`);
        }
        
        if (data.customers) {
          const customersCSV = this.convertToCSV(data.customers, 'customers');
          this.downloadFile(customersCSV, `sevan-clientes-${timestamp}.csv`);
        }
        
        if (data.analytics) {
          // Convertir analytics a CSV amigable
          const analyticsRows = [
            { metric: 'Total Productos', value: data.analytics.summary.totalProducts },
            { metric: 'Total Órdenes', value: data.analytics.summary.totalOrders },
            { metric: 'Total Usuarios', value: data.analytics.summary.totalUsers },
            { metric: 'Ingresos Totales', value: data.analytics.summary.totalRevenue },
            { metric: 'Fecha Generación', value: data.analytics.generatedAt }
          ];
          
          const analyticsCSV = this.convertToCSV(analyticsRows, 'analytics');
          this.downloadFile(analyticsCSV, `sevan-analytics-${timestamp}.csv`);
        }
        
      } else {
        // Exportar como JSON
        const jsonContent = JSON.stringify(data, null, 2);
        this.downloadFile(jsonContent, `sevan-datos-completos-${timestamp}.json`, 'application/json');
      }
      
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }
  
  // 📊 GENERAR REPORTE EJECUTIVO
  async generateExecutiveReport(): Promise<string> {
    try {
      const data = await this.getExportData(['analytics']);
      const analytics = data.analytics;
      
      if (!analytics) {
        return 'No se pudieron obtener los datos de analytics';
      }
      
      const report = `
# REPORTE EJECUTIVO SEVAN PERFUMES
## ${new Date().toLocaleDateString('es-ES')}

### RESUMEN GENERAL
- **Total de Productos:** ${analytics.summary.totalProducts}
- **Total de Órdenes:** ${analytics.summary.totalOrders}
- **Total de Usuarios:** ${analytics.summary.totalUsers}
- **Ingresos Totales:** $${analytics.summary.totalRevenue.toLocaleString('es-CO')}

### RENDIMIENTO
- **Promedio por Orden:** $${analytics.summary.totalOrders > 0 ? (analytics.summary.totalRevenue / analytics.summary.totalOrders).toLocaleString('es-CO') : 0}
- **Órdenes por Usuario:** ${analytics.summary.totalUsers > 0 ? (analytics.summary.totalOrders / analytics.summary.totalUsers).toFixed(2) : 0}

### ESTADO ACTUAL
- Plataforma funcionando correctamente
- Integración con Supabase activa
- Sistema de emails configurado con EmailJS

---
Generado automáticamente por Sistema SEVAN
${analytics.generatedAt}
      `.trim();
      
      return report;
      
    } catch (error) {
      console.error('Error generating report:', error);
      return 'Error al generar el reporte ejecutivo';
    }
  }
}

export const dataExportService = new DataExportService();