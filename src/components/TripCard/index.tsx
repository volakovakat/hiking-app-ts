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

interface TripCardProps {
    trip: Trip;
    location: Location;
}

const TripCard: React.FC<TripCardProps> = ({ trip, location}) => {
    const { ascent, descent, header, image, info, hikeTimeRange, carTimeRange, parking, map, mapPreview } = trip;

    const { name } = location;

    return (
        <Card sx={{ width: 345, height: 311 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={imgBaseUrl + image}
                title="map"
            />
            <CardContent>
                <Typography sx={{ fontSize: 18 }} gutterBottom variant="h5" component="div">
                    {header}
                </Typography>
                <Chip label={`${name}`} variant="outlined" color="primary" size="small" />
                <HikingDuration hikeTimeRange={hikeTimeRange} carTimeRange={carTimeRange} ascent={ascent}
                                descent={descent} />
            </CardContent>
            <CardActions>
                <InfoModal trip={{ ascent, descent, header, image, info, mapPreview, hikeTimeRange, carTimeRange }} />
                <Button size="small" href={map} target="_blank">Trasa</Button>
                <Button size="small" href={parking} target="_blank">Parking</Button>
            </CardActions>
        </Card>
    );
}

export default TripCard;
