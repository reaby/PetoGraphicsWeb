import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useFetch from './common/hooks/useFetch';
import fetch from './common/functions/fetchWrap';
import { showMessage } from './common/Notifier';
import _ from 'lodash';

let socket;

export const Context = React.createContext({});

export const ContextProvider = ({ children }) => {
    const [config, setConfig] = useState(null);
    const [project, setProject] = useState(null);
    const [live, setLive] = useState(false);
    const [selectedGraphicId, setSelectedGraphicId] = useState(null);
    const [{ data: fonts, refresh: refreshFonts }] = useFetch('/api/fonts');
    const [{ data: projects, refresh: refreshProjects }] = useFetch('/api/projects');

    const selectedGraphic = useMemo(() => {
        return config?.find((item) => item.id === selectedGraphicId);
    }, [config, selectedGraphicId]);

    const updateGraphic = useCallback((id, path, value) => {
        setConfig((prev) => {
            const newConfig = [...prev];
            const index = newConfig.findIndex((item) => item.id === id);
            _.set(newConfig[index], path, value);
            return newConfig;
        });
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
                setSelectedGraphicId,
                selectedGraphic, updateGraphic,
                projects, refreshProjects,
                fonts, refreshFonts
            }}
        >
            {children}
        </Context.Provider>
    );
};
