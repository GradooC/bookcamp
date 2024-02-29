import { registerTaskAsync, unregisterTaskAsync } from 'expo-background-fetch';
import { useEffect } from 'react';

export function useBackgroundFetch(taskName: string) {
    useEffect(() => {
        async function register() {
            return await registerTaskAsync(taskName, {
                minimumInterval: 1, // in seconds
                stopOnTerminate: false, // android only,
                startOnBoot: true, // android only
            });
        }

        function unregister() {
            unregisterTaskAsync(taskName);
        }

        register();

        return unregister;
    }, []);
}
