import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import purple from '@mui/material/colors/purple';
import green from '@mui/material/colors/green';
import grey from '@mui/material/colors/grey';
import Container from '@mui/material/Container';
import PartnersPage from './PartnersPage'

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '1em'
        }
      }
    }
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green.A700,
    },
    background: {
      paper: grey[100]
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <PartnersPage />
      </Container>
      <CssBaseline />
    </ThemeProvider>
  );
}
