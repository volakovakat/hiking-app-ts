import * as React from 'react';
import './style.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HikingDuration from "../HikingDuration/index";
import CardMedia from "@mui/material/CardMedia";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import IconButton from '@mui/material/IconButton';
import {Grid} from "@mui/material";
import {imgBaseUrl} from "../../config";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 345,
    width: '80%',
    maxHeight: 700,
    bgcolor: '#0f2b37',
    borderRadius: '16px',
    boxShadow: 24,
};

const styleGrid = {
    margin: 0,
    width: '100%',

}

const close = {
    position: 'absolute',
    zIndex: 10000,
    right: 0,
    top: 0,
};

interface InfoModalProps {
    trip: {
        ascent: number;
        descent: number;
        header: string;
        image: string;
        info: string;
        mapPreview: string;
        hikeTimeRange: number;
        carTimeRange: number;
    };
}

const InfoModal: React.FC<InfoModalProps> = ({ trip }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button size="small" onClick={handleOpen}>Info</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton aria-label="close" sx={close} onClick={handleClose}>
                        <CancelRoundedIcon fontSize="small" color="disabled" />
                    </IconButton>
                    <CardMedia
                        sx={{ height: 300, borderRadius: '16px 16px 0 0' }}
                        image={imgBaseUrl + trip.image}
                        title="map"
                    />
                    <div className="modal-content">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {trip.header}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            <HikingDuration hikeTimeRange={trip.hikeTimeRange} carTimeRange={trip.carTimeRange}
                                            ascent={trip.ascent} descent={trip.descent}/>
                        </Typography>
                        <Grid sx={styleGrid} container spacing={4}>
                            <Grid xs={8}>
                            <Typography variant="body2" color="text.secondary" component="div">
                                {trip.info}
                            </Typography>
                            </Grid>
                            <Grid xs={4}>
                                <div>
                                    <iframe src={trip.mapPreview} width="400" height="280"></iframe>
                                </div>
                            </Grid>
                        </Grid>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default InfoModal;
