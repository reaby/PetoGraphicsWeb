import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useFetch from './common/hooks/useFetch';
import fetch from './common/functions/fetchWrap';
import { showMessage } from './common/Notifier';
import findGraphic from './common/functions/findGraphic';
import produce from 'immer';
import _set from 'lodash/set';

let socket;

export const Context = React.createContext({});

const updateChildren = (children, path, value) => {
    for (const child of children) {
        _set(child, path, value);
        updateChildren(child.children, path, value);
    }
};

export const ContextProvider = ({ children }) => {
    const [config, setConfig] = useState(null);
    const [project, setProject] = useState(null);
    const [live, setLive] = useState(false);
    const [countdowns, setCountdowns] = useState([]);
    const [selectedGraphicId, setSelectedGraphicId] = useState(null);
    const [{ data: fonts, refresh: refreshFonts }] = useFetch('/api/fonts');
    const [{ data: projects, refresh: refreshProjects }] = useFetch('/api/projects');
    const [{ data: files, refresh: refreshFiles }] = useFetch('/api/files');

    const selectedGraphic = useMemo(() => {
        return config && selectedGraphicId && findGraphic(config, selectedGraphicId);
    }, [config, selectedGraphicId]);

    const updateGraphic = useCallback((id, path, value, updateChilds = false) => {
        setConfig((prev) => produce(prev, (newConfig) => {
            const graphic = findGraphic(newConfig, id);
            _set(graphic, path, value);
            if (updateChilds) {
                updateChildren(graphic.children, path, value);
            }
        }));
    }, []);

    useEffect(() => {
        socket = new WebSocket(process.env.NODE_ENV === 'production' ? window.location.href.replace('http', 'ws') : 'ws://localhost:5000');
        socket.onmessage = (msg) => {
            if (!config) {
                const msgData = JSON.parse(msg.data);
                setConfig(msgData.payload.config);
                setProject(msgData.payload.project);
            }
        };
        return () => {
            socket?.close();
        };
        // eslint-disable-next-line
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
            .then((json) => setConfig(json.config))
            .catch((error) => {
                error.then((text) => showMessage(text, true));
            });
    }, [project]);

    useEffect(() => {
        if (config) {
            socket.send(JSON.stringify({ type: 'update-config', payload: config }));
        }
    }, [config]);

    return (
        <Context.Provider
            value={{
                config, setConfig,
                project, setProject,
                live, setLive,
                countdowns, setCountdowns,
                setSelectedGraphicId,
                selectedGraphic, updateGraphic,
                projects, refreshProjects,
                fonts, refreshFonts,
                files, refreshFiles
            }}
        >
            {children}
        </Context.Provider>
    );
};
