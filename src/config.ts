import { Camping } from './types';

export const CAMPINGS: Camping[] = [
    {
        name: 'Переволока',
        text: 'Переволока - (6) мест',
        value: '43',
        capacity: 6,
        url: 'http://10.0.2.2:3000/route1', // https://admin3.zapytai.by/widget/createBooking
    },
    {
        name: 'Купальская ночь',
        text: 'Купальская ночь - (8) мест',
        value: '128',
        capacity: 8,
        url: 'http://10.0.2.2:3000/route2', // https://admin3.zapytai.by/widget/createBooking
    },
    {
        name: 'Хуторок',
        text: 'Хуторок - (8) мест',
        value: '44',
        capacity: 8,
        url: 'http://10.0.2.2:3000/route3', // https://admin3.zapytai.by/widget/createBooking
    },
];
