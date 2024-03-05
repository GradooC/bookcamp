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

type SetPropertiesPayload = Record<StorageKey, string>;

type AppState = {
    startDate?: string;
    endDate?: string;
    appStatus: AppStatus;
};

type AppAction =
    | {
          type: AppActionType.SET_PROPERTIES;
          payload: SetPropertiesPayload;
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

function reducer(prevState: AppState, { type, payload }: AppAction): AppState {
    switch (type) {
        case AppActionType.SET_PROPERTIES:
            return { ...prevState, ...payload };
        case AppActionType.SET_DATE_RANGE:
            const isDatesSet =
                Boolean(payload.startDate) && Boolean(payload.endDate);
            const status = isDatesSet ? AppStatus.PAUSED : AppStatus.NEED_DATES;

            const normalizedStartDate = dayjs(payload.startDate)
                .startOf('day')
                .toISOString();

            const normalizedEndDate = dayjs(payload.endDate)
                .startOf('day')
                .toISOString();

            return {
                ...prevState,
                appStatus: status,
                startDate: normalizedStartDate,
                endDate: normalizedEndDate,
            };
        case AppActionType.SET_STATUS:
            return { ...prevState, appStatus: payload };
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
            const payload = Object.fromEntries(entries) as SetPropertiesPayload;

            if (
                payload[StorageKey.START_DATE] &&
                payload[StorageKey.END_DATE]
            ) {
                dispatch({
                    type: AppActionType.SET_STATUS,
                    payload: AppStatus.PAUSED,
                });
            }

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
