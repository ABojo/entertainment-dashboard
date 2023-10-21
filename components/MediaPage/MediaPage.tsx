"use client";

import { useState, useEffect } from "react";
import MediaGrid from "../../components/MediaGrid/MediaGrid";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import useDebounce from "../../hooks/useDebounce";

interface MediaPageProps {
  searchPlaceholder: string;
  pageTitle: string;
  fetchMedia: (title: string) => Promise<any>;
}

//grid title, query config object, placeholder text
export default function MediaPage({ pageTitle, searchPlaceholder, fetchMedia }: MediaPageProps) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [mediaList, setMediaList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [gridTitle, setGridTitle] = useState("");

  function updateGridTitle(numberOfResults: number, searchString: string) {
    if (searchString) {
      setGridTitle(`Found ${numberOfResults} results for '${searchString}'`);
    } else {
      setGridTitle(pageTitle);
    }
  }

  //fetch media, update grid, and update title
  async function getMedia(title: string) {
    const newMediaList = await fetchMedia(title);
    setMediaList(newMediaList);
    updateGridTitle(newMediaList.length, title);
  }

  const { isLoading, debouncedFn: getMediaWithDebounce } = useDebounce(getMedia, 1000);

  async function onMount() {
    await getMedia(searchTerm);
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
        placeholder={searchPlaceholder}
      />
      {firstLoad && <Loader />}
      <MediaGrid title={gridTitle} mediaData={mediaList} />
    </>
  );
}
