import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
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
            suspense: true,
        },
    },
});

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <Suspense>
                        <Routes>
                            <Route
                                path='/'
                                exact
                                element={
                                    <>
                                        <Notifier />
                                        <CssBaseline />
                                        <Main />
                                    </>
                                }
                            />
                            <Route
                                path='/output'
                                element={<Output />}
                            />
                            <Route
                                path='/preview'
                                element={<Output mode='preview' />}
                            />
                        </Routes>
                    </Suspense>
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
