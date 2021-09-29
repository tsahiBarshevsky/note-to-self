import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, ActivityIndicator } from 'react-native';
import { Button, Icon, Text } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import { getLists, reviver } from '../../AsyncStorageHandler';
import { styles } from './HomeScreenStyles';
import List from '../List/List';

export default HomeScreen = ({ navigation, route }) => {

    const [lists, setLists] = useState(new Map());
    const [loaded, setLoaded] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [showButton, setShowButton] = useState(false);
    const arrayLists = Array.from(lists, ([key, items]) => ({ key, items }));
    const divided = arrayLists.reduce((array, item) => {
        array[item.items.pinned ? 'pinned' : 'unpinned'].push(item);
        return array;
    }, { pinned: [], unpinned: [] });
    const scrollRef = useRef();

    useEffect(() => {
        if (route.params?.lists) {
            console.log(`yes!`);
            setLists(JSON.parse(route.params?.lists, reviver));
        }
        else
            getLists().then((res) => {
                setLists(res);
                setTimeout(() => {
                    setLoaded(true);
                });
            }, 1000);
    }, [route.params?.lists]);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };

    const onSearch = () => {
        if (searchKey !== '') {
            navigation.navigate('Search', { key: searchKey.trim() });
            setSearchKey('');
        }
        else
            Toast.show({
                type: 'info',
                position: 'bottom',
                text1: 'Please enter a serach query'
            });
    }

    const backToTop = () => {
        scrollRef.current.scrollTo({ y: 0, animated: true });
    }

    return loaded ? (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button
                    size="tiny"
                    appearance="ghost"
                    accessoryLeft={PlusIcon}
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Insertion')}
                />
                <TextInput
                    value={searchKey}
                    onChangeText={setSearchKey}
                    placeholder="Search list..."
                    placeholderTextColor="#ffffff99"
                    style={styles.input}
                />
                <Button
                    size="tiny"
                    appearance="ghost"
                    accessoryLeft={SearchIcon}
                    style={styles.addButton}
                    onPress={() => onSearch()}
                />
            </View>
            {lists &&
                (lists.size > 0 ?
                    <ScrollView
                        ref={scrollRef}
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent))
                                setShowButton(true);
                        }}
                        scrollEventThrottle={400}
                    >
                        {divided.unpinned.length === lists.size ?
                            Array.from(lists, ([key, properties]) => ({ key, properties })).map((list) => {
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
                            :
                            <>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.label} category='p2'>Pinned</Text>
                                </View>
                                {divided.pinned.map((item) => {
                                    return (
                                        <List
                                            key={item.key}
                                            id={item.key}
                                            list={item.items}
                                            lists={lists}
                                            setLists={setLists}
                                            navigation={navigation}
                                        />
                                    )
                                })}
                                <View style={styles.labelBottomContainer}>
                                    <Text style={styles.label} category='p2'>Other lists</Text>
                                </View>
                                {divided.unpinned.map((item) => {
                                    return (
                                        <List
                                            key={item.key}
                                            id={item.key}
                                            list={item.items}
                                            lists={lists}
                                            setLists={setLists}
                                            navigation={navigation}
                                        />
                                    )
                                })}
                            </>}
                        {showButton && <Button
                            onPress={() => backToTop()}
                            style={styles.backToTop}
                            accessoryLeft={ArrowUpIcon}
                        >
                            Back to top
                        </Button>}
                    </ScrollView>
                    :
                    <View style={styles.messageContainer}>
                        <Icon
                            style={{ width: 30, height: 30 }}
                            fill='#fff'
                            name='playlist-plus'
                            pack='materialCommunity'
                        />
                        <Text style={{ textAlign: 'center' }}>
                            Lists you'll add {"\n"} will be shown here
                        </Text>
                    </View>)
            }
        </SafeAreaView>
    ) : (
        <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#FFF' />
        </SafeAreaView>
    )
}

const PlusIcon = (props) => (
    <Icon name='plus' fill='#ffffff' {...props} />
);

const SearchIcon = (props) => (
    <Icon name='search' fill='#ffffff' {...props} />
);

const ArrowUpIcon = (props) => (
    <Icon name='arrow-upward' fill='#ffffff' {...props} />
);