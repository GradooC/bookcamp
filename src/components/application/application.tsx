import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { CampingList } from '../camping-list';
import { Footer } from '../footer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { defineTask } from 'expo-task-manager';
import { BackgroundFetchResult } from 'expo-background-fetch';
import { useBackgroundFetch } from '../../hooks/use-background-fetch';

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = Date.now();

    console.log(
        `Got background fetch call at date: ${new Date(now).toISOString()}`
    );

    // Be sure to return the successful result type!
    return BackgroundFetchResult.NewData;
});

export type ApplicationProps = {};

export function Application({}: ApplicationProps) {
    const [isRunning, setIsRunning] = useState(false);
    useBackgroundFetch(BACKGROUND_FETCH_TASK);

    const handleStartToggle = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <CampingList isRunning={isRunning} />
            <Footer isRunning={isRunning} onStartToggle={handleStartToggle} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
