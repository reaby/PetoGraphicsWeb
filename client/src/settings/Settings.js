import { useState } from 'react';
import PropTypes from 'prop-types';
import GeneralSettings from './GeneralSettings';
import AnimationSettings from './AnimationSettings';
import TextSettings from './TextSettings';

const Settings = ({ selectedGraphic, updateGraphic, files, refreshFiles, fonts }) => {
    const [generalCollapsed, setGeneralCollapsed] = useState(false);
    const [animationCollapsed, setAnimationCollapsed] = useState(true);
    const [textCollapsed, setTextCollapsed] = useState(true);

    return (
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
    );
};

Settings.propTypes = {
    selectedGraphic: PropTypes.object.isRequired,
    updateGraphic: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired,
    refreshFiles: PropTypes.func.isRequired,
    fonts: PropTypes.array.isRequired
};

export default Settings;
