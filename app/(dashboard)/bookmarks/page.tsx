"use client";

import { useState, useEffect } from "react";
import MediaGrid from "../../../components/MediaGrid/MediaGrid";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Loader from "../../../components/Loader/Loader";
import useDebounce from "../../../hooks/useDebounce";
import apiClient from "../../../utils/apiClient";
import MediaResponse from "../../../types/MediaResponse";

interface GridState {
  title: string;
  mediaList: MediaResponse[];
}

export default function Bookmarks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const [movieGrid, setMovieGrid] = useState<GridState>({ title: "Bookmarked Movies", mediaList: [] });
  const [tvGrid, setTvGrid] = useState<GridState>({ title: "Bookmarked TV Shows", mediaList: [] });

  async function getMedia(title: string) {
    const fetchedMedia: MediaResponse[] = await apiClient.getMedia({ title, bookmarked: "true" });

    const movieMedia = fetchedMedia.filter((media) => media.category === "Movie");
    const tvMedia = fetchedMedia.filter((media) => media.category === "TV Series");

    setMovieGrid({
      mediaList: movieMedia,
      title: title ? `Found ${movieMedia.length} Bookmarked Movies for '${title}'` : "Bookmarked Movies",
    });

    setTvGrid({
      mediaList: tvMedia,
      title: title ? `Found ${tvMedia.length} Bookmarked TV Shows for '${title}'` : "Bookmarked TV Shows",
    });
  }

  const { isLoading, debouncedFn: getMediaWithDebounce } = useDebounce(getMedia, 1000);

  useEffect(() => {
    (async function () {
      await getMedia(searchTerm);
      setFirstLoad(false);
    })();
  }, []);

  //fetch filtered media when the search term changes
  useEffect(() => {
    if (!firstLoad) getMediaWithDebounce(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <SearchBar
        isLoading={isLoading}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder={"Search your bookmarks"}
      />
      {firstLoad && <Loader />}
      {!firstLoad && (
        <>
          <MediaGrid title={movieGrid.title} mediaData={movieGrid.mediaList} />
          <div style={{ marginTop: "5rem" }}>
            <MediaGrid title={tvGrid.title} mediaData={tvGrid.mediaList} />
          </div>
        </>
      )}
    </>
  );
}
