import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLOR, SPACE } from '../../styles';
import { AppStatus } from '../../types';
import {
    AppActionType,
    useAppDispatch,
    useAppState,
} from '../../providers/app-state-provider';
import { useNavigation } from '@react-navigation/native';

export type FooterProps = {};

export function Footer({}: FooterProps) {
    const { appStatus } = useAppState();
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const handleStart = () => {
        dispatch({
            type: AppActionType.SET_STATUS,
            payload: AppStatus.RUNNING,
        });
    };

    const handlePause = () => {
        dispatch({
            type: AppActionType.SET_STATUS,
            payload: AppStatus.PAUSED,
        });
    };

    const handleSetDates = () => {
        navigation.navigate('Settings');
    };

    const appStatusMap = {
        [AppStatus.NEED_DATES]: {
            buttonTitle: 'set dates',
            handler: handleSetDates,
        },
        [AppStatus.RUNNING]: {
            buttonTitle: 'pause',
            handler: handlePause,
        },
        [AppStatus.PAUSED]: {
            buttonTitle: 'start',
            handler: handleStart,
        },
    };

    const { buttonTitle, handler } = appStatusMap[appStatus];

    return (
        <LinearGradient
            style={styles.gradient}
            start={[0, 0]}
            colors={[COLOR.CYAN[500], COLOR.BLUE[500]]}
        >
            <Pressable style={styles.button} onPress={handler}>
                <Text style={styles.text}>{buttonTitle}</Text>
            </Pressable>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: SPACE[4],
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        overflow: 'hidden',
        borderRadius: SPACE[5],
    },
    text: {
        fontSize: 24,
        color: 'white',
        textTransform: 'uppercase',
    },
});
