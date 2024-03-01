import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR, SPACE } from '../../styles';

export type FooterProps = {
    isRunning: boolean;
    onStartToggle: VoidFunction;
};

export function Footer({ isRunning, onStartToggle }: FooterProps) {
    const buttonText = isRunning ? 'stop' : 'start';

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.gradient}
                start={[0, 0]}
                colors={[COLOR.CYAN[500], COLOR.BLUE[500]]}
            >
                <Pressable style={styles.button} onPress={onStartToggle}>
                    <Text style={styles.text}>{buttonText}</Text>
                </Pressable>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: SPACE['2.5'],
    },
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
