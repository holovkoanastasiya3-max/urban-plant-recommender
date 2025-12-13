from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

# Завантаження змінних оточення з .env файлу
try:
    from dotenv import load_dotenv
    # Завантажуємо .env файл з кореня проекту
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
    load_dotenv(env_path)
except ImportError:
    pass

from src.models.request_models import RecommendRequest
from src.recommender.engine import recommend_plants

app = FastAPI(
    title="Urban Plant Recommender API",
    version="0.1.0",
    description="API для підбору рослин для міського озеленення",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Urban Plant Recommender API",
        "version": "0.1.0",
        "endpoints": {
            "health": "/health",
            "recommend": "/recommend",
            "docs": "/docs"
        }
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/recommend")
def recommend(req: RecommendRequest):
    try:
        results = recommend_plants(
            soil_code=req.soil_code,
            min_temp_c=req.min_temp_c,
            drought=req.drought,
            light=req.light,
            biodiversity=req.biodiversity,
            growth=req.growth,
            recovery=req.recovery,
            limit=req.limit,
        )
    except Exception as e:
    
        raise HTTPException(status_code=500, detail=str(e))

    return {"results": results}
