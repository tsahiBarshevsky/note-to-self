import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Insertion from './components/Insertion/Insertion';
import Editing from './components/Editing/Editing';
import Search from './components/Search/Search';

import { I18nManager } from 'react-native';
I18nManager.allowRTL(false);

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Insertion" component={Insertion} />
                        <Stack.Screen name="Editing" component={Editing} />
                        <Stack.Screen name="Search" component={Search} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ApplicationProvider>
        </>
    )
}
