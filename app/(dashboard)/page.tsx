"use client";

import MediaPage from "../../components/MediaPage/MediaPage";
import apiClient from "../../utils/apiClient";

export default function Home() {
  return (
    <MediaPage
      fetchMedia={(title) => apiClient.getMedia({ title })}
      pageTitle="Recommended for you"
      searchPlaceholder="Search for movies or TV shows"
    />
  );
}
