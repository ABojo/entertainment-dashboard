import styles from "./TrendingCard.module.scss";
import MediaResponse from "../../types/MediaResponse";
import LazyImage from "../LazyImage/LazyImage";
import SVGIcon from "../SVGIcon/SVGIcon";
import Link from "next/link";
import BookmarkButton from "../BookmarkButton/BookmarkButton";

interface TrendingCardProps {
  media: MediaResponse;
}

export default function TrendingCard({ media }: TrendingCardProps) {
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
          alt={`${media.title} cover`}
          src={media.thumbnails[1].large!}
          sizes="(max-width: 700px) 70vw, (max-width: 900px) 50vw, 30vw"
        />
        <div className={styles.card__info}>
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
      </Link>
    </div>
  );
}
