import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FONT, SPACE } from '../../styles';
import { StorageKey } from '../../constants';
import { getNormalizedDateString } from '../../utils/get-normalized-date-string';
import {
    AppActionType,
    useAppDispatch,
    useAppState,
} from '../../providers/app-state-provider';

export type SettingsProps = {};

export function Settings({}: SettingsProps) {
    const { startDate, endDate } = useAppState();
    const dispatch = useAppDispatch();

    const handleDatePick = (key: StorageKey) => () => {
        DateTimePickerAndroid.open({
            mode: 'date',
            value: new Date(),
            display: 'spinner',
            onChange: (event, date) => {
                if (event.type !== 'set' || !date) return;

                const newDate = getNormalizedDateString(date);
                dispatch({
                    type: AppActionType.SET_PROPERTIES,
                    payload: [[key, newDate]],
                });
            },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.dateBlock}>
                <Text style={styles.title}>Start date:</Text>
                <Text style={styles.value}>{startDate}</Text>
                <Ionicons
                    style={styles.icon}
                    onPress={handleDatePick(StorageKey.START_DATE)}
                    name="pencil-sharp"
                    size={20}
                />
            </View>
            <View style={styles.dateBlock}>
                <Text style={styles.title}>End date:</Text>
                <Text style={styles.value}>{endDate}</Text>
                <Ionicons
                    style={styles.icon}
                    onPress={handleDatePick(StorageKey.END_DATE)}
                    name="pencil-sharp"
                    size={FONT.SIZE[20]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: SPACE['2.5'],
    },
    dateBlock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACE['2.5'],
    },
    title: {
        fontSize: FONT.SIZE[20],
        color: 'white',
    },
    value: {
        fontSize: FONT.SIZE[20],
        color: 'white',
    },
    icon: {
        color: 'white',
        marginLeft: 'auto',
    },
});
