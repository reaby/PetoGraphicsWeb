import { useState, useEffect, useCallback } from 'react';

const useFetch = (initialUrl, initialOptions) => {
    const [url, setUrl] = useState(initialUrl);
    const [options, setOptions] = useState(initialOptions);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refetch, setRefech] = useState(false);
    const fetchData = useCallback(() => {
        if (!url || url.length === 0) {
            return;
        }
        setLoading(true);
        fetch(url, {
            method: 'GET',
            ...options
        })
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [url, options]);
    const refresh = useCallback(() => {
        setRefech(true);
    }, []);
    useEffect(() => {
        fetchData();
    }, [url, options, fetchData]);
    useEffect(() => {
        if (refetch) {
            setRefech(false);
            fetchData();
        }
    }, [refetch, fetchData]);
    return [{ url, options, data, error, loading, refresh }, setUrl, setOptions];
};

export default useFetch;
