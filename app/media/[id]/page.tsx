"use client";

import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import apiClient from "../../../utils/apiClient";
import MediaResponse from "../../../types/MediaResponse";
import Loader from "../../../components/Loader/Loader";
import SVGIcon from "../../../components/SVGIcon/SVGIcon";
import LazyImage from "../../../components/LazyImage/LazyImage";
import BookmarkButton from "../../../components/BookmarkButton/BookmarkButton";
import { useRouter } from "next/navigation";

interface MediaProps {
  params: { id: string };
}

export default function MediaListing({ params }: MediaProps) {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [mediaData, setMediaData] = useState<MediaResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const mediaData = await apiClient.getMediaById(params.id);
      setMediaData(mediaData);
    })();
  }, []);

  function goBack() {
    router.back();
  }

  return (
    <main className={styles.container}>
      {popupIsOpen && (
        <div className={styles.container__popup}>
          <h2>Error</h2>
          <p>All of the videos on this site are made up, so there is nothing to play.</p>
          <button
            onClick={() => {
              setPopupIsOpen(false);
            }}
          >
            Close
          </button>
        </div>
      )}
      <button className={styles.container__back} onClick={goBack}>
        &#8592; Back
      </button>
      {mediaData ? (
        <div>
          <div className={styles.container__img}>
            <LazyImage src={mediaData.thumbnails[0].large!} alt={`${mediaData.title} cover`} />
          </div>
          <div className={styles.container__head}>
            <h1 className={styles.container__title}>{mediaData.title}</h1>
            <BookmarkButton bookmarkId={mediaData.bookmarkId} mediaId={mediaData.id} />
          </div>
          <ul className={styles.details}>
            <li>Released in {mediaData.year}</li>
            <span className={styles.details__dot}></span>
            <li>
              <SVGIcon
                className={styles.details__svg}
                type={mediaData.category === "Movie" ? "movie" : "tv"}
                width={12}
                height={12}
              />
              {mediaData.category}
            </li>
            <span className={styles.details__dot}></span>
            <li>Rated {mediaData.rating}</li>
          </ul>
          <p className={styles.container__paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <button
            className={styles.container__play}
            onClick={() => {
              setPopupIsOpen(true);
            }}
          >
            <SVGIcon type="play" width={25} height={25} /> Play
          </button>
        </div>
      ) : (
        <Loader absoluteCenter />
      )}
    </main>
  );
}
