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

export default HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button
                    size="tiny"
                    appearance="ghost"
                    accessoryLeft={PlusIcon}
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Insertion')} />
                <Text style={{ color: 'white' }}>Note To Self</Text>
                <Button accessoryLeft={SearchIcon} size="tiny" appearance="ghost" style={styles.addButton} />
            </View>
        </SafeAreaView>
    )
}
