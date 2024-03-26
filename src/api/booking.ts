import { Camping, RequestPayload } from '../types';

type BookingParams = {
    payload: RequestPayload;
} & Pick<Camping, 'url'>;

export async function booking({ payload, url }: BookingParams) {
    const body = JSON.stringify(payload);

    const response = await fetch(url, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}
