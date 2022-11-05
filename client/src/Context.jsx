import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { showMessage } from 'common/components/Notifier';
import findGraphic from 'common/utils/findGraphic';
import updateChildren from 'common/utils/updateChildren';
import produce from 'immer';
import _set from 'lodash/set';

let socket;

export const Context = React.createContext({});

export const ContextProvider = ({ children }) => {
    const [config, _setConfig] = useState(null);
    const [project, _setProject] = useState(null);
    const [live, setLive] = useState(false);
    const [countdowns, setCountdowns] = useState([]);
    const [selectedGraphicId, setSelectedGraphicId] = useState(null);

    const selectedGraphic = useMemo(() => {
        return config && selectedGraphicId && findGraphic(config, selectedGraphicId);
    }, [config, selectedGraphicId]);

    const setProject = useCallback(async (newProject) => {
        try {
            let previosProject;
            _setProject((prev) => {
                previosProject = prev;
                return newProject;
            });
            const response = await axios.post('/api/projects/change', {
                project: newProject,
            });
            _setConfig(response.data.config);
        } catch (error) {
            if (error.response) showMessage(error.response.data, true);
        }
    }, []);

    const setConfig = useCallback((param) => {
        _setConfig((prev) => {
            const result = param instanceof Function ? param(prev) : param;
            socket.send(JSON.stringify({ type: 'update-config', payload: result }));
            return result;
        });
    }, []);

    const updateGraphic = useCallback((id, path, value, updateChilds = false) => {
        _setConfig((prev) => {
            const result = produce(prev, (newConfig) => {
                const graphic = findGraphic(newConfig, id);
                _set(graphic, path, value);
                if (updateChilds) {
                    updateChildren(graphic.children, path, value);
                }
            });
            socket.send(JSON.stringify({ type: 'update-config', payload: result }));
            return result;
        });
    }, []);

    useEffect(() => {
        socket = new WebSocket(
            import.meta.env.MODE === 'production'
                ? window.location.href.replace('http', 'ws')
                : 'ws://localhost:5000'
        );
        socket.onmessage = (msg) => {
            const msgData = JSON.parse(msg.data);
            if (msgData.type === 'config') {
                _setConfig(msgData.payload.config);
                _setProject(msgData.payload.project);
            }
        };
        return () => {
            socket?.close();
        };
    }, []);

    return (
        <Context.Provider
            value={{
                config,
                setConfig,
                project,
                setProject,
                live,
                setLive,
                countdowns,
                setCountdowns,
                setSelectedGraphicId,
                selectedGraphic,
                updateGraphic,
            }}
        >
            {children}
        </Context.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
