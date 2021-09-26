import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Icon, Divider } from '@ui-kitten/components';
import uuid from 'react-native-uuid';
import { styles } from './InsertionStyles';
import { getLists, replacer, setLists } from '../../AsyncStorageHandler';

const ArrowIcon = (props) => (
    <Icon name='chevron-left' fill='#fff' {...props} />
);

const PlusIcon = (props) => (
    <Icon name='plus' fill='#fff' {...props} />
);

const MenuIcon = (props) => (
    <Icon name='more-vertical' fill='#fff' {...props} />
);

export default Insertion = ({ navigation }) => {

    const [name, setName] = useState('');
    const [item, setItem] = useState('');
    const [items, setItems] = useState(new Map());

    const addNewItem = () => {
        if (item.length > 0) {
            setItems(new Map(items.set(uuid.v4(), { value: item, completed: false })));
            setItem('');
        }
        else {
            alert("Cannot add empty item");
        }
    }

    const deleteItem = (id) => {
        const map = new Map(items);
        map.delete(id);
        setItems(new Map(map));
    }

    const saveList = async () => {
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
                <Text style={styles.text}>Add new list</Text>
            </View>
            <TextInput
                value={name}
                style={styles.input}
                onChangeText={setName}
                placeholder="List's name..."
                placeholderTextColor="white"
            />
            <View style={styles.itemInsertionContainer}>
                <TextInput
                    value={item}
                    style={styles.itemInput}
                    onChangeText={setItem}
                    placeholder="New item..."
                    placeholderTextColor="white"
                />
                <Button
                    appearance="ghost"
                    accessoryLeft={PlusIcon}
                    style={{ width: 20 }}
                    onPress={() => addNewItem()}
                />
            </View>
            <ScrollView style={styles.itemContainer}>
                {items.size > 0 ?
                    Array.from(items, ([key, properties]) => ({ key, properties })).map((item) => {
                        return (
                            // <Text key={item.key} style={{ color: 'white', marginVertical: 20 }}>
                            //     {item.properties.value}
                            // </Text>
                            <View key={item.key}>
                                <Text style={styles.text}>
                                    {item.properties.value}
                                </Text>
                                <Divider style={{ marginVertical: 15 }} />
                                {/* <Button onPress={() => deleteItem(item.key)}>delete</Button> */}
                            </View>
                        )
                    })
                    :
                    <Text style={styles.text}>No items yet</Text>
                }
            </ScrollView>
        </SafeAreaView>
    )
}
