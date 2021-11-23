import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Context } from '../Context';

import ContentSettings from './ContentSettings';
import GeneralSettings from './GeneralSettings';
import AnimationSettings from './AnimationSettings';
import TextSettings from './TextSettings';

const Settings = () => {
    const { selectedGraphic, updateGraphic, live, fonts } = useContext(Context);
    // Keep collapsed logic here so we can keep them during re-renders
    const [contentCollapsed, setContentCollapsed] = useState(false);
    const [generalCollapsed, setGeneralCollapsed] = useState(false);
    const [animationCollapsed, setAnimationCollapsed] = useState(true);
    const [textCollapsed, setTextCollapsed] = useState(true);

    if (!selectedGraphic) return null;

    return (
        <Box sx={{ margin: 2 }}>
            <Grid container spacing={3}>
                {selectedGraphic.texts?.length > 0 && (
                    <ContentSettings
                        selectedGraphic={selectedGraphic}
                        updateGraphic={updateGraphic}
                        collapsed={contentCollapsed}
                        setCollapsed={setContentCollapsed}
                    />
                )}
                {!live && (
                    <>
                        <GeneralSettings
                            {...selectedGraphic}
                            updateGraphic={updateGraphic}
                            collapsed={generalCollapsed}
                            setCollapsed={setGeneralCollapsed}
                        />
                        <AnimationSettings
                            selectedGraphic={selectedGraphic}
                            updateGraphic={updateGraphic}
                            collapsed={animationCollapsed}
                            setCollapsed={setAnimationCollapsed}
                        />
                        {selectedGraphic.texts?.length > 0 && (
                            <TextSettings
                                selectedGraphic={selectedGraphic}
                                updateGraphic={updateGraphic}
                                fonts={fonts}
                                collapsed={textCollapsed}
                                setCollapsed={setTextCollapsed}
                            />
                        )}
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default Settings;
