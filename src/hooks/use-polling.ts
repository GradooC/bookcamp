import { useEffect, useState } from 'react';
import {
    Camping,
    RequestPayload,
    CampingItemStatus,
    AppStatus,
    LogActionType,
} from '../types';
import { INTERVAL, PAYLOAD } from '../config';
import BackgroundTimer, { IntervalId } from 'react-native-background-timer';
import { useAppState } from '../providers/app-state-provider';
import { sendPushNotification } from '../api/send-push-notification';
import { ErrorMessage } from '../constants';
import dayjs from 'dayjs';
import { useLogDispatch } from '../providers/log-provider';

export function usePolling({ url, capacity, text, value, name }: Camping) {
    const [isPolling, setIsPolling] = useState(false);
    const [campingItemStatus, setCampingItemStatus] = useState(
        CampingItemStatus.IN_PROGRESS
    );
    const { startDate, endDate, appStatus, pushToken } = useAppState();
    const dispatch = useLogDispatch();

    useEffect(() => {
        let intervalId: IntervalId;

        async function fetchData() {
            if (!startDate || !endDate) return;

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

                const time = dayjs(Date.now()).format('hh:mm:ss');
                const logItem = {
                    time,
                    request: payload,
                    response: responseBody,
                };
                dispatch({
                    type: LogActionType.ADD_ITEM,
                    payload: logItem,
                });

                if (responseBody.isSuccessful) {
                    setCampingItemStatus(CampingItemStatus.BOOKED);
                    setIsPolling(false);
                    BackgroundTimer.clearInterval(intervalId);
                    sendPushNotification({
                        to: pushToken,
                        body: `Стоянка ${name} забронирована`,
                    });
                }

                if (responseBody.errorMessage === ErrorMessage.OCCUPIED) {
                    setCampingItemStatus(CampingItemStatus.OCCUPIED);
                    setIsPolling(false);
                    BackgroundTimer.clearInterval(intervalId);
                    sendPushNotification({
                        to: pushToken,
                        body: `Стоянка ${name} уже занята`,
                    });
                }
            } catch (error) {
                console.warn(error);
            }
        }

        if (appStatus === AppStatus.RUNNING) {
            setIsPolling(true);
            setCampingItemStatus(CampingItemStatus.IN_PROGRESS);

            fetchData();

            intervalId = BackgroundTimer.setInterval(fetchData, INTERVAL);
        }

        return function cleanUp() {
            BackgroundTimer.clearInterval(intervalId);
            setCampingItemStatus(CampingItemStatus.IN_PROGRESS);
        };
    }, [
        url,
        appStatus,
        capacity,
        text,
        value,
        pushToken,
        startDate,
        endDate,
        name,
    ]);

    return { isPolling, campingItemStatus };
}
