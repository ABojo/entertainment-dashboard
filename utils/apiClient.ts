interface MediaQuery {
  category?: "tv" | "movie";
  title?: string;
  bookmarked?: "true";
}

const apiClient = {
  login: async function (username: string, password: string) {
    const response = await fetch("/api/login", { method: "POST", body: JSON.stringify({ username, password }) });
    const json = await response.json();

    return json;
  },
  register: async function (username: string, password: string) {
    const response = await fetch("/api/register", { method: "POST", body: JSON.stringify({ username, password }) });
    const json = await response.json();

    return json;
  },
  getMedia: async function (query?: MediaQuery) {
    let apiRoute = "/api/media";

    if (query) apiRoute += `?${new URLSearchParams({ ...query }).toString()}`;

    const response = await fetch(apiRoute);
    const json = await response.json();

    return json.data;
  },
  addBookmark: async function (mediaId: string) {
    const response = await fetch(`/api/bookmark`, { method: "POST", body: JSON.stringify({ mediaId }) });
    const json = await response.json();

    return json.data;
  },
  deleteBookmark: async function (bookmarkId: string) {
    const response = await fetch(`/api/bookmark`, { method: "DELETE", body: JSON.stringify({ bookmarkId }) });
    const json = await response.json();

    return json.data;
  },
};

export default apiClient;
