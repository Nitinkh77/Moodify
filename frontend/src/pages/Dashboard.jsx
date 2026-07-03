import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getStats, getHistory, getFavorites } from "../services/api";
import "./Dashboard.css";

const EMOTION_ICONS = {
  Happy: "😄",
  Sad: "😢",
  Angry: "😠",
  Fearful: "😨",
  Surprised: "😲",
  Disgusted: "🤢",
  Neutral: "😐",
};

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, historyData, favData] = await Promise.all([
          getStats(),
          getHistory(),
          getFavorites(),
        ]);
        setStats(statsData);
        setHistory(Array.isArray(historyData) ? historyData : []);
        setFavorites(Array.isArray(favData) ? favData : []);
      } catch (err) {
        console.error("Dashboard load error", err);
      } finally {
        setLoading(false);
      }
    }
    if (user) loadData();
  }, [user]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" />;

  const cleanFavorites = favorites.filter((track) => track.title);

  return (
    <div className="dashboard-page">
  <span className="dash-float-emoji d1">🎧</span>
  <span className="dash-float-emoji d2">😄</span>
  <span className="dash-float-emoji d3">🎵</span>
  <span className="dash-float-emoji d4">😢</span>
  <span className="dash-float-emoji d5">✨</span>
  <span className="dash-float-emoji d6">😲</span>
  <span className="dash-float-emoji d7">🥰</span>

  <div className="dashboard">
        <div className="dashboard-welcome">
          <h1>Welcome back, {user.name.split(" ")[0]} 👋</h1>
          <p className="dashboard-subtitle">Here's a look at your mood journey</p>
        </div>

        {loading ? (
          <div className="dash-loading">
            <span className="spinner" /> Loading your data...
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card stat-purple">
                <div className="stat-icon">🎭</div>
                <h3>{stats?.total_analyses ?? 0}</h3>
                <p>Moods Detected</p>
              </div>
              <div className="stat-card stat-blue">
                <div className="stat-icon">🎧</div>
                <h3>{stats?.total_songs_recommended ?? 0}</h3>
                <p>Songs Recommended</p>
              </div>
              <div className="stat-card stat-pink">
                <div className="stat-icon">
                  {EMOTION_ICONS[stats?.most_common_emotion] || "✨"}
                </div>
                <h3>{stats?.most_common_emotion ?? "—"}</h3>
                <p>Most Common Mood</p>
              </div>
            </div>

            <section className="dashboard-section">
              <h2><span className="section-dot" />Recent History</h2>
              {history.length === 0 ? (
                <p className="empty-msg">No history yet — go detect your mood!</p>
              ) : (
                <ul className="history-list">
                  {history.map((entry, i) => {
                    const emotion = entry.dominant_emotion || entry.emotion || "Unknown";
                    return (
                      <li key={i} className="history-item">
                        <div className="history-left">
                          <span className="history-icon">
                            {EMOTION_ICONS[emotion] || "❔"}
                          </span>
                          <span className="history-emotion">{emotion}</span>
                        </div>
                        <span className="history-date">
                          {entry.created_at
                            ? new Date(entry.created_at).toLocaleString()
                            : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <section className="dashboard-section">
              <h2><span className="section-dot" />Favorite Tracks</h2>
              {cleanFavorites.length === 0 ? (
                <p className="empty-msg">No favorites saved yet.</p>
              ) : (
                <ul className="favorites-list-dash">
                  {cleanFavorites.map((track, i) => (
                    <li key={i} className="favorite-item">
                      <span className="favorite-icon">🎵</span>
                      <div className="favorite-info">
                        <span className="favorite-title">{track.title}</span>
                        <span className="favorite-artist">{track.artist}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}