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
import { Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import { imgBaseUrl } from "../../config";

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 345,
    width: '90%',
    maxWidth: 980,
    maxHeight: '90vh',
    bgcolor: '#0f2b37',
    borderRadius: '16px',
    boxShadow: 24,
    overflowY: 'auto',
};

const styleGrid = {
    margin: 0,
    width: '100%',
} as const;

const close = {
    position: 'absolute' as const,
    zIndex: 10000,
    right: 8,
    top: 8,
    '&:hover': { bgcolor: 'rgba(0,114,104,1)' }
};

interface InfoModalProps {
    trip: {
        ascent: number;
        descent: number;
        header: string;
        image: string;
        info: string;
        mapPreview: string;
        hikeTimeRange: { value: number; unit: string };
        carTimeRange: { value: number; unit: string };
        hikeLength: { value: number; unit: string };
        location_id: string;
    };
}

const InfoModal: React.FC<InfoModalProps> = ({ trip }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const imageUrl = trip.image.startsWith('http') ? trip.image : imgBaseUrl + trip.image;
    const [imgSrc, setImgSrc] = React.useState<string>(imageUrl);
    const handleImgError = () => {
        // Fallback obrázek pro případ chyby načtení
        setImgSrc('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60');
    };

    const mapPreviewUrl = /^https?:\/\//.test(trip.mapPreview) ? trip.mapPreview : undefined;

    return (
        <div>
            <Button size="small" onClick={handleOpen} aria-haspopup="dialog" aria-controls="trip-info-modal">
                Info
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style} id="trip-info-modal" role="dialog">
                        <IconButton aria-label="Zavřít detail trasy" sx={close} onClick={handleClose}>
                            <CancelRoundedIcon fontSize="small" color="disabled" />
                        </IconButton>

                        <CardMedia
                            component="img"
                            sx={{ height: { xs: 220, sm: 280, md: 320 }, objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
                            image={imgSrc}
                            alt={trip.header}
                            onError={handleImgError}
                        />

                        <div className="modal-content" style={{ padding: 16 }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                                {trip.header}
                                <Typography variant="subtitle1" component="span" color="text.secondary" sx={{ ml: 1 }}>
                                    • {trip.hikeLength.value} {trip.hikeLength.unit}
                                </Typography>
                            </Typography>

                            <Typography id="modal-modal-description" component="div" sx={{ mt: 1, mb: 2 }}>
                                <HikingDuration
                                    hikeTimeRange={trip.hikeTimeRange}
                                    carTimeRange={trip.carTimeRange}
                                    ascent={trip.ascent}
                                    descent={trip.descent}
                                />
                            </Typography>

                            <Divider sx={{ my: 2, opacity: 0.3 }} />

                            <Grid sx={styleGrid} container spacing={3}>
                                <Grid item xs={12} md={8}>
                                    <Typography variant="body2" color="text.secondary" component="div" sx={{ whiteSpace: 'pre-line' }}>
                                        {trip.info}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    {mapPreviewUrl ? (
                                        <Box sx={{ width: '100%', aspectRatio: '4 / 3', borderRadius: 1, overflow: 'hidden' }}>
                                            <iframe
                                                src={mapPreviewUrl}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                loading="lazy"
                                                title="Náhled mapy"
                                            />
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                width: '100%',
                                                p: 2,
                                                bgcolor: 'rgba(255,255,255,0.04)',
                                                borderRadius: 1,
                                                textAlign: 'center'
                                            }}
                                        >
                                            <Typography variant="caption" color="text.secondary">
                                                Náhled mapy není k dispozici.
                                            </Typography>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                <Button variant="outlined" color="inherit" onClick={handleClose}>
                                    Zavřít
                                </Button>
                            </Box>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default InfoModal;
