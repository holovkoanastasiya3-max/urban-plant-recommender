from typing import Literal
from fastapi import FastAPI
from pydantic import BaseModel

from src.recommender.engine import recommend_plants

app = FastAPI(title="Urban Plant Recommender API")


class RecommendRequest(BaseModel):
    soil_code: Literal[
        "chernozem",
        "grey_forest",
        "podzolic",
        "meadow",
        "solonets",
        "sandy",
        "disturbed",
    ]
    min_temp_c: float
    drought: int
    light: Literal["full_sun", "partial_shade", "shade"]
    biodiversity: int
    growth: int
    recovery: int
    limit: int = 10


@app.post("/recommend")
def recommend(req: RecommendRequest):
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
    return {"results": results}
