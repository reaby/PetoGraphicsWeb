import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import fetch from 'common/utils/fetchWrap';
import { showMessage } from 'common/components/Notifier';
import findGraphic from 'common/utils/findGraphic';
import updateChildren from 'common/utils/updateChildren';
import produce from 'immer';
import _set from 'lodash/set';

let socket;

export const Context = React.createContext({});

export const ContextProvider = ({ children }) => {
    const [config, _setConfig] = useState(null);
    const [project, setProject] = useState(null);
    const [live, setLive] = useState(false);
    const [countdowns, setCountdowns] = useState([]);
    const [selectedGraphicId, setSelectedGraphicId] = useState(null);

    const selectedGraphic = useMemo(() => {
        return config && selectedGraphicId && findGraphic(config, selectedGraphicId);
    }, [config, selectedGraphicId]);

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
        socket = new WebSocket(process.env.NODE_ENV === 'production' ? window.location.href.replace('http', 'ws') : 'ws://localhost:5000');
        socket.onmessage = (msg) => {
            const msgData = JSON.parse(msg.data);
            if (msgData.type === 'config') {
                _setConfig(msgData.payload.config);
                setProject(msgData.payload.project);
            }
        };
        return () => {
            socket?.close();
        };
    }, []);

    useEffect(() => {
        if (!project) {
            return;
        }
        fetch('/api/projects/change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                project
            })
        })
            .then((response) => response.json())
            .then((json) => _setConfig(json.config))
            .catch((error) => {
                error.then((text) => showMessage(text, true));
            });
    }, [project]);

    return (
        <Context.Provider
            value={{
                config, setConfig,
                project, setProject,
                live, setLive,
                countdowns, setCountdowns,
                setSelectedGraphicId,
                selectedGraphic, updateGraphic
            }}
        >
            {children}
        </Context.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};
