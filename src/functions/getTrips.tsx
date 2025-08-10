/*import {getSupabase} from "./supabase";

export const getTrips = getSupabase.from('trips').select('*');*/


import { getSupabase } from "./getSupabase";

export interface Trip {
    id: string;
    ascent: number;
    descent: number;
    header: string;
    image: string;
    info: string;
    location_id: string;
    hikeTimeRange: number;
    carTimeRange: number;
    map: string;
    mapPreview: string;
    parking: string;
}

export const getTrips = async (): Promise<Trip[]> => {
    const { data, error } = await getSupabase
        .from('trips')
        .select('*');

    if (error) {
        console.error("Error fetching trips:", error);
        throw error;
    }

    return data as Trip[];
};

