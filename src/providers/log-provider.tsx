import {
    Dispatch,
    PropsWithChildren,
    createContext,
    useContext,
    useReducer,
} from 'react';
import { Log, LogActionType } from '../types';
import { MAX_LOG_LENGTH } from '../config';

const LogContext = createContext<Log[] | null>(null);
const LogDispatchContext = createContext<Dispatch<LogAction> | null>(null);

const initLogs: Log[] = [];

type LogAction = {
    type: LogActionType.ADD_ITEM;
    payload: Omit<Log, 'id'>;
};

function handleAddLogItem(prevLogs: Log[], payload: Omit<Log, 'id'>): Log[] {
    let currentLogs = prevLogs;

    if (currentLogs.length >= MAX_LOG_LENGTH) {
        currentLogs = prevLogs.slice(-100);
    }

    const lastItem = currentLogs.at(-1);
    const lastItemId = lastItem?.id || 0;
    const id = lastItemId + 1;
    const item = { ...payload, id };

    return [...currentLogs, item];
}

function logsReducer(prevLogs: Log[], action: LogAction): Log[] {
    const { type, payload } = action;
    switch (type) {
        case LogActionType.ADD_ITEM:
            return handleAddLogItem(prevLogs, payload);

        default:
            const exhaustiveCheck: never = type;
            throw new Error(`Unhandled action type: ${exhaustiveCheck}`);
    }
}

export function LogProvider({ children }: PropsWithChildren) {
    const [logs, dispatch] = useReducer(logsReducer, initLogs);

    return (
        <LogContext.Provider value={logs}>
            <LogDispatchContext.Provider value={dispatch}>
                {children}
            </LogDispatchContext.Provider>
        </LogContext.Provider>
    );
}

export function useLogList() {
    const logs = useContext(LogContext);

    if (!logs) {
        throw new Error(
            'useLogList hook should be used inside the LogProvider'
        );
    }

    return logs;
}

export function useLogDispatch() {
    const dispatch = useContext(LogDispatchContext);

    if (!dispatch) {
        throw new Error(
            'useLogDispatch hook should be used inside the LogProvider'
        );
    }

    return dispatch;
}
