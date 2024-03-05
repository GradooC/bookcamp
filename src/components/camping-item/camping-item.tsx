import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { usePolling } from '../../hooks/use-polling';
import { AppStatus, Camping, CampingItemStatus } from '../../types';
import { COLOR, FONT, SPACE } from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppState } from '../../providers/app-state-provider';

export type CampingItemProps = {
    item: Camping;
};

function getColors(campingItemStatus: CampingItemStatus, appStatus: AppStatus) {
    if (appStatus !== AppStatus.RUNNING)
        return [COLOR.SLATE[500], COLOR.SLATE[400]];

    const colorMap = {
        [CampingItemStatus.IN_PROGRESS]: [COLOR.ORANGE[400], COLOR.RED[400]],
        [CampingItemStatus.BOOKED]: [COLOR.GREEN[400], COLOR.EMERALD[400]],
    };

    return colorMap[campingItemStatus];
}

export function CampingItem({ item }: CampingItemProps) {
    const { campingItemStatus } = usePolling(item);
    const { appStatus } = useAppState();

    const colors = getColors(campingItemStatus, appStatus);

    return (
        <LinearGradient colors={colors} start={[0, 0]} style={styles.container}>
            <View style={styles.nameBlock}>
                <Text style={styles.text}>{item.name}</Text>
            </View>
            <LinearGradient
                colors={[COLOR.ZINC[950], 'transparent']}
                start={[0, 0]}
                end={[0.2, 0.15]}
                locations={[0.5, 1]}
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
        flex: 3.1,
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
