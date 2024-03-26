import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { COLOR, SPACE } from '../../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../../pages/main';
import { Settings } from '../../pages/settings';
import { AppStateProvider } from '../../providers/app-state-provider';
import { RootStackParamList } from '../../types';
import { setNotificationHandler } from 'expo-notifications';
import { NotificationsProvider } from '../../providers/notifications-provider';
import { Logs } from '../../pages/logs';
import { LogProvider } from '../../providers/log-provider';
import { MainHeaderRight } from './main-header-right';

const Stack = createNativeStackNavigator<RootStackParamList>();

setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export function Application() {
    return (
        <>
            <StatusBar style="dark" />
            <AppStateProvider>
                <LogProvider>
                    <NotificationsProvider>
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
                                    options={{
                                        headerRight: MainHeaderRight,
                                    }}
                                    component={Main}
                                />
                                <Stack.Screen
                                    name="Settings"
                                    component={Settings}
                                />
                                <Stack.Screen name="Logs" component={Logs} />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </NotificationsProvider>
                </LogProvider>
            </AppStateProvider>
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
});
