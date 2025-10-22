'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  sizes,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  fallbackSrc = '/images/default-perfume.jpg'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const resolvedAlt = alt?.trim().length ? alt : 'Imagen sin descripción';

  const imageProps = {
    src: imgSrc,
    className: `${className} ${isLoading ? 'animate-pulse bg-gray-200' : ''} ${hasError ? 'opacity-75' : ''}`,
    onError: handleError,
    onLoad: handleLoad,
    quality,
    priority,
    placeholder,
    ...(fill ? { fill: true } : { width: width || 400, height: height || 400 }),
    ...(sizes && { sizes })
  };

  return (
    <div className="relative">
      <Image {...imageProps} alt={resolvedAlt} />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      {hasError && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded">
          Default
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;