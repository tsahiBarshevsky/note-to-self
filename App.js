import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';


export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Hello</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 20 : null
    }
})