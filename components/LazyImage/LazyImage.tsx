import styles from "./LazyImage.module.scss";
import Image from "next/image";

interface LazyImageProps {
  className?: string;
  src: string;
  alt: string;
  sizes?: string;
}

export default function LazyImage({ className, src, alt, sizes }: LazyImageProps) {
  return (
    <Image
      unoptimized
      className={`${styles.image} ${className}`}
      alt={alt}
      src={src}
      sizes={sizes}
      fill
      onLoadingComplete={(image) => {
        image.classList.add(styles["image--loaded"]);
      }}
    />
  );
}
