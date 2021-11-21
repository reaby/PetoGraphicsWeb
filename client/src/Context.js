import React, { useState, useEffect, useMemo } from 'react';
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
    const [{ data: projects, refresh: refreshProjects }] = useFetch('/api/projects');

    const selectedGraphic = useMemo(() => {
        return config?.find((item) => item.id === selectedGraphicId);
    }, [config, selectedGraphicId]);

    useEffect(() => {
        socket = new WebSocket('ws://localhost:5000');
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
        fetch('/api/change_project', {
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

    const updateGraphic = (id, path, value) => {
        const newConfig = [...config];
        const index = newConfig.findIndex((item) => item.id === id);
        _.set(newConfig[index], path, value);
        setConfig(newConfig);
    };

    return (
        <Context.Provider
            value={{
                config, setConfig,
                project, setProject,
                live, setLive,
                setSelectedGraphicId,
                selectedGraphic, updateGraphic,
                projects, refreshProjects
            }}
        >
            {children}
        </Context.Provider>
    );
};
