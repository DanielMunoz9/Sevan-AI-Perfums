/**
 * 🖼️ IMAGE UPLOAD SERVICE
 * Handles image uploads for the admin panel
 */

export interface ImageUploadResult {
  success: boolean;
  url?: string;
  publicUrl?: string;
  error?: string;
  message?: string;
}

class ImageUploadServiceClass {
  /**
   * Upload product image
   */
  async uploadProductImage(
    file: File,
    productId: string,
    compress: boolean = false
  ): Promise<ImageUploadResult> {
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productId', productId);
      formData.append('compress', compress.toString());

      // Upload to API endpoint
      const response = await fetch('/api/upload/product-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || 'Error uploading image',
        };
      }

      const data = await response.json();
      return {
        success: true,
        url: data.url,
        publicUrl: data.publicUrl,
        message: 'Image uploaded successfully',
      };
    } catch (error) {
      console.error('Image upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error uploading image',
      };
    }
  }

  /**
   * Upload multiple images
   */
  async uploadMultipleImages(
    files: File[],
    productId: string,
    compress: boolean = false
  ): Promise<ImageUploadResult[]> {
    const results: ImageUploadResult[] = [];

    for (const file of files) {
      const result = await this.uploadProductImage(file, productId, compress);
      results.push(result);
    }

    return results;
  }

  /**
   * Delete product image
   */
  async deleteProductImage(imageUrl: string, productId: string): Promise<ImageUploadResult> {
    try {
      const response = await fetch('/api/upload/product-image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          productId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || 'Error deleting image',
        };
      }

      return {
        success: true,
        message: 'Image deleted successfully',
      };
    } catch (error) {
      console.error('Image deletion error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error deleting image',
      };
    }
  }
}

// Export singleton instance
export const imageUploadService = new ImageUploadServiceClass();

// Export class for testing
export default imageUploadService;
