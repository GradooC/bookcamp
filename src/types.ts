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

type SelectedCamping = {
    text: string;
    value: string;
    capacity: number;
};

export type ResponseBody = {
    isSuccessful: boolean;
    message?: any;
    errorMessage: string;
    data?: any;
    targetUrl?: any;
};

export type Camping = {
    name: string;
    text: string;
    value: string;
    capacity: number;
    url: string;
    image: ImageSourcePropType;
};

export enum Status {
    IN_PROGRESS = 'inProgress',
    BOOKED = 'booked',
}
