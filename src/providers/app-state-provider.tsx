import {
    Dispatch,
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '../constants';

type CustomKeyValuePair = readonly [key: StorageKey, value: string | null][];

export enum AppActionType {
    SET_PROPERTIES = 'setProperties',
}

type AppState = {
    startDate?: string;
    endDate?: string;
};

type AppAction = {
    type: AppActionType.SET_PROPERTIES;
    payload: CustomKeyValuePair;
};

const AppStateContext = createContext<AppState | null>(null);

const AppDispatchContext = createContext<Dispatch<AppAction> | null>(null);

const initialState: AppState = {};

function reducer(state: AppState, action: AppAction) {
    switch (action.type) {
        case AppActionType.SET_PROPERTIES:
            const properties = Object.fromEntries(action.payload);
            return { ...state, ...properties };

        default:
            return initialState;
    }
}

export function AppStateProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getStorageItems() {
            const keys = await AsyncStorage.getAllKeys();
            const entries = (await AsyncStorage.multiGet(
                keys
            )) as CustomKeyValuePair;

            dispatch({ type: AppActionType.SET_PROPERTIES, payload: entries });
        }

        getStorageItems();
    }, []);

    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state}>
                {children}
            </AppStateContext.Provider>
        </AppDispatchContext.Provider>
    );
}

export function useAppState() {
    const appStateContext = useContext(AppStateContext);

    if (!appStateContext) {
        throw new Error(
            'useAppState hook should be used inside the AppStateProvider'
        );
    }

    return appStateContext;
}

export function useAppDispatch() {
    const appDispatchContext = useContext(AppDispatchContext);

    if (!appDispatchContext) {
        throw new Error(
            'useAppState hook should be used inside the AppStateProvider'
        );
    }

    return appDispatchContext;
}
