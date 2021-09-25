import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Input, Icon, Modal, Card, Divider } from '@ui-kitten/components';
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
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState('');
    const [items, setItems] = useState(new Map());

    const addItemAndClose = () => {
        const itemObject = { value: item, completed: false };
        setItems(new Map(items.set(uuid.v4(), itemObject)));
        setItem('');
        setVisible(false);
    }

    const addItemAndStay = () => {
        const itemObject = { value: item, completed: false };
        setItems(new Map(items.set(uuid.v4(), itemObject)));
        setItem('');
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
            if (storage === null) // First insertion
            {
                const map = new Map().set(uuid.v4(), list);
                const jsonMap = JSON.stringify(map, replacer);
                setLists(jsonMap);
                alert("First list inserted");
            }
            else // Insert to existing map
            {
                storage.set(uuid.v4(), list);
                const jsonMap = JSON.stringify(storage, replacer);
                setLists(jsonMap);
                alert("New list inserted to existing map");
            }
        });
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button
                        appearance='ghost'
                        accessoryLeft={ArrowIcon}
                        style={styles.backButton}
                        // onPress={() => navigation.navigate('Home')}
                        onPress={() => saveList()}
                    />
                    <Text style={styles.text}>Add new list</Text>
                </View>
                <Input
                    value={name}
                    status="control"
                    style={styles.input}
                    placeholder="List's name..."
                    onChangeText={(value) => setName(value)}
                />
                <Button
                    appearance="ghost"
                    accessoryLeft={PlusIcon}
                    onPress={() => setVisible(true)}
                />
                <ScrollView>
                    {items.size > 0 ?
                        Array.from(items, ([key, properties]) => ({ key, properties })).map((item) => {
                            return (
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
                <Modal visible={visible} backdropStyle={styles.backdrop}>
                    <Card style={styles.card} disabled={true}>
                        <Text style={styles.text}>Add item</Text>
                        <Input
                            value={item}
                            status="control"
                            style={styles.input}
                            placeholder="Item..."
                            onChangeText={(value) => setItem(value)}
                        />
                        <Button onPress={() => setVisible(false)}>Cancel</Button>
                        <Button disabled={item.length === 0 ? true : false} onPress={() => addItemAndClose()}>Add</Button>
                        <Button disabled={item.length === 0 ? true : false} onPress={() => addItemAndStay()}>Next</Button>
                    </Card>
                </Modal>
            </View>
        </SafeAreaView>
    )
}
