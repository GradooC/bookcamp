import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { usePolling } from '../../hooks/use-polling';
import { Camping, Status } from '../../types';

export type CampingItemProps = {
    item: Camping;
    isRunning: boolean;
};

function getColor(status: Status, isRunning: boolean) {
    if (!isRunning) return 'gray';

    const colorMap = {
        [Status.IN_PROGRESS]: 'coral',
        [Status.BOOKED]: 'lightgreen',
    };

    return colorMap[status];
}

export function CampingItem({ item, isRunning }: CampingItemProps) {
    const { isPolling, status } = usePolling(item, isRunning);

    const animating = isRunning && isPolling;
    const backgroundColor = getColor(status, isRunning);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.text}>{item.name}</Text>
            <ActivityIndicator
                size="small"
                color="white"
                animating={animating}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
