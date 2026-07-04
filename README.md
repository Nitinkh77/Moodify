\# Moodify 🎵



\*\*Moodify\*\* is a Bollywood emotion-based music web app. Upload or capture a face image, and Moodify detects your emotion using facial recognition, then curates a Bollywood playlist to match your mood.



🔗 \*\*Live app:\*\* \[emotion-music-tau.vercel.app](https://emotion-music-tau.vercel.app/)



\## How it works



1\. Capture or upload a face image

2\. \[DeepFace](https://github.com/serengil/deepface) analyzes the image and detects your dominant emotion (Happy, Sad, Angry, Fearful, Surprised, Disgusted, or Neutral)

3\. The backend maps that emotion to a curated Bollywood playlist and looks up currently-live YouTube videos via the YouTube Data API

4\. You get a personalized playlist matching your mood



\## Tech stack



\*\*Frontend\*\*

\- React + JavaScript

\- Deployed on Vercel



\*\*Backend\*\*

\- FastAPI (Python)

\- DeepFace for facial emotion detection

\- OpenCV for image processing

\- YouTube Data API v3 for dynamic song lookups

\- pydantic-settings for configuration



\## Project structure



```

moodify/

├── frontend/          # React app

├── backend/           # FastAPI app

│   └── app/

│       ├── api/       # Routes (auth, dashboard, main routes)

│       ├── core/      # Config, database, security

│       ├── models/    # Pydantic schemas

│       └── services/  # Emotion detection \& music lookup logic

└── README.md

```



\## Running locally



\### Backend



```bash

cd backend

pip install -r requirements.txt

```



Create a `.env` file in the backend root:



```

YOUTUBE\_API\_KEY=your\_youtube\_api\_key

CORS\_ORIGINS=http://localhost:5173

```



Then run:



```bash

uvicorn app.main:app --reload

```



\### Frontend



```bash

cd frontend

npm install

npm run dev

```



\## Emotion → Mood mapping



| Emotion | Playlist |

|---|---|

| Happy | Good Vibes Only ☀️ |

| Sad | Dil Ka Dard 🌧️ |

| Angry | Aag Laga Do 🔥 |

| Fearful | Sukoon 🌿 |

| Surprised | Surprise Twist! ⚡ |

| Disgusted | Chill Karo 🎧 |

| Neutral | Apna Zone 🎵 |



\## License



Personal project — not currently licensed for reuse.

