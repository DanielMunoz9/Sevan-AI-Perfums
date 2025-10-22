import { sevanEmailJS } from '@/services/sevan-emailjs-service';
import { supabase } from '@/lib/supabase';

export interface ExportData {
  products?: any[];
  orders?: any[];
  customers?: any[];
  analytics?: any[];
}

export class ExportService {
  
  // 📊 EXPORTAR DATOS A CSV
  exportToCSV(data: any[], filename: string): void {
    if (!data || data.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    // Obtener encabezados
    const headers = Object.keys(data[0]);
    
    // Crear contenido CSV
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escapar valores que contengan comas o comillas
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 📈 OBTENER DATOS DE ANALYTICS
  async getAnalyticsData(): Promise<any[]> {
    try {
      const { data: products } = await supabase
        .from('products')
        .select('id, nombre, precio, categoria, stock, created_at');

      const { data: orders } = await supabase
        .from('orders')
        .select('id, total, status, created_at');

      // Crear datos de analytics combinados
      const analytics = [
        {
          metric: 'Total Products',
          value: products?.length || 0,
          date: new Date().toISOString()
        },
        {
          metric: 'Total Orders',
          value: orders?.length || 0,
          date: new Date().toISOString()
        },
        {
          metric: 'Total Revenue',
          value: orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0,
          date: new Date().toISOString()
        }
      ];

      return analytics;
    } catch (error) {
      console.error('Error getting analytics data:', error);
      throw new Error('Error al obtener datos de analytics');
    }
  }

  // 📦 OBTENER DATOS DE PRODUCTOS
  async getProductsData(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting products data:', error);
      throw new Error('Error al obtener datos de productos');
    }
  }

  // 🛍️ OBTENER DATOS DE ÓRDENES
  async getOrdersData(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting orders data:', error);
      throw new Error('Error al obtener datos de órdenes');
    }
  }

  // 👥 OBTENER DATOS DE CLIENTES  
  async getCustomersData(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, nombre, telefono, created_at, role')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting customers data:', error);
      throw new Error('Error al obtener datos de clientes');
    }
  }

  // 📧 ENVIAR REPORTE POR EMAIL
  async sendReportByEmail(reportType: 'products' | 'orders' | 'customers' | 'analytics' | 'users', email: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      // Obtener datos según el tipo de reporte
      let data: any[] = [];
      let reportName = '';

      switch (reportType) {
        case 'products':
          data = await this.getProductsData();
          reportName = 'Productos';
          break;
        case 'orders':
          data = await this.getOrdersData();
          reportName = 'Órdenes';
          break;
        case 'customers':
          data = await this.getCustomersData();
          reportName = 'Clientes';
          break;
        case 'analytics':
          data = await this.getAnalyticsData();
          reportName = 'Analytics';
          break;
        case 'users':
          data = []; // Implementar después
          reportName = 'Usuarios';
          break;
      }

      // Crear resumen del reporte
      const summary = {
        total_records: data.length,
        generated_at: new Date().toLocaleString('es-ES'),
        report_type: reportName
      };

      // Enviar email usando EmailJS
      const emailResult = await sevanEmailJS.sendWithTemplate(
        'contact', // Usar template de contacto
        email,
        `SEVAN - Reporte de ${reportName}`,
        `Reporte generado con ${summary.total_records} registros`,
        {
          report_type: reportName,
          total_records: summary.total_records,
          generated_date: summary.generated_at,
          user_name: 'Administrador'
        }
      );

      return { success: emailResult };
    } catch (error) {
      console.error('Error sending report by email:', error);
      return {
        success: false,
        error: 'Error al enviar el reporte por email'
      };
    }
  }

  // 🔄 EXPORTAR TODO (función combinada)
  async exportAll(): Promise<void> {
    try {
      const [products, orders, customers, analytics] = await Promise.all([
        this.getProductsData(),
        this.getOrdersData(), 
        this.getCustomersData(),
        this.getAnalyticsData()
      ]);

      // Exportar cada conjunto de datos
      if (products.length > 0) this.exportToCSV(products, 'sevan_productos');
      if (orders.length > 0) this.exportToCSV(orders, 'sevan_ordenes');
      if (customers.length > 0) this.exportToCSV(customers, 'sevan_clientes');
      if (analytics.length > 0) this.exportToCSV(analytics, 'sevan_analytics');

      alert('✅ Todos los reportes han sido exportados exitosamente');
    } catch (error) {
      console.error('Error exporting all data:', error);
      alert('❌ Error al exportar los datos');
    }
  }
}

export const exportService = new ExportService();