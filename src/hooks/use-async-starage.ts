import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from '../constants';

type StorageItems = Partial<Record<Storage, string | null>>;

export function useAsyncStorage(keys: readonly Storage[]) {
    const [storageItems, setStorageItems] = useState<StorageItems>({});

    useEffect(() => {
        async function getValue() {
            const entries = await AsyncStorage.multiGet(keys);
            const itemsMap = Object.fromEntries(entries);
            setStorageItems(itemsMap);
        }

        getValue();
    }, [keys]);

    async function setItems(entries: [key: string, value: string][]) {
        await AsyncStorage.multiSet(entries);

        const newValues = Object.fromEntries(entries);
        setStorageItems((prevValues) => ({
            ...prevValues,
            ...newValues,
        }));
    }

    return { storageItems, setItems };
}
