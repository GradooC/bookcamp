import { Camping, RequestPayload } from './types';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const fullName = process.env.EXPO_PUBLIC_FULL_NAME;
const phoneNumber = process.env.EXPO_PUBLIC_PHONE_NUMBER;
const email = process.env.EXPO_PUBLIC_EMAIL;

if (!baseUrl || !fullName || !phoneNumber || !email) {
    throw new Error('Some of the env variables were not set');
}

export const CAMPINGS: Camping[] = [
    {
        name: 'Переволока',
        text: 'Переволока - (6) мест',
        value: '43',
        capacity: 6,
        url: `${baseUrl}`,
        image: require('../assets/one.jpg'),
    },
    {
        name: 'Купальская ночь',
        text: 'Купальская ночь - (8) мест',
        value: '128',
        capacity: 8,
        url: `${baseUrl}`,
        image: require('../assets/two.jpg'),
    },
    {
        name: 'Хуторок',
        text: 'Хуторок - (8) мест',
        value: '44',
        capacity: 8,
        url: `${baseUrl}`,
        image: require('../assets/three.jpeg'),
    },
];

export const PAYLOAD: Omit<
    RequestPayload,
    'selectedCamping' | 'startDate' | 'endDate'
> = {
    isAgree: true,
    fullName,
    phoneNumber,
    email,
    numberOfAdult: '8',
    numberOfChildren: '0',
    tenantId: null,
    notes: '',
    source: null,
};

export const INTERVAL = 1000;
export const LOG_ITEM_HEIGHT = 300;
export const MAX_LOG_LENGTH = 500;
