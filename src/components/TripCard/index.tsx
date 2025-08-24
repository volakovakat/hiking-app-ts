import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from "@mui/material/Chip";
import HikingDuration from "../HikingDuration/index";
import InfoModal from "../InfoModal/index";
import { Trip } from '../../functions/getTrips';
import { Location } from "../../functions/getLocations";

import {imgBaseUrl} from "../../config";
import { computeCarTimeHours, LatLng } from "../../functions/geo";

interface TripCardProps {
    trip: Trip;
    location: Location;
    originCoords?: LatLng;
}

const TripCard: React.FC<TripCardProps> = ({ trip, location, originCoords}) => {
    const { ascent, descent, header, image, info, hikeTimeRange, carTimeRange, hikeLength, parking, map, mapPreview, location_id, startPoint } = trip;

    const { name } = location;

    const effectiveCarTimeRange = React.useMemo(() => {
        if (!originCoords || !startPoint) return carTimeRange;
        const h = computeCarTimeHours(originCoords, startPoint);
        return { value: Number(h.toFixed(1)), unit: 'h' };
    }, [originCoords, startPoint, carTimeRange]);

    return (
        <Card sx={{ width: 345, height: 311 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title="map"
            />
            <CardContent>
                <Typography sx={{ fontSize: 18 }} gutterBottom variant="h5" component="div">
                    {header}
                </Typography>
                <Chip label={`${name}`} variant="outlined" color="primary" size="small" />
                <Typography variant="subtitle1" component="span" color="text.secondary" sx={{ ml: 1 }}>
                    {hikeLength.value} {hikeLength.unit}
                </Typography>
                <HikingDuration
                    hikeTimeRange={hikeTimeRange}
                    carTimeRange={effectiveCarTimeRange}
                    ascent={ascent}
                    descent={descent}
                />
            </CardContent>
            <CardActions>
                <InfoModal trip={{ ascent, descent, header, image, info, mapPreview, hikeTimeRange, carTimeRange: effectiveCarTimeRange, hikeLength, location_id }} />
                <Button size="small" href={map} target="_blank">Trasa</Button>
                <Button size="small" href={parking} target="_blank">Parking</Button>
            </CardActions>
        </Card>
    );
}

export default TripCard;
