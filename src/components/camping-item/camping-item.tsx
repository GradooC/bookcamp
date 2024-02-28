import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { usePolling } from '../../hooks/use-polling';
import { Camping } from '../../types';

export type CampingItemProps = {
    item: Camping;
    isRunning: boolean;
};

export function CampingItem({ item, isRunning }: CampingItemProps) {
    usePolling(item, isRunning);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{item.name}</Text>
            <ActivityIndicator size="small" color="white" animating={isRunning} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'coral',
        padding: 15,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
});
