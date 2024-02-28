import React, { useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { CAMPINGS } from '../../config';
import { CampingItem } from '../camping-item';

export type CampingListProps = {
    isRunning: boolean;
};

export function CampingList({ isRunning }: CampingListProps) {
    const [isVis, setIsVis] = useState(true);

    return (
        <>
            {isVis && (
                <FlatList
                    data={CAMPINGS}
                    contentContainerStyle={styles.container}
                    renderItem={({ item }) => (
                        <CampingItem item={item} isRunning={isRunning} />
                    )}
                />
            )}
            <Button title="hide" onPress={() => setIsVis(!isVis)}></Button>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        paddingHorizontal: 10,
    },
});
