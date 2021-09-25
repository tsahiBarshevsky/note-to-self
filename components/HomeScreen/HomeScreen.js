import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import { getLists } from '../../AsyncStorageHandler';
import { styles } from './HomeScreenStyles';
import List from '../List/List';

const PlusIcon = (props) => (
    <Icon name='plus' fill='#ffffff' {...props} />
);

const SearchIcon = (props) => (
    <Icon name='search' fill='#ffffff' {...props} />
);

export default HomeScreen = ({ navigation }) => {

    const [lists, setLists] = useState('');

    const storeData = () => {
        getLists().then((res) => setLists(res));
    }

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
                <Button onPress={() => storeData()} accessoryLeft={SearchIcon} size="tiny" appearance="ghost" style={styles.addButton} />
            </View>
            {Array.from(lists, ([key, properties]) => ({ key, properties })).map((list) => {
                return (
                    <List key={list.key} id={list.key} list={list.properties} />
                    // <View key={list.key}>
                    //     <Text style={{ color: 'white' }}>{list.properties.name}</Text>
                    //     {Array.from(list.properties.items, ([key, items]) => ({ key, items })).map((item) => {
                    //         return (
                    //             <Text key={item.key} style={{ color: 'white' }}>{item.items.value}</Text>
                    //         )
                    //     })}
                    // </View>
                )
            })}
        </SafeAreaView>
    )
}
