import { memo, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

import MapComponent from './map.component';

function MapDialogComponent({ open, closeHandler, coordinates }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [copyIndicatorOpen, setCopyIndicatorOpen] = useState(false);

    const handleCopyClick = () => {
        setCopyIndicatorOpen(true);
    };

    const handleCopyIndicatorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setCopyIndicatorOpen(false);
    };

    const handleCoordinatesClick = async (coordinates) => {
        await navigator.clipboard.writeText(coordinates);
        handleCopyClick()
    }

    return (
        <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={closeHandler}>

            <DialogTitle textAlign="center">
                <Tooltip title="Click to copy" placement="top" arrow>
                    <Button onClick={() => { handleCoordinatesClick(coordinates) }} size="small" variant="text" startIcon={<LocationSearchingIcon />} aria-label={coordinates}>
                        <Typography variant='button'>{coordinates}</Typography>
                    </Button>
                </Tooltip>
            </DialogTitle>

            <DialogContent dividers>
                <MapComponent coordinates={coordinates}/>
            </DialogContent>

            <DialogActions>
                <Button onClick={closeHandler}>
                    {'Close'}
                </Button>
            </DialogActions>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={copyIndicatorOpen}
                autoHideDuration={3000}
                onClose={handleCopyIndicatorClose}
                message="Copied!"
            />

        </Dialog>
    );
}

export default memo(MapDialogComponent)