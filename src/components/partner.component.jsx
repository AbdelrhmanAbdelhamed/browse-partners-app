import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import BusinessIcon from '@mui/icons-material/Business';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import MapDialogComponent from './map-dialog.component';

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


export default function PartnerComponent({ partner }) {
  const [expanded, setExpanded] = useState(false);
  const [openMapDialog, setOpenMapDialog] = useState(false);

  const handleClickOpenMapDialog = () => {
    setOpenMapDialog(true);
  };

  const handleCloseMapDialog = () => {
    setOpenMapDialog(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          <Button startIcon={<MapIcon />} color='primary' onClick={handleClickOpenMapDialog}>
            Show on map
          </Button>
          <MapDialogComponent open={openMapDialog} closeHandler={handleCloseMapDialog} coordinates={office.coordinates} />
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
    </Card>
  );
}