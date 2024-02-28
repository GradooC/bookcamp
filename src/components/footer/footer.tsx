import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type FooterProps = {
    isRunning: boolean;
    onStartToggle: VoidFunction;
};

export function Footer({ isRunning, onStartToggle }: FooterProps) {
    const buttonText = isRunning ? 'stop' : 'start';

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={onStartToggle}>
                <Text style={styles.text}>{buttonText}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    text: {
        fontSize: 24,
        color: 'white',
        textTransform: 'uppercase',
    },
});
