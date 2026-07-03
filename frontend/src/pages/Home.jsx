import { useState } from "react";
import { CameraCapture } from "../components/CameraCapture";
import { EmotionDisplay } from "../components/EmotionDisplay";
import { TrackList } from "../components/TrackList";
import { useAnalyze } from "../hooks/useAnalyze";
import { useAuth } from "../context/AuthContext";
import { addFavorite } from "../services/api";
import "../App.css";

export default function Home() {
  const { result, loading, error, analyze, reset } = useAnalyze();
  const [capturedFile, setCapturedFile] = useState(null);
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState([]);
  const [saveMsg, setSaveMsg] = useState("");

  const handleCapture = (file) => setCapturedFile(file);

  const handleAnalyze = () => {
    if (capturedFile) analyze(capturedFile);
  };

  const handleReset = () => {
    reset();
    setCapturedFile(null);
    setSavedIds([]);
    setSaveMsg("");
  };

  const handleSave = async (track) => {
    try {
      await addFavorite(track);
      setSavedIds((prev) => [...prev, track.id]);
      setSaveMsg(`Saved "${track.name}" to favorites!`);
    } catch {
      setSaveMsg("Could not save favorite. Try again.");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">🎵</div>
        <h1 className="app-title">Moodify</h1>
        <p className="app-subtitle">Your face sets the mood. We find the music.</p>
      </header>

      <main className="app-main">
        {!result ? (
          <section className="capture-section-wrapper">
            <span className="float-emoji size-lg pos-1">😄</span>
<span className="float-emoji size-sm pos-2">😢</span>
<span className="float-emoji size-md pos-3">😍</span>
<span className="float-emoji size-sm pos-4">😐</span>
<span className="float-emoji size-md pos-5">😲</span>
<span className="float-emoji size-lg pos-6">🥳</span>
<span className="float-emoji size-sm pos-7">😴</span>
<span className="float-emoji size-md pos-8">😡</span>

            <div className="capture-section">
              <CameraCapture onCapture={handleCapture} />

              {error && (
                <div className="error-banner" role="alert">
                  ⚠️ {error}
                </div>
              )}

              <button
                className="btn btn-primary btn-lg"
                onClick={handleAnalyze}
                disabled={!capturedFile || loading}
              >
                {loading ? (
                  <span className="loading-text">
                    <span className="spinner" /> Detecting emotion...
                  </span>
                ) : (
                  "Detect My Mood 🎧"
                )}
              </button>
            </div>
          </section>
        ) : (
          <section className="results-section">
            <p className="result-message">{result.message}</p>
            <EmotionDisplay emotion={result.emotion} />
            <TrackList tracks={result.tracks} playlistName={result.playlist_name} />

            {user ? (
              <div className="favorites-box">
                <h3>Save a track to your favorites</h3>
                <div className="favorites-list">
                  {result.tracks.map((track) => (
                    <div className="favorite-row" key={track.id}>
                      <span>{track.name} — {track.artist}</span>
                      <button
                        className="btn btn-small"
                        disabled={savedIds.includes(track.id)}
                        onClick={() => handleSave(track)}
                      >
                        {savedIds.includes(track.id) ? "Saved ✓" : "Save"}
                      </button>
                    </div>
                  ))}
                </div>
                {saveMsg && <p className="save-msg">{saveMsg}</p>}
              </div>
            ) : (
              <p className="login-hint">
                <a href="/login">Log in</a> to save your favorite tracks.
              </p>
            )}

            <button className="btn btn-secondary" onClick={handleReset}>
              Try Again
            </button>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>Moodify — Powered by DeepFace & YouTube Music</p>
      </footer>
    </div>
  );
}