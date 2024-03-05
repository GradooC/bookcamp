import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLOR, FONT, SPACE } from '../../styles';
import { useAppState } from '../../providers/app-state-provider';
import { DatePicker } from '../../components/date-picker';

export type SettingsProps = {};

export function Settings({}: SettingsProps) {
    const { startDate, endDate } = useAppState();

    return (
        <View style={styles.container}>
            <View style={styles.dateBlock}>
                <View style={styles.title}>
                    <Text style={styles.text}>Даты поездки:</Text>
                </View>
                <DatePicker startDate={startDate} endDate={endDate} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    dateBlock: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: SPACE['2.5'],
    },
    title: {
        gap: SPACE['2.5'],
        backgroundColor: COLOR.SLATE[800],
        padding: SPACE['2.5'],
        borderRadius: 15,
    },
    text: {
        fontSize: FONT.SIZE[20],
        color: COLOR.SLATE[300],
    },
});
