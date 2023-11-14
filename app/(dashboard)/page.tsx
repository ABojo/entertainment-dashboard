"use client";

import { useState, useEffect } from "react";
import SliderGrid from "../../components/SliderGrid/SliderGrid";
import MediaGrid from "../../components/MediaGrid/MediaGrid";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import useDebounce from "../../hooks/useDebounce";
import apiClient from "../../utils/apiClient";
import MediaResponse from "../../types/MediaResponse";

export default function Home() {
  const [firstLoad, setFirstLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [gridTitle, setGridTitle] = useState("");

  const [mediaList, setMediaList] = useState<MediaResponse[]>([]);
  const [trendingList, setTrendingList] = useState<MediaResponse[]>([]);

  function updateGridTitle(numberOfResults: number, searchString: string) {
    const resultString = numberOfResults === 1 ? "result" : "results";
    setGridTitle(
      searchString ? `Found ${numberOfResults} ${resultString} for '${searchString}'` : "Recommended for you"
    );
  }

  //arguments must be passed in on each call because of the useCallback caching
  async function getMedia(title: string, firstLoad: boolean) {
    //fetch new media
    const newMediaList: MediaResponse[] = await apiClient.getMedia({ title });

    //set the trending list on the first load
    if (firstLoad) setTrendingList(newMediaList.filter((media) => media.isTrending));

    //update the grid list and title
    setMediaList(newMediaList);
    updateGridTitle(newMediaList.length, title);
  }

  //create debounced version for the search input
  const { isLoading, debouncedFn: getMediaWithDebounce } = useDebounce(getMedia, 1000);

  async function onMount() {
    await getMedia(searchTerm, firstLoad);
    setFirstLoad(false);
  }

  useEffect(() => {
    onMount();
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
        placeholder={"Search for movies or TV shows"}
      />
      {firstLoad && <Loader absoluteCenter />}
      {!firstLoad && (
        <>
          <div style={{ marginBottom: "2.5rem" }}>
            <SliderGrid title="Trending" mediaData={trendingList} />
          </div>
          <MediaGrid title={gridTitle} mediaData={mediaList} />
        </>
      )}
    </>
  );
}
