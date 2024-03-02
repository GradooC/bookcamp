import { useEffect, useState } from 'react';
import { Camping, RequestPayload, Status } from '../types';
import { INTERVAL, PAYLOAD } from '../config';
import BackgroundTimer, { IntervalId } from 'react-native-background-timer';

export function usePolling(
    { url, capacity, text, value }: Camping,
    isRunning: boolean
) {
    const [isPolling, setIsPolling] = useState(false);
    const [status, setStatus] = useState(Status.IN_PROGRESS);

    useEffect(() => {
        let intervalId: IntervalId;

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

                if (responseBody.isSuccessful) {
                    setStatus(Status.BOOKED);
                    setIsPolling(false);
                    BackgroundTimer.clearInterval(intervalId);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (isRunning) {
            setIsPolling(true);
            setStatus(Status.IN_PROGRESS);

            fetchData();

            intervalId = BackgroundTimer.setInterval(fetchData, INTERVAL);
        }

        return function cleanUp() {
            BackgroundTimer.clearInterval(intervalId);
        };
    }, [url, isRunning, capacity, text, value]);

    return { isPolling, status };
}
