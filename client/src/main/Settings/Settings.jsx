import { useState } from 'react';
import GeneralSettings from './GeneralSettings';
import AnimationSettings from './AnimationSettings';
import TextSettings from './TextSettings';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';

const Settings = () => {
    const textsCount = useProject(
        (state) => findGraphic(state.config, state.selectedGraphic).texts?.length ?? 0
    );
    const selectedGraphic = useProject((state) => state.selectedGraphic);
    const [generalCollapsed, setGeneralCollapsed] = useState(false);
    const [animationCollapsed, setAnimationCollapsed] = useState(true);
    const [textCollapsed, setTextCollapsed] = useState(true);

    return (
        <>
            <GeneralSettings
                id={selectedGraphic}
                collapsed={generalCollapsed}
                setCollapsed={setGeneralCollapsed}
            />
            <AnimationSettings
                id={selectedGraphic}
                collapsed={animationCollapsed}
                setCollapsed={setAnimationCollapsed}
            />
            {textsCount > 0 && (
                <TextSettings
                    id={selectedGraphic}
                    collapsed={textCollapsed}
                    setCollapsed={setTextCollapsed}
                />
            )}
        </>
    );
};

export default Settings;
