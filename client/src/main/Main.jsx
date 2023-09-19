import { useRef, Suspense } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from './AppBar';
import GraphicList from './List';
import GraphicSettings from './Settings';
import GraphicContent from './Content';
import findParentGraphic from 'common/utils/findParentGraphic';
import copyGraphic from 'common/utils/copyGraphic';
import updateChildren from 'common/utils/updateChildren';
import { produce } from 'immer';
import useProject from 'common/hooks/useProject';
import useLive from 'common/hooks/useLive';

const Main = () => {
    const name = useProject((state) => state.name);
    const setConfig = useProject((state) => state.setConfig);
    const selectedGraphic = useProject((state) => state.selectedGraphic);
    const setSelectedGraphic = useProject((state) => state.setSelectedGraphic);
    const updateGraphic = useProject((state) => state.updateGraphic);
    const configReady = useProject((state) => !!state.config);
    const { live } = useLive();
    const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const copied = useRef();

    const onKeyDown = (event) => {
        const key = event.which || event.keyCode; // keyCode detection
        const ctrl = event.ctrlKey ? event.ctrlKey : key === 17 ? true : false; // ctrl detection
        switch (key) {
            // Hide all
            case 27: {
                setConfig((prev) =>
                    produce(prev, (newConfig) => {
                        updateChildren(newConfig, 'visible', false);
                    })
                );
                break;
            }
            // Delete
            case 46:
                if (!live && selectedGraphic) {
                    setConfig((prev) =>
                        produce(prev, (newConfig) => {
                            const parent = findParentGraphic(newConfig, selectedGraphic);
                            if (!parent) {
                                const index = newConfig.findIndex(
                                    (item) => item.id === selectedGraphic
                                );
                                newConfig.splice(index, 1);
                            } else {
                                const index = parent.children.findIndex(
                                    (item) => item.id === selectedGraphic
                                );
                                parent.children.splice(index, 1);
                            }
                        })
                    );
                    setSelectedGraphic(null);
                }
                break;
            // Copy
            case 67:
                if (ctrl) {
                    copied.current = selectedGraphic;
                }
                break;
            // Paste
            case 86:
                if (ctrl && copied.current) {
                    const copy = copyGraphic(copied.current);
                    setConfig((prev) => [...prev, copy]);
                }
                break;
            // Hide
            case 113:
                if (selectedGraphic) {
                    updateGraphic(selectedGraphic.id, 'visible', !selectedGraphic.visible, true);
                }
                break;
            default:
                break;
        }
    };

    if (!configReady) return null;

    return (
        <>
            <AppBar />
            {name && (
                <Container
                    maxWidth={false}
                    sx={{ height: 'calc(100vh - 64px)', pt: 3, pb: 3 }}
                >
                    <Grid
                        container
                        spacing={3}
                        direction={matches ? 'row' : 'column'}
                        sx={{ height: 'calc(100% + 24px)' }}
                    >
                        <Grid
                            item
                            xs={7}
                            sx={{ width: '100%', height: matches ? '100%' : '50%' }}
                            onKeyDown={onKeyDown}
                            tabIndex='0'
                        >
                            <Paper sx={{ height: '100%' }}>
                                <Suspense>
                                    <GraphicList />
                                </Suspense>
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            xs={5}
                            sx={{ height: matches ? '100%' : '30%' }}
                        >
                            <Paper sx={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
                                <Suspense>
                                    {selectedGraphic && (
                                        <Box sx={{ margin: 2 }}>
                                            <Grid
                                                container
                                                spacing={3}
                                            >
                                                <GraphicContent id={selectedGraphic} />
                                                {!live && <GraphicSettings id={selectedGraphic} />}
                                            </Grid>
                                        </Box>
                                    )}
                                </Suspense>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </>
    );
};

export default Main;
