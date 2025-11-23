from pydantic import BaseModel

class RecommendRequest(BaseModel):
    soil_code: str
    min_temp_c: float
    drought: int
    light: str
    biodiversity: int
    growth: int
    recovery: int
