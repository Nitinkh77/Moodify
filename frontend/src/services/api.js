import axios from "axios";

const API_BASE_URL = "https://nitin1203-emotion-music-backend.hf.space/api";

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export async function analyzeEmotion(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);
  const { data } = await api.post("/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function registerUser(email, password, name) {
  const { data } = await api.post("/auth/register", { email, password, name });
  return data;
}

export async function loginUser(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

export async function getCurrentUser() {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function getStats() {
  const { data } = await api.get("/dashboard/stats");
  return data;
}

export async function getHistory() {
  const { data } = await api.get("/dashboard/history");
  return data;
}

export async function getFavorites() {
  const { data } = await api.get("/dashboard/favorites");
  return data;
}

export async function addFavorite(track) {
  const payload = {
    title: track.name,
    artist: track.artist,
    youtube_id: track.id,
  };
  const { data } = await api.post("/dashboard/favorites", payload);
  return data;
}

export default api;