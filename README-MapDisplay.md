# MapDisplay Component

A comprehensive, production-ready React component for displaying interactive maps in travel web applications. Supports multiple map types including Leaflet (OpenStreetMap), Google Maps, and 3D Globe views.

## Features

- 🗺️ **Multiple Map Types**: Leaflet, Google Maps, and 3D Globe
- 📱 **Fully Responsive**: Mobile-friendly and accessible
- 🎯 **Interactive Markers**: Clickable with custom popups
- 🎨 **Customizable Styling**: TailwindCSS with rounded corners and shadows
- ⚡ **Lazy Loading**: Reduces initial bundle size
- 🔄 **Dynamic Switching**: Toggle between map types seamlessly
- 🌍 **3D Globe**: Auto-rotate with night-light Earth texture

## Installation

Install the required dependencies:

```bash
# Core dependencies (already included in most React projects)
npm install react react-dom

# Map libraries
npm install leaflet react-leaflet @types/leaflet

# For Google Maps (optional)
npm install @react-google-maps/api

# For 3D Globe (optional)
npm install react-globe.gl three

# For icons (if not already installed)
npm install lucide-react
```

## Basic Usage

```tsx
import { MapDisplay } from '@/components/maps/MapDisplay';

const samplePoints = [
  {
    lat: 40.7128,
    lng: -74.0060,
    label: 'New York City',
    title: 'The Big Apple',
    description: 'The city that never sleeps',
    iconUrl: 'https://example.com/nyc-icon.png'
  },
  {
    lat: 34.0522,
    lng: -118.2437,
    label: 'Los Angeles',
    title: 'City of Angels',
    description: 'Entertainment capital of the world'
  }
];

function MyTravelApp() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Travel Destinations</h1>
      
      <MapDisplay
        mapType="leaflet"
        center={{ lat: 37.0902, lng: -95.7129 }}
        zoom={4}
        points={samplePoints}
        height="500px"
        className="mb-8"
        onMarkerClick={(point) => console.log('Clicked:', point)}
      />
    </div>
  );
}
```

## Map Types

### 1. Leaflet (Default - No API Key Required)

```tsx
<MapDisplay
  mapType="leaflet"
  center={{ lat: 51.505, lng: -0.09 }}
  zoom={13}
  points={points}
/>
```

**Features:**
- OpenStreetMap tiles (free)
- Custom marker icons
- Popup windows with location details
- Full pan/zoom/touch support

### 2. Google Maps (Requires API Key)

```tsx
<MapDisplay
  mapType="google"
  center={{ lat: 37.7749, lng: -122.4194 }}
  zoom={12}
  points={points}
  googleApiKey="YOUR_GOOGLE_MAPS_API_KEY"
/>
```

**Features:**
- Satellite and street view
- Google's rich mapping data
- Info windows
- Street View integration

### 3. 3D Globe

```tsx
<MapDisplay
  mapType="globe"
  center={{ lat: 0, lng: 0 }}
  zoom={2}
  points={points}
  autoRotate={true}
/>
```

**Features:**
- Night-light Earth texture
- Auto-rotation animation
- 3D point markers with glow effects
- Interactive controls (drag, zoom)

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mapType` | `'leaflet' \| 'google' \| 'globe'` | `'leaflet'` | Type of map to display |
| `center` | `{ lat: number; lng: number }` | Required | Center coordinates |
| `zoom` | `number` | `10` | Initial zoom level |
| `points` | `MapPoint[]` | `[]` | Array of markers to display |
| `googleApiKey` | `string` | `undefined` | Google Maps API key (required for Google Maps) |
| `autoRotate` | `boolean` | `true` | Enable auto-rotation for 3D globe |
| `className` | `string` | `''` | Additional CSS classes |
| `height` | `string` | `'400px'` | Map container height |
| `onMarkerClick` | `(point: MapPoint) => void` | `undefined` | Callback when marker is clicked |

## MapPoint Interface

```tsx
interface MapPoint {
  lat: number;           // Latitude
  lng: number;           // Longitude
  label: string;         // Required label
  title?: string;        // Optional title for popup
  description?: string;  // Optional description
  iconUrl?: string;      // Optional custom icon URL
}
```

## Advanced Examples

### Travel Destinations with Custom Icons

```tsx
const destinations = [
  {
    lat: 48.8566,
    lng: 2.3522,
    label: 'Paris',
    title: 'Paris, France',
    description: 'The City of Light',
    iconUrl: '/icons/eiffel-tower.png'
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    label: 'Tokyo',
    title: 'Tokyo, Japan',
    description: 'Modern metropolis',
    iconUrl: '/icons/tokyo-tower.png'
  }
];

