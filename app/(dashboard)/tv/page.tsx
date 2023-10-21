"use client";

import MediaPage from "../../../components/MediaPage/MediaPage";
import apiClient from "../../../utils/apiClient";

export default function TV() {
  return (
    <MediaPage
      fetchMedia={(title) => apiClient.getMedia({ title, category: "tv" })}
      pageTitle="TV Series"
      searchPlaceholder="Search for TV shows"
    />
  );
}
