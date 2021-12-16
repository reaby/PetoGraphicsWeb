import { useContext, useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Context } from '../Context';
import AppBar from './AppBar';
import GraphicList from '../list/List';
import GraphicSettings from '../settings/Settings';
import GraphicContent from '../content/Content';
import findParentGraphic from '../common/functions/findParentGraphic';
import copyGraphic from '../common/functions/copyGraphic';
import updateChildren from '../common/functions/updateChildren';
import produce from 'immer';

const Main = () => {
    const { projects, config, setConfig, project, selectedGraphic, setSelectedGraphicId, updateGraphic, files, refreshFiles, fonts, live } = useContext(Context);
    const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const copied = useRef();

    const onKeyDown = (event) => {
        console.log(event.target);
        const key = event.which || event.keyCode; // keyCode detection
        const ctrl = event.ctrlKey ? event.ctrlKey : ((key === 17) ? true : false); // ctrl detection
        switch(key) {
            // Hide all
            case 27: {
                setConfig((prev) => produce(prev, (newConfig) => {
                    updateChildren(newConfig, 'visible', false);
                }));
                break;
            }
            // Delete
            case 46:
                if (!live && selectedGraphic) {
                    setConfig((prev) => produce(prev, (newConfig) => {
                        const parent = findParentGraphic(newConfig, selectedGraphic.id);
                        if (!parent) {
                            const index = newConfig.findIndex((item) => item.id === selectedGraphic.id);
                            newConfig.splice(index, 1);
                        } else {
                            const index = parent.children.findIndex((item) => item.id === selectedGraphic.id);
                            parent.children.splice(index, 1);
                        }
                    }));
                    setSelectedGraphicId(null);
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

    if (!projects || !config) return null;

    return (
        <>
            <AppBar />
            {project && (
                <Container maxWidth={false} sx={{ height: 'calc(100vh - 64px)', pt: 3, pb: 3 }}>
                    <Grid container spacing={3} direction={matches ? 'row' : 'column'} sx={{ height: 'calc(100% + 24px)' }}>
                        <Grid item xs={7} sx={{ width: '100%', height: matches ? '100%' : '50%' }} onKeyDown={onKeyDown} tabIndex='0'>
                            <Paper sx={{ height: '100%' }}>
                                <GraphicList matches={matches} />
                            </Paper>
                        </Grid>
                        <Grid item xs={5} sx={{ height: matches ? '100%' : '30%' }}>
                            <Paper sx={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
                                {selectedGraphic && (
                                    <Box sx={{ margin: 2 }}>
                                        <Grid container spacing={3}>
                                            <GraphicContent
                                                graphic={selectedGraphic}
                                                updateGraphic={updateGraphic}
                                                files={files}
                                                refreshFiles={refreshFiles}
                                                project={project}
                                            />
                                            {!live && (
                                                <GraphicSettings
                                                    selectedGraphic={selectedGraphic}
                                                    updateGraphic={updateGraphic}
                                                    fonts={fonts}
                                                    files={files}
                                                    refreshFiles={refreshFiles}
                                                    project={project}
                                                />
                                            )}
                                        </Grid>
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </>
    );
};

export default Main;
