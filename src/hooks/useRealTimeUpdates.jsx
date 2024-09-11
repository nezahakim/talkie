import { useState, useEffect, useRef, useCallback } from "react";

const useRealTimeUpdates = (
  fetchFunction,
  interval = 300,
  dependencies = [],
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastFetchTime = useRef(0);
  const timeoutId = useRef(null);

  const fetchData = useCallback(
    async (force = false) => {
      const now = Date.now();
      if (force || now - lastFetchTime.current >= interval) {
        try {
          const result = await fetchFunction();
          setData((prevData) => {
            if (JSON.stringify(prevData) !== JSON.stringify(result)) {
              return result;
            }
            return prevData;
          });
          setLoading(false);
          setError(null);
          lastFetchTime.current = now;
        } catch (err) {
          setError(err.message || "An error occurred while fetching data");
          setLoading(false);
        }
      }
    },
    [fetchFunction, interval],
  );

  const startPolling = useCallback(() => {
    fetchData(true);
    timeoutId.current = setTimeout(startPolling, interval);
  }, [fetchData, interval]);

  const stopPolling = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, []);

  useEffect(() => {
    startPolling();
    return stopPolling;
  }, [startPolling, stopPolling, ...dependencies]);

  const refetch = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useRealTimeUpdates;
