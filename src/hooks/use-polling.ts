import { useEffect, useState } from 'react';
import { Camping } from '../types';

const INTERVAL = 500;

// export function usePolling({ url }: Camping) {
//     const [isPolling, setIsPolling] = useState(true);

//     useEffect(() => {
//         let shouldContinue = true;
//         const options = {
//             body: '{ test: 1 }',
//             method: 'POST',
//         };

//         async function polling() {
//             try {
//                 let body;
//                 do {
//                     const response = await fetch(url, options);
//                     body = await response.json();

//                     await delay();
//                 } while (!body.isSuccessful && shouldContinue);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setIsPolling(false);
//             }
//         }

//         polling();

//         return function cleanUp() {
//             shouldContinue = false;
//         };
//     }, [url]);

//     return { isPolling };
// }

// function delay(time: number = 5000) {
//     return new Promise((resolve) => setTimeout(resolve, time));
// }

export function usePolling({ url }: Camping, isRunning: boolean) {
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning) {
            fetchData();

            intervalId = setInterval(fetchData, INTERVAL);
        }

        async function fetchData() {
            try {
                const response = await fetch(url, { method: 'POST' });
                const body = await response.json();

                if (body.isSuccessful) clearInterval(intervalId);
            } catch (error) {
                console.error(error);
            }
        }

        return () => {
            console.log('unmount');
            clearInterval(intervalId);
        };
    });
}
