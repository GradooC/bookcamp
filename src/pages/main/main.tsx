import React, { useContext, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

import { CampingList } from '../../components/camping-list';
import { Footer } from '../../components/footer';

export type MainProps = {};

export function Main({}: MainProps) {
    const [isRunning, setIsRunning] = useState(false);

    const handleStartToggle = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    return (
        <>
            <CampingList isRunning={isRunning} />
            <Footer isRunning={isRunning} onStartToggle={handleStartToggle} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
