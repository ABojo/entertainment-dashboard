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
};

export default apiClient;
