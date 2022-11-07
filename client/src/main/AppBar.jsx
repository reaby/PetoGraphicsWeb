import { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { showMessage } from 'common/components/Notifier';
import AddProjectDialog from './AddProjectDialog';
import AskSaveDialog from './AskSaveDialog';
import useProjects from 'common/hooks/useProjects';
import axios from 'axios';
import useProject from 'common/hooks/useProject';
import useLive from 'common/hooks/useLive';

const AppBar = () => {
    const name = useProject((state) => state.name);
    const changeProject = useProject((state) => state.changeProject);
    const { live, setLive } = useLive();
    const { projects } = useProjects();
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
                {name && (
                    <Button
                        color='primary'
                        sx={{ mr: 4 }}
                        onClick={async () => {
                            try {
                                const { config } = useProject.getState();
                                await axios.put(`/api/projects/${name}`, { config });
                                showMessage('Config saved');
                            } catch (error) {
                                if (error.response) showMessage(error.response.data, true);
                            }
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
                        value={name || ''}
                        onChange={(event) => {
                            if (name) {
                                setSelectedProject(event.target.value);
                                setAskSaveDialogOpen(true);
                            } else {
                                if (event.target.value === 'add_new') {
                                    setAddProjectDialogOpen(true);
                                } else {
                                    changeProject(event.target.value);
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
                    changeProject(name);
                }}
            />
            <AskSaveDialog
                open={askSaveDialogOpen}
                name={name}
                onClose={() => {
                    setAskSaveDialogOpen(false);
                    if (selectedProject === 'add_new') {
                        setAddProjectDialogOpen(true);
                    } else {
                        changeProject(selectedProject);
                    }
                }}
            />
        </MuiAppBar>
    );
};

export default AppBar;
