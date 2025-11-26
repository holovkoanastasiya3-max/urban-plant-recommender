# Urban Plant Recommender Frontend

This is the integrated Figma frontend for the Urban Plant Recommender system.

## What's Been Integrated

✅ **Complete Figma Design** - All components from your Figma export
✅ **Backend API Integration** - Connected to FastAPI backend
✅ **Type Safety** - TypeScript types aligned between frontend and backend
✅ **Tailwind CSS** - Styling from Figma design
✅ **UI Components** - Full shadcn/ui component library

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── figma/          # Figma-specific components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LandingPage.tsx
│   │   ├── InputScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   ├── PlantCard.tsx
│   │   └── PlantDetailsScreen.tsx
│   ├── styles/
│   │   ├── globals.css      # Tailwind + design tokens
│   │   └── slider.css       # Custom slider styles
│   ├── api.ts               # Backend API integration
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Main app with routing
│   └── main.tsx             # Entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Getting Started

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Make sure the backend is running:**
   ```bash
   # In the project root
   python main.py
   # or
   uvicorn main:app --reload
   ```

The frontend will be available at `http://localhost:5173`

## How It Works

1. **Landing Page** - Welcome screen with project information
2. **Input Screen** - Form to collect plant selection criteria:
   - Soil type
   - Minimum temperature
   - Drought resistance (slider)
   - Sunlight requirements
   - Biodiversity support (slider)
   - Growth speed
   - Ecological recovery speed

3. **Results Screen** - Displays plant recommendations from the backend API
4. **Plant Details Screen** - Shows detailed information about a selected plant

## API Integration

The frontend communicates with the backend at `http://127.0.0.1:8000`:

- **POST /recommend** - Get plant recommendations
  - Request: Form data with soil_code, min_temp_c, drought, light, biodiversity, growth, recovery
  - Response: Array of plant recommendations with scores and explanations

## Type Conversion

The frontend converts backend `PlantRecommendation` types to frontend `Plant` types for display:

- `scientific_name` → `scientificName`
- `common_name_ua` → `commonName`
- `cold_tolerance_c` → `coldTolerance` (formatted as "°C")
- `drought_tolerance` → `droughtTolerance` (formatted as "/5")
- `recovery_speed` → `recoverySpeed` (formatted as "/5")
- `light_requirement` → `sunlightReq`

## Features

- ✅ Responsive design (mobile and desktop)
- ✅ Loading states
- ✅ Error handling
- ✅ Type-safe API calls
- ✅ Beautiful UI from Figma design
- ✅ Smooth navigation between screens

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Development

- **Linting:** `npm run lint`
- **Preview build:** `npm run preview`

## Notes

- The backend must be running on `http://127.0.0.1:8000`
- CORS is configured in the backend to allow requests from the frontend
- All form values are already in the format expected by the backend (no conversion needed)

