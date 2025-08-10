import React, { useEffect, useState } from 'react';
import './App.css';
import { getTrips, Trip } from "./functions/getTrips";
import {getLocations, Location} from "./functions/getLocations";
import TripCard from "./components/TripCard";
import {ThemeProvider, createTheme, Stack} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App: React.FC = () => {
    const [data, setData] = useState<Trip[] | null>(null);
    const [locations, setLocations] = useState<Location[] | null>(null);

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

    return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
            <header className="App-header">
                <h1>Turistické trasy</h1>
            </header>
            <nav>
                <p>TODO: Chips navigation</p>
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
                        data.map((trip) => (
                            <TripCard key={trip.id} trip={trip} location={locations.filter((l) => l.id === trip.location_id)[0]} />
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
