import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { usePolling } from '../../hooks/use-polling';
import { AppStatus, Camping, CampingItemStatus } from '../../types';
import { COLOR, FONT, SPACE } from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppState } from '../../providers/app-state-provider';
import { BlurView } from 'expo-blur';
import Animated, {
    FadeInRight,
    FadeOutRight,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { INTERVAL } from '../../config';

const START_LEFT = -50;
const FINAL_LEFT = 100;

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

    const left = useSharedValue(START_LEFT);
    const animatedStyles = useAnimatedStyle(() => ({
        left: `${left.value}%`,
    }));

    useEffect(() => {
        const shouldAnimate =
            appStatus === AppStatus.RUNNING &&
            campingItemStatus === CampingItemStatus.IN_PROGRESS;

        if (shouldAnimate) {
            left.value = withRepeat(
                withTiming(FINAL_LEFT, { duration: INTERVAL }),
                -1
            );
        } else {
            cancelAnimation(left);
            left.value = START_LEFT;
        }
    }, [appStatus, campingItemStatus]);

    const colors = getColors(campingItemStatus, appStatus);
    const { statusText, statusColor } = statusMap[campingItemStatus];
    const isFinished =
        appStatus === AppStatus.RUNNING &&
        (campingItemStatus === CampingItemStatus.OCCUPIED ||
            campingItemStatus === CampingItemStatus.BOOKED);

    return (
        <LinearGradient colors={colors} start={[0, 0]} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.nameBlock}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <ImageBackground source={item.image} style={styles.image}>
                    {isFinished && (
                        <AnimatedBlurView
                            style={styles.blur}
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
            </View>
            <Animated.View style={[styles.activityIndicator, animatedStyles]} />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        padding: 3,
        borderRadius: 20 + 3,
        overflow: 'hidden',
    },
    wrapper: { display: 'flex', flexDirection: 'row', height: '100%' },
    nameBlock: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: COLOR.ZINC[950],
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingLeft: SPACE[5],
    },
    name: { color: COLOR.SLATE[300], fontSize: FONT.SIZE[20] },
    blur: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
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
    activityIndicator: {
        height: 3,
        width: '50%',
        backgroundColor: COLOR.BLUE[100],
        position: 'relative',
    },
    image: {
        flex: 2.9,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
    },
});
