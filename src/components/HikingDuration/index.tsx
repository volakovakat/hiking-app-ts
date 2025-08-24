import * as React from "react";
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import "./style.css";

interface TimeWithUnit {
    value: number;
    unit: string;
}

interface HikingDurationProps {
    hikeTimeRange: TimeWithUnit;
    carTimeRange: TimeWithUnit;
    ascent: number;
    descent: number;
}

const HikingDuration: React.FC<HikingDurationProps> = ({hikeTimeRange, carTimeRange, ascent, descent}) => {
    return (
        <div className="c-icon-text-group">
            <span className="c-icon-text"><HikingOutlinedIcon color="disabled"/> {hikeTimeRange.value} {hikeTimeRange.unit}</span>
            <span className="c-icon-text"><DirectionsCarFilledOutlinedIcon color="disabled"/> {carTimeRange.value} {carTimeRange.unit}</span>
            <span className="c-icon-text"><TrendingUpOutlinedIcon color="disabled"/> {ascent}</span>
            <span className="c-icon-text"><TrendingDownOutlinedIcon color="disabled"/> {descent}</span>
        </div>
    )

}
export default HikingDuration;