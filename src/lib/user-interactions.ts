import { supabase } from './supabase';

// Servicio para gestionar favoritos
export class FavoritesService {
  
  // Obtener session ID para usuarios no autenticados
  private getSessionId(): string {
    let sessionId = localStorage.getItem('sevan_session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sevan_session_id', sessionId);
    }
    return sessionId;
  }

  // Obtener favoritos del usuario
  async getFavorites(): Promise<string[]> {
    try {
      const sessionId = this.getSessionId();
      
      const { data, error } = await supabase
        .from('user_favorites')
        .select('product_id')
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error getting favorites:', error);
        return [];
      }

      return data.map(item => item.product_id);
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  // Agregar producto a favoritos con upsert defensivo
  async addToFavorites(productId: string): Promise<boolean> {
    try {
      const sessionId = this.getSessionId();
      const cleanProductId = productId.toString().trim();
      
      // Verificar si ya existe para evitar duplicados
      const { data: existing } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('session_id', sessionId)
        .eq('product_id', cleanProductId)
        .single();

      if (existing) {
        console.log('Product already in favorites');
        return true; // Ya está en favoritos
      }

      const { error } = await supabase
        .from('user_favorites')
        .insert({
          session_id: sessionId,
          product_id: cleanProductId
        });

      if (error) {
        console.error('Error adding to favorites:', error);
        // Si el error es por duplicado, no es crítico
        if (error.code === '23505') return true;
        return false;
      }

      console.log('✅ Product added to favorites:', cleanProductId);
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  }

  // Remover producto de favoritos con logging mejorado
  async removeFromFavorites(productId: string): Promise<boolean> {
    try {
      const sessionId = this.getSessionId();
      const cleanProductId = productId.toString().trim();
      
      console.log('🗑️ Removing from favorites:', { sessionId, productId: cleanProductId });
      
      const { data, error, count } = await supabase
        .from('user_favorites')
        .delete({ count: 'exact' })
        .eq('session_id', sessionId)
        .eq('product_id', cleanProductId);

      if (error) {
        console.error('❌ Error removing from favorites:', error);
        return false;
      }

      console.log(`✅ Removed ${count || 0} items from favorites`);
      return (count || 0) > 0; // Retorna true solo si se eliminó algo
    } catch (error) {
      console.error('❌ Error removing from favorites:', error);
      return false;
    }
  }

  // Verificar si un producto está en favoritos
  async isFavorite(productId: string): Promise<boolean> {
    try {
      const sessionId = this.getSessionId();
      
      const { data, error } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('session_id', sessionId)
        .eq('product_id', productId)
        .single();

      return !error && data !== null;
    } catch (error) {
      return false;
    }
  }
}

// Servicio para gestionar reviews
export class ReviewsService {
  
  private getSessionId(): string {
    let sessionId = localStorage.getItem('sevan_session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sevan_session_id', sessionId);
    }
    return sessionId;
  }

  // Obtener reviews de un producto
  async getProductReviews(productId: string) {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting reviews:', error);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error getting reviews:', error);
      return [];
    }
  }

  // Crear nueva review
  async createReview(productId: string, reviewData: {
    rating: number;
    review_text?: string;
    reviewer_name: string;
    reviewer_email?: string;
  }): Promise<boolean> {
    try {
      const sessionId = this.getSessionId();
      
      const { error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: productId,
          session_id: sessionId,
          rating: reviewData.rating,
          review_text: reviewData.review_text,
          reviewer_name: reviewData.reviewer_name,
          reviewer_email: reviewData.reviewer_email,
          is_approved: false // Requiere aprobación manual
        });

      if (error) {
        console.error('Error creating review:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error creating review:', error);
      return false;
    }
  }

  // Obtener estadísticas de reviews para un producto
  async getProductReviewStats(productId: string): Promise<{
    average: number;
    count: number;
    distribution: { [key: number]: number };
  }> {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('rating')
        .eq('product_id', productId)
        .eq('is_approved', true);

      if (error || !data) {
        return { average: 0, count: 0, distribution: {} };
      }

      const count = data.length;
      const sum = data.reduce((acc, review) => acc + review.rating, 0);
      const average = count > 0 ? sum / count : 0;

      // Distribución por rating (1-5 estrellas)
      const distribution = data.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {} as { [key: number]: number });

      return { average, count, distribution };
    } catch (error) {
      console.error('Error getting review stats:', error);
      return { average: 0, count: 0, distribution: {} };
    }
  }
}

// Servicio para newsletter
export class NewsletterService {
  
  // Suscribir email al newsletter
  async subscribe(email: string, name?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: email.toLowerCase().trim(),
          name: name?.trim()
        });

      if (error) {
        // Si el email ya existe, no es un error crítico
        if (error.code === '23505') { // unique violation
          console.log('Email already subscribed');
          return true;
        }
        console.error('Error subscribing to newsletter:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      return false;
    }
  }

  // Desuscribir email del newsletter
  async unsubscribe(email: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({
          is_active: false,
          unsubscribed_at: new Date().toISOString()
        })
        .eq('email', email.toLowerCase().trim());

      if (error) {
        console.error('Error unsubscribing from newsletter:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      return false;
    }
  }

  // Verificar si un email está suscrito
  async isSubscribed(email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('is_active')
        .eq('email', email.toLowerCase().trim())
        .eq('is_active', true)
        .single();

      return !error && data !== null;
    } catch (error) {
      return false;
    }
  }
}

// Instancias singleton
export const favoritesService = new FavoritesService();
export const reviewsService = new ReviewsService();
export const newsletterService = new NewsletterService();