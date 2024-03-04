import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FONT, SPACE } from '../../styles';
import { useAsyncStorage } from '../../hooks/use-async-starage';
import { Storage } from '../../constants';
import { getNormalizedDateString } from '../../utils/get-normalized-date-string';

export type SettingsProps = {};

const STORAGE_KEYS = [Storage.START_DATE, Storage.END_DATE];

export function Settings({}: SettingsProps) {
    const { storageItems, setItems } = useAsyncStorage(STORAGE_KEYS);
    const { startDate, endDate } = storageItems;

    const handleDatePick = (key: Storage) => () => {
        DateTimePickerAndroid.open({
            mode: 'date',
            value: new Date(),
            display: 'spinner',
            onChange: async (event, date) => {
                if (event.type !== 'set' || !date) return;

                const newDate = getNormalizedDateString(date);
                await setItems([[key, newDate]]);
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
                    onPress={handleDatePick(Storage.START_DATE)}
                    name="pencil-sharp"
                    size={20}
                />
            </View>
            <View style={styles.dateBlock}>
                <Text style={styles.title}>End date:</Text>
                <Text style={styles.value}>{endDate}</Text>
                <Ionicons
                    style={styles.icon}
                    onPress={handleDatePick(Storage.END_DATE)}
                    name="pencil-sharp"
                    size={20}
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
