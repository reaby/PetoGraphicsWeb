import { useContext } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Context } from '../Context';
import AppBar from './AppBar';
import GraphicList from '../list/List';
import GraphicSettings from '../settings/Settings';

const Main = () => {
    const { projects, config } = useContext(Context);
    const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));

    if (!projects || !config) return null;

    return (
        <>
            <AppBar />
            <Container maxWidth={false} sx={{ height: 'calc(100vh - 64px)', pt: 3, pb: 3 }}>
                <Grid container spacing={3} direction={matches ? 'row' : 'column'} sx={{ height: 'calc(100% + 24px)' }}>
                    <Grid item xs={7} sx={{ width: '100%', height: matches ? '100%' : '50%' }}>
                        <Paper sx={{ height: '100%' }}>
                            <GraphicList matches={matches} />
                        </Paper>
                    </Grid>
                    <Grid item xs={5} sx={{ height: matches ? '100%' : '30%' }}>
                        <Paper sx={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
                            <GraphicSettings />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Main;
