import { tripsMock } from "./mockData";

export interface TimeWithUnit {
    value: number;
    unit: string; // např. "h"
}

export interface LengthWithUnit {
    value: number;
    unit: string; // např. "km"
}

export interface LatLng {
    lat: number;
    lng: number;
}

export interface Trip {
    id: string;
    ascent: number;
    descent: number;
    header: string;
    image: string;
    info: string;
    location_id: string;
    hikeTimeRange: TimeWithUnit;
    carTimeRange: TimeWithUnit;
    hikeLength: LengthWithUnit;
    startPoint: LatLng;
    map: string;
    mapPreview: string;
    parking: string;
}

export const getTrips = async (): Promise<Trip[]> => {
    // Vrátí mockovaná data místo volání vzdálené DB
    return tripsMock as unknown as Trip[];
};

