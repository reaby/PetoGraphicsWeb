import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import { ContextProvider } from './Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Notifier from './common/Notifier';
import './index.css';
import theme from './theme';

import Main from './main/Main';
import Preview from './preview/Preview';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path='/' exact element={
                        <>
                            <Notifier />
                            <CssBaseline />
                            <ContextProvider>
                                <Main />
                            </ContextProvider>
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
