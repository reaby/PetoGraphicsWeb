import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import { ContextProvider } from './Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import Notifier from './common/Notifier';
import './index.css';
import theme from './theme';

import Main from './main/Main';
import Preview from './preview/Preview';

window.petoGraphics = {
    countdowns: []
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path='/' exact element={
                        <>
                            <Notifier />
                            <CssBaseline />
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <ContextProvider>
                                    <Main />
                                </ContextProvider>
                            </LocalizationProvider>
                        </>
                    } />
                    <Route path='/preview' element={<Preview />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
