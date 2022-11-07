import create from 'zustand';
import findGraphic from 'common/utils/findGraphic';
import updateChildren from 'common/utils/updateChildren';
import produce from 'immer';
import axios from 'axios';
import { showMessage } from 'common/components/Notifier';
import _set from 'lodash/set';

export const socket = new WebSocket(
    import.meta.env.MODE === 'production'
        ? window.location.href.replace('http', 'ws')
        : 'ws://localhost:5000'
);

const useProject = create((set, get) => ({
    name: null,
    config: null,
    setConfig: (value) => {
        let newConfig;
        if (value instanceof Function) {
            const { config } = get();
            newConfig = value(config);
        } else {
            newConfig = value;
        }
        set({ config: newConfig });
        socket.send(JSON.stringify({ type: 'update-config', payload: newConfig }));
    },
    changeProject: async (newName) => {
        set({ name: newName });
        try {
            const response = await axios.post('/api/projects/change', {
                name: newName,
            });
            set({ config: response.data.config });
        } catch (error) {
            if (error.response) showMessage(error.response.data, true);
        }
    },
    selectedGraphic: null,
    setSelectedGraphic: (id) => set({ selectedGraphic: id }),
    updateGraphic: (id, path, value, updateChilds = false) => {
        const { config } = get();
        const newConfig = produce(config, (draft) => {
            const graphic = findGraphic(draft, id);
            _set(graphic, path, value);
            if (updateChilds) {
                updateChildren(graphic.children, path, value);
            }
        });
        socket.send(JSON.stringify({ type: 'update-config', payload: newConfig }));
        set({ config: newConfig });
    },
}));

socket.onmessage = (msg) => {
    const msgData = JSON.parse(msg.data);
    if (msgData.type === 'config') {
        useProject.setState({
            config: msgData.payload.config,
            name: msgData.payload.name,
        });
    }
};

export default useProject;
