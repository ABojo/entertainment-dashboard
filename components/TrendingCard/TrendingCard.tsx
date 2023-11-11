import { useState } from "react";
import styles from "./TrendingCard.module.scss";
import MediaResponse from "../../types/MediaResponse";
import Image from "next/image";
import SVGIcon from "../SVGIcon/SVGIcon";
import Link from "next/link";
import Loader from "../Loader/Loader";
import apiClient from "../../utils/apiClient";

interface TrendingCardProps {
  media: MediaResponse;
}

export default function TrendingCard({ media }: TrendingCardProps) {
  const [bookmarkId, setBookmarkId] = useState(media.bookmarkId || null);
  const [isLoading, setIsLoading] = useState(false);

  async function bookmarkHandler() {
    setIsLoading(true);

    if (bookmarkId) {
      await apiClient.deleteBookmark(bookmarkId);
      setBookmarkId(null);
    } else {
      const response = await apiClient.addBookmark(media.id);
      setBookmarkId(response.id);
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.card}>
      <button className={styles.card__bookmark} onClick={bookmarkHandler} disabled={isLoading}>
        {isLoading ? (
          <Loader size="1rem" />
        ) : bookmarkId ? (
          <SVGIcon type="bookmark-full" />
        ) : (
          <SVGIcon type="bookmark-empty" />
        )}
      </button>

      <Link href={`/media/${media.id}`} className={styles.card__link}>
        <div className={styles.card__overlay}>
          <div className={styles.card__play}>
            <SVGIcon type="play" />
            Play
          </div>
        </div>
        <div className={styles.card__loader}></div>
        <Image
          className={styles.card__img}
          alt={`${media.title} cover`}
          src={media.thumbnails[1].large!}
          fill
          onLoadingComplete={(image) => {
            image.classList.add(styles["card__img--loaded"]);
          }}
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
