import { useEffect, useState } from 'react';
import { Camping, RequestPayload, Status } from '../types';
import { INTERVAL, PAYLOAD } from '../config';
import BackgroundTimer, { IntervalId } from 'react-native-background-timer';
import { useAppState } from '../providers/app-state-provider';

export function usePolling(
    { url, capacity, text, value }: Camping,
    isRunning: boolean
) {
    const [isPolling, setIsPolling] = useState(false);
    const [status, setStatus] = useState(Status.IN_PROGRESS);
    const { startDate, endDate } = useAppState();

    useEffect(() => {
        let intervalId: IntervalId;

        async function fetchData() {
            try {
                const selectedCamping: RequestPayload['selectedCamping'] = {
                    capacity,
                    text,
                    value,
                };

                const payload: RequestPayload = {
                    ...PAYLOAD,
                    selectedCamping,
                    startDate,
                    endDate,
                };
                const body = JSON.stringify(payload);
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
