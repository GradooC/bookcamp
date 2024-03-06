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
import { AppActionType, AppStatus, DateRange } from '../types';
import dayjs from 'dayjs';

type SyncStatePayload = Record<StorageKey, string>;

type AppState = {
    startDate?: string;
    endDate?: string;
    appStatus: AppStatus;
};

type AppAction =
    | {
          type: AppActionType.SYNC_STATE;
          payload: SyncStatePayload;
      }
    | {
          type: AppActionType.SET_DATE_RANGE;
          payload: DateRange;
      }
    | {
          type: AppActionType.SET_STATUS;
          payload: AppStatus;
      };

const AppStateContext = createContext<AppState | null>(null);

const AppDispatchContext = createContext<Dispatch<AppAction> | null>(null);

const initialState: AppState = {
    appStatus: AppStatus.NEED_DATES,
};

function handleSyncState(
    prevState: AppState,
    payload: SyncStatePayload
): AppState {
    const isDatesSet = Boolean(payload.startDate) && Boolean(payload.endDate);
    const appStatus = isDatesSet ? AppStatus.PAUSED : AppStatus.NEED_DATES;

    return { ...prevState, ...payload, appStatus };
}

function handleSetDateRange(prevState: AppState, payload: DateRange): AppState {
    const isDatesSet = Boolean(payload.startDate) && Boolean(payload.endDate);
    const appStatus = isDatesSet ? AppStatus.PAUSED : AppStatus.NEED_DATES;

    const normalizedStartDate = dayjs(payload.startDate)
        .startOf('day')
        .toISOString();

    const normalizedEndDate = dayjs(payload.endDate)
        .startOf('day')
        .toISOString();

    return {
        ...prevState,
        appStatus,
        startDate: normalizedStartDate,
        endDate: normalizedEndDate,
    };
}

function handleSetStatus(prevState: AppState, payload: AppStatus): AppState {
    return { ...prevState, appStatus: payload };
}

function reducer(prevState: AppState, { type, payload }: AppAction): AppState {
    switch (type) {
        case AppActionType.SYNC_STATE:
            return handleSyncState(prevState, payload);
        case AppActionType.SET_DATE_RANGE:
            return handleSetDateRange(prevState, payload);
        case AppActionType.SET_STATUS:
            return handleSetStatus(prevState, payload);
        default:
            const exhaustiveCheck: never = type;
            throw new Error(`Unhandled action type: ${exhaustiveCheck}`);
    }
}

export function AppStateProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getStorageItems() {
            const keys = await AsyncStorage.getAllKeys();
            const entries = await AsyncStorage.multiGet(keys);
            const payload = Object.fromEntries(entries) as SyncStatePayload;

            dispatch({ type: AppActionType.SYNC_STATE, payload });
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
