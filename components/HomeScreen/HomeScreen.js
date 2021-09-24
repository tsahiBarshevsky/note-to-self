import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import { styles } from './HomeScreenStyles';

const PlusIcon = (props) => (
    <Icon name='plus' fill='#ffffff' {...props} />
);

const SearchIcon = (props) => (
    <Icon name='search' fill='#ffffff' {...props} />
);

export default HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button accessoryLeft={PlusIcon} size="tiny" appearance="ghost" style={styles.addButton} />
                <Text style={{ color: 'white' }}>Note To Self</Text>
                <Button accessoryLeft={SearchIcon} size="tiny" appearance="ghost" style={styles.addButton} />
            </View>
        </SafeAreaView>
    )
}
