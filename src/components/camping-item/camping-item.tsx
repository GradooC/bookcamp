import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { usePolling } from '../../hooks/use-polling';
import { Camping, Status } from '../../types';
import { COLOR, FONT, SPACE } from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

export type CampingItemProps = {
    item: Camping;
    isRunning: boolean;
};

function getColors(status: Status, isRunning: boolean) {
    if (!isRunning) return [COLOR.SLATE[500], COLOR.SLATE[400]];

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
        <LinearGradient colors={colors} start={[0, 0]} style={styles.container}>
            <View style={styles.nameBlock}>
                <Text style={styles.text}>{item.name}</Text>
            </View>
            <LinearGradient
                colors={[COLOR.ZINC[950], 'transparent']}
                start={[0, 0]}
                end={[0.15, 0]}
                style={styles.imageBlock}
            >
                <ImageBackground source={item.image} style={styles.image} />
            </LinearGradient>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        padding: 3,
        borderRadius: 20 + 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
    },
    nameBlock: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: COLOR.ZINC[950],
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingLeft: SPACE[5],
    },
    text: { color: 'white', fontSize: FONT.SIZE[20] },
    imageBlock: {
        flex: 1.8,
        overflow: 'hidden',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
});
