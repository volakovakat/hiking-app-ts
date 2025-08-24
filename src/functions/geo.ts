export interface LatLng {
  lat: number;
  lng: number;
}

/**
 * Jednoduché geokódování pomocí Nominatim (OpenStreetMap).
 * Vrací první nalezenou pozici, nebo null.
 */
export async function geocodeAddress(query: string): Promise<LatLng | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}`;
    const res = await fetch(url, {
      headers: {
        // Některé instance Nominatimu vyžadují identifikaci klienta
        "Accept": "application/json",
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (!data || data.length === 0) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

/**
 * Vypočítá čas jízdy autem v hodinách na základě vzdušné vzdálenosti a průměrné rychlosti.
 * Jde o aproximaci: Haversine + průměrná rychlost (km/h).
 */
export function computeCarTimeHours(
  from: LatLng,
  to: LatLng,
  averageSpeedKmh = 65
): number {
  const R = 6371; // Zemský poloměr v km
  const dLat = deg2rad(to.lat - from.lat);
  const dLon = deg2rad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(from.lat)) *
      Math.cos(deg2rad(to.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;
  const hours = distanceKm / Math.max(averageSpeedKmh, 1);
  return Math.max(hours, 0);
}

function deg2rad(deg: number): number {
  return (deg * Math.PI) / 180;
}
