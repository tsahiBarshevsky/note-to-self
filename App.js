import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityPack } from './materialcommunity-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { I18nManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Insertion from './components/Insertion/Insertion';
import Editing from './components/Editing/Editing';
import Search from './components/Search/Search';

const Stack = createNativeStackNavigator();
I18nManager.allowRTL(false);

export default function App() {
    return (
        <>
            <StatusBar style='light' />
            <IconRegistry icons={[EvaIconsPack, MaterialCommunityPack]} />
            <ApplicationProvider {...eva} theme={eva.dark}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Insertion" component={Insertion} />
                        <Stack.Screen name="Editing" component={Editing} />
                        <Stack.Screen name="Search" component={Search} />
                    </Stack.Navigator>
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </NavigationContainer>
            </ApplicationProvider>
        </>
    )
}
