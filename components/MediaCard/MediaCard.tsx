import styles from "./MediaCard.module.scss";
import MediaWithThumbnail from "../../types/MediaWithThumbnail";
import Image from "next/image";
import SVGIcon from "../SVGIcon/SVGIcon";
import Link from "next/link";

interface MediaCardProps {
  media: MediaWithThumbnail;
}

export default function MediaCard({ media }: MediaCardProps) {
  return (
    <div className={styles.card}>
      <Link href={`/media/${media.id}`} className={styles.card__link}>
        <div className={styles.card__overlay}>
          <div className={styles.card__play}>
            <SVGIcon type="play" />
            Play
          </div>
        </div>
        <Image
          className={styles.card__img}
          alt={`${media.title} cover`}
          src={media.thumbnails[0].large!}
          layout="fill"
        />
      </Link>
      <div className={styles.card__foot}>
        <ul className={styles.card__details}>
          <li>{media.year}</li>
          <span className={styles.card__dot}></span>
          <li>
            <SVGIcon
              className={styles.card__svg}
              type={media.category === "Movie" ? "movie" : "tv"}
              width={12}
              height={12}
            />
            {media.category}
          </li>
          <span className={styles.card__dot}></span>
          <li>{media.rating}</li>
        </ul>
        <h3 className={styles.card__title}>{media.title}</h3>
      </div>
    </div>
  );
}
