POST /api/recommendations

Request (JSON)
{
  "location_type": "balcony",
  "light_level": "medium",
  "maintenance_level": "low",
  "experience_level": "beginner",
  "goals": ["air_purifying", "cozy"],
  "constraints": {
    "pet_friendly": true,
    "child_friendly": true,
    "max_height_cm": 120,
    "min_temp_c": -10
  },
  "context": {
    "city": "Warsaw",
    "climate_zone": "Cfb"
  },
  "limit": 10,
  "language": "uk"
}

Response 200 (OK)
{
  "recommendations": [
    {
      "plant_id": "ficus_elastica",
      "name": "Фікус еластика",
      "latin_name": "Ficus elastica",
      "score": 0.87,
      "match_summary": "Добре переносить середнє освітлення та рідкий полив.",
      "match_reasons": [
        "Підходить для середнього освітлення",
        "Потребує відносно рідкого поливу"
      ],
      "care_summary": {
        "light": "Яскраве розсіяне світло або півтінь",
        "watering": "1 раз на 7–10 днів",
        "temperature": "18–24°C"
      },
      "image_url": "https://cdn.yourapp.com/plants/ficus_elastica.jpg",
      "tags": ["low_maintenance", "air_purifying", "indoor"]
    }
  ],
  "debug": {
    "total_candidates": 153,
    "filtered_by_constraints": 24,
    "scoring_strategy": "weighted_mcda_v1"
  }
}

Response 200 (Empty Results)
{
  "recommendations": [],
  "debug": {
    "total_candidates": 153,
    "filtered_by_constraints": 0,
    "scoring_strategy": "weighted_mcda_v1"
  }
}

Response 400 (Validation Error)
{
  "error": "ValidationError",
  "message": "Field 'light_level' is required",
  "details": {
    "light_level": "This field is required"
  }
}

Response 500 (Server Error)
{
  "error": "InternalServerError",
  "message": "Unexpected error while generating recommendations"
}

GET /api/plants/{plant_id}

Response 200 (OK)
{
  "plant_id": "ficus_elastica",
  "name": "Фікус еластика",
  "latin_name": "Ficus elastica",
  "description": "Вічнозелена кімнатна рослина з великим глянцевим листям...",
  "light": "Яскраве розсіяне світло або півтінь",
  "watering": "Поливати після підсихання верхнього шару ґрунту",
  "humidity": "Середня",
  "temperature": "18–24°C",
  "toxicity": {
    "pets": "mild",
    "humans": "mild"
  },
  "image_url": "https://cdn.yourapp.com/plants/ficus_elastica.jpg",
  "tags": ["indoor", "decorative", "low_maintenance"]
}

Response 404 (Not Found)
{
  "error": "NotFound",
  "message": "Plant with id 'xxx' not found"
}

Response 500 (Server Error)
{
  "error": "InternalServerError",
  "message": "Unexpected error while fetching plant details"
}
