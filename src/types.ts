import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import { DateType } from 'react-native-ui-datepicker';

export type DateRange = {
    startDate: DateType;
    endDate: DateType;
};

export type RequestPayload = {
    selectedCamping: SelectedCamping;
    isAgree: boolean;
    fullName: string;
    phoneNumber: string;
    email: string;
    startDate: string;
    endDate: string;
    numberOfAdult: string;
    numberOfChildren: string;
    tenantId?: any;
    notes: string;
    source?: any;
};

export type ResponseBody = {
    isSuccessful: boolean;
    message?: any;
    errorMessage: string;
    data?: any;
    targetUrl?: any;
};

export type Log = {
    id: number;
    time: string;
    request: RequestPayload;
    response: ResponseBody;
};

type SelectedCamping = {
    text: string;
    value: string;
    capacity: number;
};

export type Camping = {
    name: string;
    text: string;
    value: string;
    capacity: number;
    url: string;
    image: ImageSourcePropType;
};

export enum CampingItemStatus {
    IN_PROGRESS = 'inProgress',
    BOOKED = 'booked',
    OCCUPIED = 'occupied',
}

export enum AppStatus {
    NEED_DATES = 'needDates',
    RUNNING = 'running',
    PAUSED = 'paused',
}

export enum AppActionType {
    SYNC_STATE = 'SYNC_STATE',
    SET_DATE_RANGE = 'SET_DATE_RANGE',
    SET_STATUS = 'SET_STATUS',
    SET_PUSH_TOKEN = 'SET_PUSH_TOKEN',
    ADD_LOG_ITEM = 'ADD_LOG_ITEM',
}

export enum LogActionType {
    ADD_ITEM = 'ADD_ITEM',
}

export type RootStackParamList = {
    Settings: undefined;
    Main: undefined;
    Logs: undefined;
};

export type RootNativeStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
