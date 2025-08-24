import { locationsMock } from "./mockData";

export interface Location {
    id: string;
    name: string;
}

export const getLocations = async (): Promise<Location[]> => {
    // Vrátí mockovaná data místo volání vzdálené DB
    return locationsMock as unknown as Location[];
};