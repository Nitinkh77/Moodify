import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import numpy as np

from app.api.routes import router
from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router
from app.core.config import get_settings

logger = logging.getLogger(__name__)

settings = get_settings()

app = FastAPI(
    title="Emotion-Based Music Generator",
    description="Upload a face image, detect your emotion, get a Spotify playlist.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(auth_router)
app.include_router(dashboard_router)


@app.on_event("startup")
async def startup_event():
    print("🎵 Emotion Music API is running!")
    logger.info("Preloading DeepFace emotion model...")
    dummy_img = np.zeros((100, 100, 3), dtype=np.uint8)
    try:
        DeepFace.analyze(
            img_path=dummy_img,
            actions=["emotion"],
            enforce_detection=False,
            detector_backend="opencv",
        )
        logger.info("DeepFace emotion model preloaded successfully.")
    except Exception as e:
        logger.error(f"Model preload failed: {e}")