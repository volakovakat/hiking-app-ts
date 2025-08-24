import React, { useEffect, useState } from 'react';
import './App.css';
import { getTrips, Trip } from "./functions/getTrips";
import {getLocations, Location} from "./functions/getLocations";
import TripCard from "./components/TripCard";
import Navigation from "./components/Navigation";
import {ThemeProvider, createTheme, Stack, Box, TextField, Button} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { geocodeAddress, LatLng } from "./functions/geo";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App: React.FC = () => {
    const [data, setData] = useState<Trip[] | null>(null);
    const [locations, setLocations] = useState<Location[] | null>(null);
    const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
    const [originInput, setOriginInput] = useState<string>("");
    const [originCoords, setOriginCoords] = useState<LatLng | null>(null);
    const [isGeocoding, setIsGeocoding] = useState<boolean>(false);

    useEffect(() => {
        getTrips().then((trips) => {
            setData(trips);
            console.log(trips);
        }).catch((error) => {
            console.error("Error fetching trips:", error);
        });
        getLocations().then((locations) => {
            setLocations(locations);
            console.log(locations);
        }).catch((error) => {
            console.error("Error fetching locations:", error);
        });
    }, []);

    const handleFindAddress = async () => {
        if (!originInput.trim()) return;
        setIsGeocoding(true);
        try {
            const coords = await geocodeAddress(originInput.trim());
            if (coords) {
                setOriginCoords(coords);
            } else {
                alert("Adresu se nepodařilo najít.");
            }
        } finally {
            setIsGeocoding(false);
        }
    };

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolokace není ve vašem prohlížeči podporována.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setOriginCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            },
            () => {
                alert("Nepodařilo se získat aktuální polohu.");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    };

    return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
            <header className="App-header">
                <h1>Turistické trasy</h1>
            </header>
            <nav>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="stretch">
                    {locations && (
                        <Navigation
                            locations={locations}
                            onChange={setSelectedLocationIds}
                        />
                    )}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flex: 1 }}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder="Zadejte adresu výchozího místa"
                            value={originInput}
                            onChange={(e) => setOriginInput(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleFindAddress} disabled={isGeocoding}>
                            {isGeocoding ? "Hledám..." : "Najít"}
                        </Button>
                        <Button variant="outlined" onClick={handleUseMyLocation}>
                            Moje poloha
                        </Button>
                    </Box>
                </Stack>
            </nav>
            <section className="c-trip-cards">
                <Stack
                    className="c-trip-cards__item"
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{ flexWrap: 'wrap' }}
                >
                    {data && locations ? (
                        (selectedLocationIds.length
                            ? data.filter((trip) => selectedLocationIds.includes(trip.location_id))
                            : data
                        ).map((trip) => (
                            <TripCard
                                key={trip.id}
                                trip={trip}
                                location={locations.filter((l) => l.id === trip.location_id)[0]}
                                originCoords={originCoords || undefined}
                            />
                        ))
                    ) : (
                        <p>Načítání dat...</p>
                    )}
                </Stack>
            </section>
        </div>
    </ThemeProvider>
    );
}

export default App;
