import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Context } from '../Context';

import Content from '../content/Content';
import GeneralSettings from './GeneralSettings';
import AnimationSettings from './AnimationSettings';
import TextSettings from './TextSettings';

const Settings = () => {
    const { selectedGraphic, updateGraphic, live, fonts, files, refreshFiles } = useContext(Context);
    // Keep collapsed logic here so we can keep them during re-renders
    const [contentCollapsed, setContentCollapsed] = useState(false);
    const [generalCollapsed, setGeneralCollapsed] = useState(false);
    const [animationCollapsed, setAnimationCollapsed] = useState(true);
    const [textCollapsed, setTextCollapsed] = useState(true);

    if (!selectedGraphic) return null;

    return (
        <Box sx={{ margin: 2 }}>
            <Grid container spacing={3}>
                <Content
                    graphic={selectedGraphic}
                    updateGraphic={updateGraphic}
                    collapsed={contentCollapsed}
                    setCollapsed={setContentCollapsed}
                    files={files}
                    refreshFiles={refreshFiles}
                />
                {!live && (
                    <>
                        <GeneralSettings
                            id={selectedGraphic.id}
                            name={selectedGraphic.name}
                            image={selectedGraphic.image}
                            imageStretch={selectedGraphic.imageStretch}
                            left={selectedGraphic.left}
                            top={selectedGraphic.top}
                            width={selectedGraphic.width}
                            height={selectedGraphic.height}
                            updateGraphic={updateGraphic}
                            collapsed={generalCollapsed}
                            setCollapsed={setGeneralCollapsed}
                            files={files}
                            refreshFiles={refreshFiles}
                        />
                        <AnimationSettings
                            id={selectedGraphic.id}
                            animationIn={selectedGraphic.animationIn}
                            animationOut={selectedGraphic.animationOut}
                            updateGraphic={updateGraphic}
                            collapsed={animationCollapsed}
                            setCollapsed={setAnimationCollapsed}
                        />
                        {selectedGraphic.texts?.length > 0 && (
                            <TextSettings
                                id={selectedGraphic.id}
                                texts={selectedGraphic.texts}
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
