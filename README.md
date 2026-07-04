# Moodify 🎵

**Moodify** is a Bollywood emotion-based music web app. Upload or capture a face image, and Moodify detects your emotion using facial recognition, then curates a Bollywood playlist to match your mood.

🔗 **Live app:** [emotion-music-tau.vercel.app](https://emotion-music-tau.vercel.app/)

## How it works

1. Capture or upload a face image
2. [DeepFace](https://github.com/serengil/deepface) analyzes the image and detects your dominant emotion (Happy, Sad, Angry, Fearful, Surprised, Disgusted, or Neutral)
3. The backend maps that emotion to a curated Bollywood playlist and looks up currently-live YouTube videos via the YouTube Data API
4. You get a personalized playlist matching your mood

## Tech stack

**Frontend**
- React + JavaScript
- Deployed on Vercel

**Backend**
- FastAPI (Python)
- DeepFace for facial emotion detection
- OpenCV for image processing
- YouTube Data API v3 for dynamic song lookups
- pydantic-settings for configuration

## Project structure