import React, { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { Button, Icon, Text } from '@ui-kitten/components';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import { Keyboard } from 'react-native';
import { getLists, replacer, setLists } from '../../AsyncStorageHandler';
import { styles } from './InsertionStyles';
import ListItem from './ListItem/ListItem';

export default Insertion = ({ navigation }) => {

    const [name, setName] = useState('');
    const [item, setItem] = useState('');
    const [items, setItems] = useState(new Map());
    const itemRef = useRef();

    const addNewItem = () => {
        if (item.length > 0) {
            setItems(new Map(items.set(uuid.v4(), { value: item, completed: false })));
            setItem('');
            Keyboard.dismiss();
        }
        else
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Oops!',
                text2: "You can't add an empty item"
            });
    }

    const deleteItem = (id) => {
        const map = new Map(items);
        map.delete(id);
        setItems(new Map(map));
    }

    const saveList = async () => {
        switch (true) {
            case (name === '' && items.size === 0):
                navigation.navigate('Home');
                break;
            case (name === '' && items.size > 0):
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Oops! List has no name',
                    text2: 'Give it a name to save if you wish to save.',
                });
                break;
            case (name !== '' && items.size === 0):
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Oops! List has no itms.',
                    text2: 'Add some or remove the name to cancel.'
                });
                break;
            case (name !== '' && items.size > 0):
                // create list object
                const list = {
                    name: name,
                    pinned: false,
                    lastUpdate: new Date(),
                    items: items
                };
                getLists().then((storage) => {
                    var jsonMap = '';
                    if (storage === null) // First insertion
                    {
                        const map = new Map().set(uuid.v4(), list);
                        jsonMap = JSON.stringify(map, replacer);
                        setLists(jsonMap); // update AsyncStorage
                        console.log("First list inserted");
                    }
                    else // Insert to existing map
                    {
                        storage.set(uuid.v4(), list);
                        jsonMap = JSON.stringify(storage, replacer);
                        setLists(jsonMap); // update AsyncStorage
                        console.log("New list inserted to existing map");
                    }
                    navigation.navigate({
                        name: 'Home',
                        params: { lists: jsonMap },
                        merge: true
                    });
                });
                break;
            default: return null;
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.header}>
                <Button
                    appearance='ghost'
                    accessoryLeft={ArrowIcon}
                    style={styles.backButton}
                    onPress={() => saveList()}
                />
                <Text category='h6' style={styles.text}>Add new list</Text>
            </View>
            <TextInput
                value={name}
                style={styles.input}
                onChangeText={setName}
                placeholder="List's name..."
                placeholderTextColor="#ffffff99"
                onSubmitEditing={() => itemRef.current.focus()}
            />
            <View style={styles.itemInsertionContainer}>
                <TextInput
                    value={item}
                    style={styles.itemInput}
                    onChangeText={setItem}
                    placeholder="New item..."
                    placeholderTextColor="#ffffff99"
                    ref={itemRef}
                />
                <Button
                    appearance="ghost"
                    accessoryLeft={PlusIcon}
                    style={{ width: 20 }}
                    onPress={() => addNewItem()}
                />
            </View>
            {items.size > 0 ?
                <ScrollView style={styles.itemContainer}>
                    {Array.from(items, ([key, properties]) => ({ key, properties })).map((item) => {
                        return (
                            <ListItem
                                key={item.key}
                                id={item.key}
                                value={item.properties.value}
                                deleteItem={deleteItem}
                                items={items}
                                setItems={setItems}
                            />
                        )
                    })}
                </ScrollView>
                :
                <View style={styles.messageContainer}>
                    <Icon
                        style={{ width: 30, height: 30 }}
                        fill='#fff'
                        name='playlist-remove'
                        pack='materialCommunity'
                    />
                    <Text style={styles.text}>No items yet</Text>
                </View>
            }
        </SafeAreaView>
    )
}

const ArrowIcon = (props) => (
    <Icon name='chevron-left' fill='#fff' {...props} />
);

const PlusIcon = (props) => (
    <Icon name='plus' fill='#fff' {...props} />
);