import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export type SettingsProps = {};

export function Settings({}: SettingsProps) {
    const handleDatePick = () => {
        DateTimePickerAndroid.open({
            value: new Date(),
            display: 'clock',
        });
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>Settings</Text>
            <Button title="Date" onPress={handleDatePick}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
