import { useEffect, useState } from 'react';
import { Camping, RequestPayload, Status } from '../types';
import { INTERVAL, PAYLOAD } from '../config';

export function usePolling(
    { url, capacity, text, value }: Camping,
    isRunning: boolean
) {
    const [isPolling, setIsPolling] = useState(false);
    const [status, setStatus] = useState(Status.IN_PROGRESS);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        async function fetchData() {
            try {
                const selectedCamping: RequestPayload['selectedCamping'] = {
                    capacity,
                    text,
                    value,
                };
                const body = JSON.stringify({ ...PAYLOAD, selectedCamping });
                const response = await fetch(url, {
                    method: 'POST',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const responseBody = await response.json();

                if (responseBody.isSuccessful) cleanUp();
            } catch (error) {
                console.error(error);
            }
        }

        function cleanUp() {
            clearInterval(intervalId);
            setStatus(Status.BOOKED);
            setIsPolling(false);
        }

        if (isRunning) {
            setIsPolling(true);
            setStatus(Status.IN_PROGRESS);

            fetchData();

            intervalId = setInterval(fetchData, INTERVAL);
        }

        return cleanUp;
    }, [url, isRunning, capacity, text, value]);

    return { isPolling, status };
}
