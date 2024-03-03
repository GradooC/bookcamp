import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { COLOR, SPACE } from '../../styles';
import { NavigationContainer } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Main } from '../../pages/main';
import { Settings } from '../../pages/settings';

const Stack = createNativeStackNavigator();

const test: NativeStackNavigationOptions = {};

export function Application() {
    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        statusBarColor: COLOR.SLATE[800],
                        headerTintColor: COLOR.SLATE[300],
                        headerStyle: styles.header,
                        contentStyle: styles.content,
                    }}
                >
                    <Stack.Screen
                        name="Main"
                        options={({ navigation }) => ({
                            headerRight: () => (
                                <Ionicons
                                    style={styles.title}
                                    name="settings"
                                    size={30}
                                    onPress={() => {
                                        navigation.navigate('Settings');
                                    }}
                                />
                            ),
                        })}
                        component={Main}
                    />
                    <Stack.Screen name="Settings" component={Settings} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: SPACE['2.5'],
        backgroundColor: COLOR.ZINC[950],
    },
    header: {
        backgroundColor: COLOR.SLATE[800],
    },
    title: {
        color: COLOR.SLATE[300],
    },
});
