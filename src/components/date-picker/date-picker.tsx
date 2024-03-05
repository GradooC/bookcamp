import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { RangeChange } from 'react-native-ui-datepicker/src/types';
import { COLOR } from '../../styles';

import {
    AppActionType,
    useAppDispatch,
} from '../../providers/app-state-provider';
import { DateRange } from '../../types';

export type DatePickerModalProps = {
    startDate: string;
    endDate: string;
};

export function DatePicker({ startDate, endDate }: DatePickerModalProps) {
    const [range, setRange] = useState<DateRange>(() => ({
        startDate: dayjs(startDate),
        endDate: dayjs(endDate),
    }));
    const dispatch = useAppDispatch();

    const handleDateChange: RangeChange = (range) => {
        setRange(range);

        dispatch({
            type: AppActionType.SET_DATE_RANGE,
            payload: range,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <DateTimePicker
                    mode="range"
                    startDate={range.startDate}
                    endDate={range.endDate}
                    selectedItemColor={COLOR.BLUE[500]}
                    headerButtonColor={COLOR.SLATE[300]}
                    headerTextStyle={styles.headerTextStyle}
                    weekDaysTextStyle={styles.weekDaysTextStyle}
                    calendarTextStyle={styles.calendarTextStyle}
                    weekDaysContainerStyle={styles.weekDaysContainerStyle}
                    monthContainerStyle={styles.monthContainerStyle}
                    yearContainerStyle={styles.yearContainerStyle}
                    onChange={handleDateChange}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: 330,
        padding: 15,
        borderRadius: 15,
        backgroundColor: COLOR.SLATE[800],
    },
    headerTextStyle: { color: COLOR.SLATE[300] },
    weekDaysTextStyle: { color: COLOR.SLATE[300] },
    calendarTextStyle: { color: COLOR.SLATE[300] },
    weekDaysContainerStyle: { borderColor: COLOR.SLATE[950] },
    monthContainerStyle: { backgroundColor: COLOR.SLATE[800] },
    yearContainerStyle: { backgroundColor: COLOR.SLATE[800] },
});
