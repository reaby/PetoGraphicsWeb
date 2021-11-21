import { useState, useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import fetch from '../common/functions/fetchWrap';
import { showMessage } from '../common/Notifier';
import { Context } from '../Context';

const AddProjectDialog = ({ open, onClose, onAdd }) => {
    const [project, setProject] = useState('');
    useEffect(() => {
        if (open) {
            setProject('');
        }
    }, [open]);

    return (
        <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle>New project</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    autoFocus
                    label='Name'
                    type='text'
                    margin='normal'
                    fullWidth
                    value={project}
                    onChange={(event) => setProject(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={onClose}>
                    Close
                </Button>
                <Button color='primary' onClick={() => {
                    fetch('/api/projects', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            project
                        })
                    })
                        .then(() => onAdd(project))
                        .catch((error) => {
                            console.log(error);
                            error.then((text) => showMessage(text, true));
                        });
                }}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const Header = () => {
    const { config, setConfig, project, setProject, live, setLive, projects, refreshProjects } = useContext(Context);
    const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography
                    variant='h6'
                    color='inherit'
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    PetoGraphics
                </Typography>
                <Button
                    color='primary'
                    sx={{ mr: 4 }}
                    onClick={() => {
                        fetch(`/api/projects/${project}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                config
                            })
                        })
                            .then(() => showMessage('Config saved'))
                            .catch(console.error);
                    }}
                >
                    Save
                </Button>
                <Button
                    color='primary'
                    sx={{ mr: 4 }}
                    onClick={() => window.open('/preview')}
                >
                    Preview
                </Button>
                {!live && (
                    <TextField
                        select
                        value={project || ''}
                        onChange={(event) => {
                            if (event.target.value === 'add_new') {
                                setAddProjectDialogOpen(true);
                            } else {
                                setProject(event.target.value);
                            }
                        }}
                        size='small'
                        sx={{ width: 200, mr: 4 }}
                    >
                        {projects?.map((option) => (
                            <MenuItem key={option} value={option}>
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
                    setConfig([]);
                    refreshProjects();
                }}
            />
        </AppBar>
    );
};

export default Header;
