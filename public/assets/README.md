# Assets Folder

This folder contains media assets for the Travel Arca application.

## Video Assets (Placeholders)

### Hero Video
- **hero-video.webm** - Primary format (2-6s loop, muted)
- **hero-video.mp4** - Fallback format
- **Specifications**: 1920x1080, optimized for web, <5MB

### Lottie Animations (Placeholders)

#### Hero Animation
- **hero-animation.json** - Subtle loop animation (<200KB)
- **Features**: Travel-themed, minimal, brand-aligned

#### Feature Icons
- **ai-planning.json** - AI brain/sparkles animation
- **collaboration.json** - People connecting animation  
- **maps.json** - Interactive map animation
- **scheduling.json** - Calendar/clock animation
- **export.json** - Download/share animation

#### Mascot Elements
- **travel-mascot-1.json** - Friendly character with luggage
- **travel-mascot-2.json** - Character with map/compass
- **travel-mascot-3.json** - Character with airplane

### Usage Instructions

#### Replacing Video Assets
1. Replace `hero-video.webm` and `hero-video.mp4` with your content
2. Ensure videos are:
   - 2-6 seconds long
   - Muted (no audio track)
   - Optimized for web (H.264/VP9)
   - Include poster frame

#### Replacing Lottie Assets
1. Export animations from After Effects using Bodymovin
2. Optimize JSON files (remove unused properties)
3. Test animations for performance
4. Ensure file sizes stay under 200KB each

#### Implementation Example

```jsx
// Video Background
<video autoPlay muted loop playsInline poster="/assets/hero-poster.jpg">
  <source src="/assets/hero-video.webm" type="video/webm" />
  <source src="/assets/hero-video.mp4" type="video/mp4" />
</video>

// Lottie Animation
import Lottie from 'lottie-react';
import heroAnimation from '/assets/hero-animation.json';

<Lottie animationData={heroAnimation} loop={true} />
```

## Image Assets

### Destination Images
All destination images are loaded from Pexels CDN for optimal performance and licensing compliance.

### Icons
Using Lucide React for consistent, lightweight SVG icons.

## Performance Notes

- All video assets should be compressed and optimized
- Lottie files should be under 200KB each
- Use appropriate video formats (WebM preferred, MP4 fallback)
- Include poster images for better loading experience
- Consider lazy loading for non-critical animations

## Licensing

- Ensure all custom assets have proper licensing
- Pexels images are used under their free license
- Lottie animations should be original or properly licensed
- Video content must be royalty-free or owned