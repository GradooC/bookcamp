import { Camping, RequestPayload } from './types';

export const CAMPINGS: Camping[] = [
    {
        name: 'Переволока',
        text: 'Переволока - (6) мест',
        value: '43',
        capacity: 6,
        url: 'https://hgw55hwl-3000.euw.devtunnels.ms/route1', // https://admin3.zapytai.by/widget/createBooking
        image: require('../assets/one.jpg'),
    },
    {
        name: 'Купальская ночь',
        text: 'Купальская ночь - (8) мест',
        value: '128',
        capacity: 8,
        url: 'https://hgw55hwl-3000.euw.devtunnels.ms/route2', // https://admin3.zapytai.by/widget/createBooking
        image: require('../assets/two.jpg'),
    },
    {
        name: 'Хуторок',
        text: 'Хуторок - (8) мест',
        value: '44',
        capacity: 8,
        url: 'https://hgw55hwl-3000.euw.devtunnels.ms/route3', // https://admin3.zapytai.by/widget/createBooking
        image: require('../assets/three.jpeg'),
    },
];

export const PAYLOAD: Omit<
    RequestPayload,
    'selectedCamping' | 'startDate' | 'endDate'
> = {
    isAgree: true,
    fullName: 'Питер Пен',
    phoneNumber: '+375 29 761 65 46',
    email: 'test@mail.ru',
    numberOfAdult: '8',
    numberOfChildren: '0',
    tenantId: null,
    notes: '',
    source: null,
};

export const INTERVAL = 1000;
