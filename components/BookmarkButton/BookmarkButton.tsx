import { useState, useRef } from "react";
import apiClient from "../../utils/apiClient";
import styles from "./BookmarkButton.module.scss";
import Loader from "../Loader/Loader";
import SVGIcon from "../SVGIcon/SVGIcon";

interface BookmarkButtonProps {
  className?: string;
  bookmarkId?: string;
  mediaId: string;
}

export default function BookmarkButton({ className, bookmarkId, mediaId }: BookmarkButtonProps) {
  const [bookmark, setBookmark] = useState<string | null>(bookmarkId || null);
  const [isLoading, setIsLoading] = useState(false);

  async function bookmarkHandler() {
    setIsLoading(true);

    if (bookmark) {
      await apiClient.deleteBookmark(bookmark);
      setBookmark(null);
    } else {
      const response = await apiClient.addBookmark(mediaId);
      setBookmark(response.id);
    }

    setIsLoading(false);
  }

  return (
    <button
      role="switch"
      aria-checked={!!bookmark}
      aria-label={bookmark ? "Remove Bookmark" : "Add Bookmark"}
      className={`${className} ${styles.bookmark}`}
      onClick={bookmarkHandler}
      disabled={isLoading}
    >
      {isLoading ? <Loader size="1rem" /> : <SVGIcon type={`${bookmark ? "bookmark-full" : "bookmark-empty"}`} />}
    </button>
  );
}
