import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLOR, SPACE } from '../../../styles';
import { useNavigation } from '@react-navigation/native';

export type MainHeaderRightProps = {};

export function MainHeaderRight({}: MainHeaderRightProps) {
    const navigation = useNavigation();

    const handleOnPressList = () => {
        navigation.navigate('Logs');
    };

    const handleOnPressSettings = () => {
        navigation.navigate('Settings');
    };

    return (
        <View style={styles.container}>
            <Ionicons
                style={styles.title}
                name="list"
                size={30}
                onPress={handleOnPressList}
            />
            <Ionicons
                style={styles.title}
                name="settings"
                size={30}
                onPress={handleOnPressSettings}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { display: 'flex', flexDirection: 'row', gap: SPACE['2.5'] },
    title: {
        color: COLOR.SLATE[300],
    },
});
