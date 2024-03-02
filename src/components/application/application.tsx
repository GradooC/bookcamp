import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { CampingList } from '../camping-list';
import { Footer } from '../footer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { COLOR, SPACE } from '../../styles';

export function Application() {
    const [isRunning, setIsRunning] = useState(false);

    const handleStartToggle = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <CampingList isRunning={isRunning} />
            <Footer isRunning={isRunning} onStartToggle={handleStartToggle} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACE['2.5'],
        backgroundColor: COLOR.ZINC[950],
    },
});