<MapDisplay
  mapType="leaflet"
  center={{ lat: 42.3601, lng: -71.0589 }}
  zoom={2}
  points={destinations}
  height="600px"
  onMarkerClick={(point) => {
    // Handle marker click - could open modal, navigate, etc.
    console.log(`Clicked on ${point.title}`);
  }}
/>
```

### Dynamic Map Type Switching

```tsx
function InteractiveMap() {
  const [mapType, setMapType] = useState('leaflet');
  
  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setMapType('leaflet')}>Street Map</button>
        <button onClick={() => setMapType('google')}>Satellite</button>
        <button onClick={() => setMapType('globe')}>3D Globe</button>
      </div>
      
      <MapDisplay
        mapType={mapType}
        center={{ lat: 0, lng: 0 }}
        zoom={2}
        points={worldDestinations}
        googleApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      />
    </div>
  );
}
```

### Responsive Travel Dashboard

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Main map */}
  <div className="lg:col-span-2">
    <MapDisplay
      mapType="leaflet"
      center={{ lat: 39.8283, lng: -98.5795 }}
      zoom={4}
      points={allDestinations}
      height="400px"
      className="rounded-xl shadow-lg"
    />
  </div>
  
  {/* Regional maps */}
  <MapDisplay
    mapType="google"
    center={{ lat: 37.7749, lng: -122.4194 }}
    zoom={10}
    points={westCoastPoints}
    height="300px"
    googleApiKey={apiKey}
  />
  
  <MapDisplay
    mapType="globe"
    center={{ lat: 40.7128, lng: -74.0060 }}
    zoom={3}
    points={internationalPoints}
    height="300px"
    autoRotate={true}
  />
</div>
```

## Styling Customization

The component uses TailwindCSS classes and can be customized:

```tsx
<MapDisplay
  className="border-4 border-blue-500 shadow-2xl"
  // ... other props
/>
```

Default styling includes:
- Rounded corners (`rounded-2xl`)
- Shadow effects (`shadow-xl`)
- Responsive behavior
- Loading states with animations

## Error Handling

The component includes built-in error handling:
- Missing Google Maps API key
- Failed library loading
- Network issues
- Invalid coordinates

## Performance Optimization

- **Lazy Loading**: Map libraries are loaded only when needed
- **Code Splitting**: Each map type is in a separate chunk
- **Memoization**: Prevents unnecessary re-renders
- **Efficient Updates**: Only re-renders when props change

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- WebGL support required for 3D Globe

## Getting Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Maps JavaScript API
4. Create credentials (API Key)
5. Restrict the key to your domain for security

## Troubleshooting

### Common Issues

1. **Leaflet markers not showing**: Ensure CSS is imported
2. **Google Maps not loading**: Check API key and billing
3. **3D Globe performance**: Reduce point count or disable auto-rotate
4. **Mobile touch issues**: Ensure touch events are enabled

### Debug Mode

Add debug logging:

```tsx
<MapDisplay
  onMarkerClick={(point) => {
    console.log('Marker clicked:', point);
    console.log('Map type:', mapType);
  }}
  // ... other props
/>
```

## License

This component is designed to work with:
- Leaflet (BSD-2-Clause)
- Google Maps (Commercial license required)
- Three.js/Globe.gl (MIT)

Make sure to comply with each service's terms of use.