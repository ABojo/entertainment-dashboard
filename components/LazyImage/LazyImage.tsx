import styles from "./LazyImage.module.scss";
import Image from "next/image";

interface LazyImageProps {
  className?: string;
  src: string;
  alt: string;
}

export default function LazyImage({ className, src, alt }: LazyImageProps) {
  return (
    <Image
      className={`${styles.image} ${className}`}
      alt={alt}
      src={src}
      fill
      onLoadingComplete={(image) => {
        image.classList.add(styles["image--loaded"]);
      }}
    />
  );
}
