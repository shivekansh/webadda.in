import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoaderOne } from './ui/loader';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export function ImageWithSkeleton({ src, alt, containerClassName, className, ...props }: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-800 ${containerClassName || ''}`}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-800/50 flex items-center justify-center"
          >
            <LoaderOne className="scale-50 opacity-70" />
          </motion.div>
        )}
      </AnimatePresence>
      <img
        src={src}
        alt={alt || ''}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}
