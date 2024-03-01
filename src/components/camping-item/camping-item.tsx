import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { usePolling } from '../../hooks/use-polling';
import { Camping, Status } from '../../types';
import { COLOR, SPACE } from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

export type CampingItemProps = {
    item: Camping;
    isRunning: boolean;
};

function getColors(status: Status, isRunning: boolean) {
    if (!isRunning) return [ COLOR.SLATE[500], COLOR.SLATE[400]];

    const colorMap = {
        [Status.IN_PROGRESS]: [COLOR.ORANGE[400], COLOR.RED[400]],
        [Status.BOOKED]: [COLOR.GREEN[400], COLOR.EMERALD[400]],
    };

    return colorMap[status];
}

export function CampingItem({ item, isRunning }: CampingItemProps) {
    const { isPolling, status } = usePolling(item, isRunning);

    const animating = isRunning && isPolling;
    const colors = getColors(status, isRunning);

    return (
        <LinearGradient
            style={styles.container}
            colors={colors}
            start={[0, 0]}
        >
            <Text style={styles.text}>{item.name}</Text>
            <ActivityIndicator
                size="small"
                color="white"
                animating={animating}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: SPACE[4],
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
