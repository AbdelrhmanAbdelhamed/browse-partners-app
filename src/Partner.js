import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Snackbar from '@mui/material/Snackbar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function Partner({ partner }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const officeList = partner.offices?.map((office, index) =>
    <div key={index}>
      <ListItem>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
        <ListItemIcon>
          <LocationCityIcon />
        </ListItemIcon>
        <ListItemText primary={office.address} secondary={office.location} />
        <Tooltip title="Click to copy" placement="top" arrow>
          <Button onClick={() => { handleCoordinatesClick(office.coordinates) }} size="small" variant="text" startIcon={<LocationSearchingIcon />} aria-label={office.coordinates}>
              <Typography fontSize={{xs: 10, sm: 10, md: '1em'}} variant='button'> {office.coordinates}</Typography>
          </Button>
        </Tooltip>
    </Grid>
      </ListItem>
      {index !== partner.offices.length - 1 && <Divider />}
    </div>
  )

  return (
    <Card>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 2, xl: 3 }}
          marginBottom={'2vh'}
        >
          {partner.customerLocations && <Chip margin={'2vh'} icon={<LocationOnIcon />} color="primary" label={partner.customerLocations} />}
          {partner.willWorkRemotely && <Chip icon={<SettingsRemoteIcon />} color="success" label="Will Work Remotely" />}
        </Stack>
        {partner.organization && <Typography variant="h5" component="div">
          {partner.organization}
        </Typography>}
        {partner.urlName && <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {partner.urlName}
        </Typography>}
        {partner.services && <Typography variant="body2">
          {partner.services}
        </Typography>}
      </CardContent>
      <CardActions>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}>
          {officeList?.length && <div onClick={handleExpandClick}>
            <Button startIcon={<BusinessIcon />} variant="text">
              Offices
            </Button>
            <ExpandMore
              disableRipple
              expand={expanded}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>}
          {partner.website && <Button startIcon={<LanguageIcon />} color='secondary' href={partner.website} target={'_blank'}>Visit Website</Button>}
        </Stack>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List disablePadding>
            {officeList}
          </List>
        </CardContent>
      </Collapse>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={copyIndicatorOpen}
        autoHideDuration={3000}
        onClose={handleCopyIndicatorClose}
        message="Copied!"
      />
    </Card>
  );
}