import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import RangeInput from '../components/range-input.component';
import PartnerList from '../components/partner-list.component';

export default function PartnersPage() {
  const [range, setRange] = useState(0.0);

  const handleRangeValueChange = (range) => {
    setRange(range);
  };

  return (
    <Stack
      minHeight="10vh"
      margin="10vh" spacing={10}>
      <Typography variant="h2" component="h2" color="primary">
        Browse Partners
      </Typography>
      <Typography variant="h5" component="h5" color="info">
       List of partners with offices within a given range of Starbucks Cafe Central London (51.5144636,-0.142571).
      </Typography>
      <RangeInput defaultValue={range} onValueChange={handleRangeValueChange} />
      <PartnerList range={range} key={range} />
    </Stack>
  );
}