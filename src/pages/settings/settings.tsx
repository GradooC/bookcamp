import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export type SettingsProps = {};

export function Settings({}: SettingsProps) {
    return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>Settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
