import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import { ContextProvider } from './Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';
import Notifier from 'common/components/Notifier';
import './index.css';
import theme from './theme';

import Main from './main/Main';
import Output from './output/Output';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true
        }
    }
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <Suspense fallback={<div />}>
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
                            <Route path='/output' element={<Output />} />
                        </Routes>
                    </Suspense>
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
