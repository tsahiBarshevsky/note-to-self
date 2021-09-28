import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Icon, Text } from '@ui-kitten/components';
import { getLists, replacer } from '../../AsyncStorageHandler';
import List from '../List/List';
import { styles } from './SearchStyles';

const ArrowIcon = (props) => (
    <Icon name='chevron-left' fill='#fff' {...props} />
);

const HomeIcon = (props) => (
    <Icon name='home' fill='#fff' {...props} />
);

const Search = ({ navigation, route }) => {

    const [lists, setLists] = useState(new Map());
    const { key } = route.params;

    useEffect(() => {
        getLists().then((res) => setLists(res));
    }, []);

    const filterByName = (item) => {
        return item.properties.name.toLowerCase().includes(key.toLowerCase());
    }

    const backHome = () => {
        getLists().then((res) => {
            navigation.navigate({
                name: 'Home',
                params: { lists: JSON.stringify(res, replacer) },
                merge: true
            });
        });
    }

    const renderResults = () => {
        const listsArray = Array.from(lists, ([key, properties]) => ({ key, properties }));
        if (listsArray.filter(filterByName).length > 0) {
            return listsArray.filter(filterByName).map((list) => {
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
            })
        }
        else {
            return (
                <View>
                    <Button
                        accessoryLeft={HomeIcon}
                        onPress={() => navigation.navigate('Home')}
                    >
                        Back home
                    </Button>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.header}>
                <Button
                    appearance='ghost'
                    accessoryLeft={ArrowIcon}
                    style={styles.backButton}
                    onPress={() => backHome()}
                />
                <Text category='h6' style={styles.text}>Search results for {key}</Text>
            </View>
            <ScrollView>
                {renderResults()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Search;
