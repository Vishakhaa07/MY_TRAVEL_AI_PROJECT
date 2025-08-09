# MapTilerMap Component

A production-ready React component for displaying interactive maps using MapTiler Cloud services. Supports both Leaflet and MapTiler SDK rendering modes with proper attribution and responsive design.

## ⚠️ Attribution Required

When using this component, you **must** include proper attribution as required by MapTiler and OpenStreetMap:

**© MapTiler © OpenStreetMap contributors**

This attribution is automatically included in the component, but ensure it remains visible to users.

## 🚀 Installation

Install the required dependencies:

```bash
# Core dependencies
npm install leaflet @maptiler/leaflet-maptilersdk @maptiler/sdk

# TypeScript types (if using TypeScript)
npm install @types/leaflet
```

## 🔑 Getting Your API Key

1. Visit [MapTiler Cloud](https://maptiler.com)
2. Sign up for a free account
3. Go to your account dashboard
4. Copy your API key from the "API Keys" section
5. Free tier includes 100,000 map loads per month

## 📖 Usage

### Basic Import

```tsx
import { MapTilerMap } from '@/components/maps/MapTilerMap';
```

### Leaflet Mode (Default)

```tsx
function MyTravelApp() {
  const marker = {
    lat: 40.7128,
    lng: -74.0060,
    label: 'New York City',
    description: 'The city that never sleeps'
  };

  return (
    <MapTilerMap
      apiKey="YOUR_MAPTILER_API_KEY"
      mode="leaflet"
      center={{ lat: 40.7128, lng: -74.0060 }}
      zoom={12}
      marker={marker}
      height="500px"
      onMarkerClick={(marker) => console.log('Clicked:', marker)}
    />
  );
}
```

### SDK Mode (3D Vector Maps)

```tsx
function Advanced3DMap() {
  const marker = {
    lat: 48.8566,
    lng: 2.3522,
    label: 'Paris, France',
    description: 'City of Light'
  };

  return (
    <MapTilerMap
      apiKey="YOUR_MAPTILER_API_KEY"
      mode="sdk"
      center={{ lat: 48.8566, lng: 2.3522 }}
      zoom={14}
      pitch={45}        // 3D tilt angle
      bearing={30}      // Map rotation
      marker={marker}
      height="600px"
      className="my-custom-class"
      onMarkerClick={(marker) => {
        alert(`Clicked on ${marker.label}`);
      }}
    />
  );
}
```

### Multiple Destinations

```tsx
function TravelDestinations() {
  const destinations = [
    { lat: 35.6762, lng: 139.6503, label: 'Tokyo', description: 'Modern metropolis' },
    { lat: 51.5074, lng: -0.1278, label: 'London', description: 'Historic capital' },
    { lat: -33.8688, lng: 151.2093, label: 'Sydney', description: 'Harbor city' }
  ];

  return (
    <div className="space-y-6">
      {destinations.map((dest, index) => (
        <MapTilerMap
          key={index}
          apiKey="YOUR_MAPTILER_API_KEY"
          mode="leaflet"
          center={{ lat: dest.lat, lng: dest.lng }}
          zoom={11}
          marker={dest}
          height="300px"
        />
      ))}
    </div>
  );
}
```

### Dynamic Mode Switching

```tsx
function InteractiveMapDemo() {
  const [mapMode, setMapMode] = useState<'leaflet' | 'sdk'>('leaflet');
  
  const destination = {
    lat: 46.2044,
    lng: 6.1432,
    label: 'Geneva, Switzerland',
    description: 'International city by the lake'
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button 
          onClick={() => setMapMode('leaflet')}
          className={`px-4 py-2 rounded ${mapMode === 'leaflet' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Leaflet Mode
        </button>
        <button 
          onClick={() => setMapMode('sdk')}
          className={`px-4 py-2 rounded ${mapMode === 'sdk' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          SDK Mode (3D)
        </button>
      </div>
      
      <MapTilerMap
        apiKey="YOUR_MAPTILER_API_KEY"
        mode={mapMode}
        center={{ lat: destination.lat, lng: destination.lng }}
        zoom={13}
        pitch={mapMode === 'sdk' ? 60 : 0}
        bearing={mapMode === 'sdk' ? 45 : 0}
        marker={destination}
        height="500px"
      />
    </div>
  );
}
```

## 🎛️ Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `apiKey` | `string` | ✅ | - | Your MapTiler API key |
| `mode` | `'leaflet' \| 'sdk'` | ✅ | - | Rendering mode |
| `center` | `{ lat: number; lng: number }` | ✅ | - | Map center coordinates |
| `zoom` | `number` | ❌ | `10` | Initial zoom level (1-20) |
| `pitch` | `number` | ❌ | `0` | 3D tilt angle (SDK mode only, 0-60) |
| `bearing` | `number` | ❌ | `0` | Map rotation (SDK mode only, 0-360) |
| `marker` | `MarkerProps` | ❌ | - | Single marker to display |
| `className` | `string` | ❌ | `''` | Additional CSS classes |
| `height` | `string` | ❌ | `'400px'` | Map container height |
| `onMarkerClick` | `function` | ❌ | - | Callback when marker is clicked |

### MarkerProps Interface

```tsx
interface MarkerProps {
  lat: number;           // Latitude
  lng: number;           // Longitude  
  label: string;         // Marker title
  description?: string;  // Optional description for popup
}
```

## 🎨 Styling & Customization

### Default Styling
- Rounded corners (`rounded-2xl`)
- Drop shadow (`shadow-lg`)
- Responsive design
- Mode indicator badge
- Attribution overlay

### Custom Styling
```tsx
<MapTilerMap
  // ... other props
  className="border-4 border-blue-500 shadow-2xl"
  height="600px"
/>
```

### CSS Customization
```css
/* Custom map container styles */
.my-custom-map {
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Hide attribution if needed (not recommended) */
.hide-attribution .maplibregl-ctrl-attrib {
  display: none;
}
```

## 🌍 Map Modes Comparison

### Leaflet Mode
- **Pros**: Lightweight, fast loading, great for simple use cases
- **Cons**: Limited 3D capabilities, raster tiles only
- **Best for**: Basic maps, mobile apps, fast loading
- **Tile source**: MapTiler raster tiles

### SDK Mode  
- **Pros**: Vector tiles, 3D capabilities, smooth animations, pitch/bearing control
- **Cons**: Larger bundle size, more complex
- **Best for**: Advanced visualizations, 3D maps, interactive experiences
- **Tile source**: MapTiler vector tiles

## 📱 Responsive Design

The component is fully responsive and works on:
- ✅ Desktop browsers
- ✅ Mobile devices (iOS/Android)
- ✅ Tablets
- ✅ Touch interfaces

## 🔧 Troubleshooting

### Common Issues

1. **Map not loading**
   - Check your API key is valid
   - Ensure you have internet connectivity
   - Verify the API key has sufficient quota

2. **Markers not appearing**
   - Check latitude/longitude values are valid
   - Ensure marker coordinates are within map bounds

3. **3D features not working**
   - Make sure you're using `mode="sdk"`
   - Check that pitch/bearing values are within valid ranges

4. **Bundle size concerns**
   - Maps are lazy-loaded to minimize initial bundle
   - Consider code splitting if using multiple map modes

### Debug Mode

Enable console logging:

```tsx
<MapTilerMap
  // ... props
  onMarkerClick={(marker) => {
    console.log('Marker clicked:', marker);
    console.log('Map mode:', mode);
  }}
/>
```

## 🚀 Performance Tips

1. **Lazy Loading**: Map libraries are loaded only when needed
2. **API Key Management**: Store API keys in environment variables
3. **Caching**: MapTiler automatically caches tiles for better performance
4. **Responsive Images**: Use appropriate zoom levels for different screen sizes

## 📄 License & Attribution

- **MapTiler**: Commercial license required for production use
- **OpenStreetMap**: Open Database License (ODbL)
- **Leaflet**: BSD 2-Clause License
- **Component**: MIT License

## 🔗 Useful Links

- [MapTiler Documentation](https://docs.maptiler.com/)
- [MapTiler Pricing](https://maptiler.com/pricing/)
- [Leaflet Documentation](https://leafletjs.com/)
- [MapTiler SDK Documentation](https://docs.maptiler.com/sdk-js/)

---

**Built with ❤️ for modern travel applications**