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
import { DateRange } from '../types';
import dayjs from 'dayjs';

type SetPropertiesPayload = Record<StorageKey, string>;

export enum AppActionType {
    SET_PROPERTIES = 'setProperties',
    SET_DATE_RANGE = 'setDateRange',
}

type AppState = {
    startDate: string;
    endDate: string;
};

type AppAction =
    | {
          type: AppActionType.SET_PROPERTIES;
          payload: SetPropertiesPayload;
      }
    | {
          type: AppActionType.SET_DATE_RANGE;
          payload: DateRange;
      };

const DEFAULT_DATE = '2000-01-01T21:00:00.000Z';

const AppStateContext = createContext<AppState | null>(null);

const AppDispatchContext = createContext<Dispatch<AppAction> | null>(null);

const initialState: AppState = {
    startDate: DEFAULT_DATE,
    endDate: DEFAULT_DATE,
};

function reducer(prevState: AppState, { type, payload }: AppAction): AppState {
    switch (type) {
        case AppActionType.SET_PROPERTIES:
            return { ...prevState, ...payload };
        case AppActionType.SET_DATE_RANGE:
            const normalizedStartDate = dayjs(payload.startDate)
                .startOf('day')
                .toISOString();
            const normalizedEndDate = dayjs(payload.endDate)
                .startOf('day')
                .toISOString();
            return {
                ...prevState,
                startDate: normalizedStartDate,
                endDate: normalizedEndDate,
            };
        default:
            return initialState;
    }
}

export function AppStateProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getStorageItems() {
            const keys = await AsyncStorage.getAllKeys();
            const entries = await AsyncStorage.multiGet(keys);
            const payload = Object.fromEntries(entries) as SetPropertiesPayload;

            dispatch({ type: AppActionType.SET_PROPERTIES, payload });
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
            'useAppDispatch hook should be used inside the AppStateProvider'
        );
    }

    return appDispatchContext;
}
