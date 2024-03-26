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
import { booking } from '../api/booking';

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

                const response = await booking({ url, payload });

                const time = dayjs(Date.now()).format('hh:mm:ss');
                const logItem = {
                    time,
                    response,
                    request: payload,
                };
                dispatch({
                    type: LogActionType.ADD_ITEM,
                    payload: logItem,
                });

                if (response.isSuccessful) {
                    setCampingItemStatus(CampingItemStatus.BOOKED);
                    setIsPolling(false);
                    BackgroundTimer.clearInterval(intervalId);
                    sendPushNotification({
                        to: pushToken,
                        title: 'Забронировано',
                        body: `Стоянка ${name} забронирована`,
                    });
                }

                if (response.errorMessage === ErrorMessage.OCCUPIED) {
                    setCampingItemStatus(CampingItemStatus.OCCUPIED);
                    setIsPolling(false);
                    BackgroundTimer.clearInterval(intervalId);
                    sendPushNotification({
                        to: pushToken,
                        title: 'Занято',
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
