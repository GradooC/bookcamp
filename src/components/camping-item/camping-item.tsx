import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Pressable,
} from 'react-native';
import { usePolling } from '../../hooks/use-polling';
import { AppStatus, Camping, CampingItemStatus } from '../../types';
import { COLOR, FONT, SPACE } from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppState } from '../../providers/app-state-provider';
import { BlurView } from 'expo-blur';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

function getColors(campingItemStatus: CampingItemStatus, appStatus: AppStatus) {
    if (appStatus !== AppStatus.RUNNING)
        return [COLOR.SLATE[500], COLOR.SLATE[400]];

    const colorMap = {
        [CampingItemStatus.OCCUPIED]: [COLOR.ORANGE[400], COLOR.RED[400]],
        [CampingItemStatus.BOOKED]: [COLOR.GREEN[400], COLOR.EMERALD[400]],
        [CampingItemStatus.IN_PROGRESS]: [COLOR.CYAN[500], COLOR.BLUE[500]],
    };

    return colorMap[campingItemStatus];
}

const statusMap = {
    [CampingItemStatus.OCCUPIED]: {
        statusText: 'Занята',
        statusColor: COLOR.RED[400],
    },
    [CampingItemStatus.BOOKED]: {
        statusText: 'Забронирована',
        statusColor: COLOR.GREEN[400],
    },
    [CampingItemStatus.IN_PROGRESS]: {
        statusText: 'noop',
        statusColor: 'transparent',
    },
};

export type CampingItemProps = {
    item: Camping;
};

export function CampingItem({ item }: CampingItemProps) {
    const { campingItemStatus } = usePolling(item);
    const { appStatus } = useAppState();

    const colors = getColors(campingItemStatus, appStatus);

    const { statusText, statusColor } = statusMap[campingItemStatus];
    const isFinished =
        appStatus === AppStatus.RUNNING &&
        (campingItemStatus === CampingItemStatus.OCCUPIED ||
            campingItemStatus === CampingItemStatus.BOOKED);

    return (
        <Pressable>
            <LinearGradient
                colors={colors}
                start={[0, 0]}
                style={styles.container}
            >
                <View style={styles.nameBlock}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <ImageBackground source={item.image} style={styles.image}>
                    {isFinished && (
                        <AnimatedBlurView
                            style={styles.gradient}
                            intensity={30}
                            experimentalBlurMethod="dimezisBlurView"
                            entering={FadeInRight.duration(500)}
                            exiting={FadeOutRight.duration(500)}
                        >
                            <Text style={styles.statusText}>{statusText}</Text>
                            <View
                                style={[
                                    styles.statusIndicator,
                                    { backgroundColor: statusColor },
                                ]}
                            ></View>
                        </AnimatedBlurView>
                    )}
                </ImageBackground>
            </LinearGradient>
        </Pressable>
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
    name: { color: COLOR.SLATE[300], fontSize: FONT.SIZE[20] },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    statusText: {
        color: COLOR.SLATE[900],
        fontSize: FONT.SIZE[20],
    },
    statusIndicator: {
        height: 15,
        width: 15,
        borderRadius: 15,
    },
    image: {
        flex: 2.9,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
    },
});
