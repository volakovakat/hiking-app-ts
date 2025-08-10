import {getSupabase} from "./getSupabase";

export interface Location {
    id: string;
    name: string;
};


export const getLocations = async (): Promise<Location[]> => {
    const { data, error } = await getSupabase
        .from('location')
        .select('*');

    if (error) {
        console.error("Error fetching locations:", error);
        throw error;
    }

    return data as Location[];
};