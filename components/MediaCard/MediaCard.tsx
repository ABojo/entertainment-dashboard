import styles from "./MediaCard.module.scss";
import MediaResponse from "../../types/MediaResponse";
import Image from "next/image";
import SVGIcon from "../SVGIcon/SVGIcon";
import Link from "next/link";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
import LazyImage from "../LazyImage/LazyImage";

interface MediaCardProps {
  media: MediaResponse;
}

export default function MediaCard({ media }: MediaCardProps) {
  return (
    <div className={styles.card}>
      <BookmarkButton className={styles.card__bookmark} bookmarkId={media.bookmarkId} mediaId={media.id} />
      <Link href={`/media/${media.id}`} className={styles.card__link}>
        <span className="sr-only">Open {media.title}</span>
        <div className={styles.card__overlay}>
          <div className={styles.card__play}>
            <SVGIcon type="play" />
            Play
          </div>
        </div>
        <div className={styles.card__loader}></div>
        <LazyImage
          src={media.thumbnails[0].large!}
          alt={`${media.title} cover`}
          sizes="(max-width: 500px) 50vw, (max-width: 700px) 40vw, (max-width: 900px) 30vw, 15vw"
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
