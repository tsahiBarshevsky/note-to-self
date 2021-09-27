import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TextInput } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import { getLists, reviver } from '../../AsyncStorageHandler';
import { styles } from './HomeScreenStyles';
import List from '../List/List';


export default HomeScreen = ({ navigation, route }) => {

    const [lists, setLists] = useState(new Map());
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        if (route.params?.lists) {
            console.log(`yes!`);
            setLists(JSON.parse(route.params?.lists, reviver));
        }
        else
            getLists().then((res) => { setLists(res); console.log('call'); });
    }, [route.params?.lists]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button
                    size="tiny"
                    appearance="ghost"
                    accessoryLeft={PlusIcon}
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Insertion')}
                />
                {/* <Text style={{ color: 'white' }}>Note To Self</Text> */}
                <TextInput
                    value={searchKey}
                    onChangeText={setSearchKey}
                    placeholder="Search list..."
                    placeholderTextColor="white"
                    style={{ color: 'white' }}
                />
                <Button
                    size="tiny"
                    appearance="ghost"
                    accessoryLeft={SearchIcon}
                    style={styles.addButton}
                    onPress={() => {
                        navigation.navigate('Search', { key: searchKey.trim() });
                        setSearchKey('');
                    }}
                />
            </View>
            {lists && <ScrollView>
                {Array.from(lists, ([key, properties]) => ({ key, properties })).map((list) => {
                    return (
                        <List
                            key={list.key}
                            id={list.key}
                            list={list.properties}
                            lists={lists}
                            setLists={setLists}
                            navigation={navigation}
                        />
                    )
                })}
            </ScrollView>}
        </SafeAreaView>
    )
}

const PlusIcon = (props) => (
    <Icon name='plus' fill='#ffffff' {...props} />
);

const SearchIcon = (props) => (
    <Icon name='search' fill='#ffffff' {...props} />
);