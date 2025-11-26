# Figma Integration Guide

This guide will help you integrate your Figma design into this React + TypeScript project.

## What You Have

- ✅ React + TypeScript + Vite setup
- ✅ API integration code (`src/api.ts`)
- ✅ Type definitions (`src/types.ts`)
- ✅ Basic app structure (`src/App.tsx`)

## Integration Steps

### Option 1: If Figma exported HTML/CSS/JS

1. **Copy assets to `public/` folder:**
   ```bash
   # Copy images, fonts, etc. from your Figma export
   cp -r /path/to/figma-export/* public/
   ```

2. **Extract CSS:**
   - Copy CSS from Figma export
   - Add to `src/index.css` or create component-specific CSS files
   - Update class names to match React conventions (camelCase or kebab-case)

3. **Convert HTML to React components:**
   - Replace HTML elements with React components
   - Convert class attributes to className
   - Extract interactive elements into separate components
   - Connect form inputs to React state

4. **Example conversion:**
   ```html
   <!-- HTML from Figma -->
   <button class="submit-btn">Submit</button>
   ```
   
   ```tsx
   // React component
   <button className="submit-btn" onClick={handleSubmit}>
     Submit
   </button>
   ```

### Option 2: If Figma exported React components

1. **Copy components directly:**
   ```bash
   # If you have React components from Figma
   cp -r /path/to/figma-components/src/components/* src/components/
   ```

2. **Update imports:**
   - Check import paths
   - Ensure all dependencies are in `package.json`
   - Update any hardcoded paths

3. **Integrate with API:**
   - Connect form components to `handleSubmit` in `App.tsx`
   - Pass `FormData` type to form components
   - Display results using `PlantRecommendation` type

### Option 3: If you have design tokens/assets only

1. **Extract design tokens:**
   - Colors → Add to CSS variables in `src/index.css`
   - Typography → Add font families and sizes
   - Spacing → Use consistent spacing scale

2. **Add assets:**
   - Images → `public/images/`
   - Fonts → `public/fonts/` or use `@font-face` in CSS
   - Icons → Convert to React components or use SVG files

3. **Build components manually:**
   - Recreate components based on Figma design
   - Use the design tokens you extracted
   - Follow the existing component structure

## Recommended Structure

```
frontend/
├── src/
│   ├── components/          # Your Figma components go here
│   │   ├── Form/           # Form components
│   │   ├── Results/        # Results display components
│   │   └── Layout/         # Header, Footer, etc.
│   ├── assets/             # Images, icons (imported in code)
│   ├── styles/             # Global styles, design tokens
│   ├── api.ts              # ✅ Already set up
│   ├── types.ts            # ✅ Already set up
│   └── App.tsx             # Main app (update this)
├── public/                 # Static assets (images, fonts)
└── package.json            # ✅ Already set up
```

## Connecting to the API

The API integration is already set up. Here's how to use it:

1. **In your form component:**
   ```tsx
   import { getRecommendations } from '../api'
   import type { FormData } from '../types'
   
   const handleSubmit = async (formData: FormData) => {
     const results = await getRecommendations(formData)
     // Handle results
   }
   ```

2. **Form data structure:**
   ```tsx
   const formData: FormData = {
     soil_code: 'chernozem',
     min_temp_c: -30,
     drought: 3,
     light: 'full_sun',
     biodiversity: 3,
     growth: 3,
     recovery: 3,
     limit: 10  // optional
   }
   ```

## Next Steps

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Copy your Figma assets** to the appropriate folders

4. **Update `src/App.tsx`** to use your Figma components

5. **Test the integration** with the backend running on `http://127.0.0.1:8000`

## Tips

- Use CSS Modules or styled-components if Figma exported complex styles
- Extract reusable components (buttons, inputs, cards)
- Keep the API integration separate from UI components
- Use TypeScript types for all props and state
- Test responsive design (Figma designs are usually desktop-first)

## Need Help?

- Check `frontend_old/` for reference implementation
- API endpoint: `POST http://127.0.0.1:8000/recommend`
- Type definitions are in `src/types.ts`

