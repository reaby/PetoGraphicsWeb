import { useState, useContext } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import fetch from 'common/utils/fetchWrap';
import { showMessage } from 'common/components/Notifier';
import { Context } from '../Context';
import AddProjectDialog from './AddProjectDialog';
import AskSaveDialog from './AskSaveDialog';
import useProjects from 'common/hooks/useProjects';

const AppBar = () => {
    const { config, project, setProject, live, setLive } = useContext(Context);
    const { data: projects, refetch: refreshProjects } = useProjects();
    const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
    const [askSaveDialogOpen, setAskSaveDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    return (
        <MuiAppBar position='static'>
            <Toolbar>
                <Typography
                    variant='h6'
                    color='inherit'
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    PetoGraphics
                </Typography>
                {project && (
                    <Button
                        color='primary'
                        sx={{ mr: 4 }}
                        onClick={() => {
                            fetch(`/api/projects/${project}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    config,
                                }),
                            })
                                .then(() => showMessage('Config saved'))
                                .catch(console.error);
                        }}
                    >
                        Save
                    </Button>
                )}
                <Button
                    color='primary'
                    sx={{ mr: 4 }}
                    onClick={() => window.open('/output')}
                >
                    Output
                </Button>
                {!live && (
                    <TextField
                        select
                        value={project || ''}
                        onChange={(event) => {
                            if (project) {
                                setSelectedProject(event.target.value);
                                setAskSaveDialogOpen(true);
                            } else {
                                if (event.target.value === 'add_new') {
                                    setAddProjectDialogOpen(true);
                                } else {
                                    setProject(event.target.value);
                                }
                            }
                        }}
                        size='small'
                        sx={{ width: 200, mr: 4 }}
                    >
                        {projects?.map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                            >
                                {option}
                            </MenuItem>
                        ))}
                        <MenuItem value='add_new'>New Project</MenuItem>
                    </TextField>
                )}
                <Switch
                    value={live}
                    onChange={(event) => setLive(event.target.checked)}
                    color='primary'
                />
                Live
            </Toolbar>
            <AddProjectDialog
                open={addProjectDialogOpen}
                onClose={() => setAddProjectDialogOpen(false)}
                onAdd={(name) => {
                    setAddProjectDialogOpen(false);
                    setProject(name);
                    refreshProjects();
                }}
            />
            <AskSaveDialog
                open={askSaveDialogOpen}
                project={project}
                config={config}
                onClose={() => {
                    setAskSaveDialogOpen(false);
                    if (selectedProject === 'add_new') {
                        setAddProjectDialogOpen(true);
                    } else {
                        setProject(selectedProject);
                    }
                }}
            />
        </MuiAppBar>
    );
};

export default AppBar;
