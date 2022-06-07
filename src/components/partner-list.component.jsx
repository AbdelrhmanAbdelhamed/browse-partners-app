import { useMemo, useEffect, useState } from "react";

import useAxios from "../hooks/use-axios.hook";

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ErrorIcon from '@mui/icons-material/Error';
import DescriptionIcon from '@mui/icons-material/Description';

import InfiniteScroll from 'react-infinite-scroll-component';

import PartnerComponent from "./partner.component";

const skeletonLoadingPartner = {
  "id": 4,
  "urlName": "blue-square-360",
  "organization": "Blue Square 360",
  "customerLocations": "globally",
  "willWorkRemotely": true,
  "website": "http://www.bluesquare360.com/",
  "services": "Blue Square 360 provides a professionally managed service covering all areas of a 360Â° Feedback initiative. We're experienced in supporting projects of all sizes, and always deliver a personal service that provides the level of support you need to ensure your 360 initiative delivers results for the business.",
  "offices": [
    {
      "location": "Singapore",
      "address": "Ocean Financial Centre, Level 40, 10 Collyer Quay, Singapore, 049315",
      "coordinates": "1.28304,103.85199319999992"
    },
    {
      "location": "London, UK",
      "address": "St Saviours Wharf, London SE1 2BE",
      "coordinates": "51.5014767,-0.0713608999999451"
    }
  ]
}

export default function PartnerList({ range }) {
  const [partners, setPartners] = useState([])
  const [page, setPage] = useState(1)
  const limit = 10
  const url = useMemo(() => `/partners?page=${page}&limit=${limit}${range ? `&range=${range}` : ``}`, [page, limit, range])

  const [{ data, loading, error }] = useAxios(url)

  useEffect(() => {
    setPartners(oldPartners => ([...(oldPartners || []), ...(data?.response || [])]))
  }, [data?.response])

  const skeletonList = [...Array(2)].map((_, index) => <Skeleton key={index} margin='5' variant="rectangular" width="100 %">
    < PartnerComponent partner={skeletonLoadingPartner} />
  </Skeleton >)

  const errorMessage = !loading && error && <Typography gutterBottom variant="h4" component="h4" color="error">
    <ErrorIcon fontSize="medium" style={{ minWidth: '40px' }} />{error?.message && error.message}
  </Typography>

  const noPartnersFound = <Typography gutterBottom variant="h4" component="h4" color="info">
    <DescriptionIcon fontSize="large" /> No Partners Found
  </Typography>

  const partnerList = partners.map(partner => (
    <PartnerComponent key={partner.id} partner={partner} />
  ))

  return <InfiniteScroll
    dataLength={partners.length}
    next={() => setPage(oldPage => oldPage + 1)}
    hasMore={partners.length < data?.total}
  >
    {errorMessage}

    {<Stack direction='column' spacing={8}> {!loading && !error && partners.length <= 0 ? noPartnersFound : partnerList}

      {loading && skeletonList}

      {partners.length > 0 && errorMessage}

    </Stack>}
  </InfiniteScroll>
}