import React from 'react';
import { Button, CheckBox } from '@ui-kitten/components';
import { View, Text } from 'react-native';
import { styles } from './ListStyles';
import { replacer, setLists as updateStorage } from '../../AsyncStorageHandler';

const List = ({ id, list, lists, setLists }) => {

    const items = Array.from(list.items, ([key, items]) => ({ key, items }));
    const divided = items.reduce((array, item) => {
        array[item.items.completed ? 'completed' : 'uncompleted'].push(item);
        return array;
    }, { completed: [], uncompleted: [] });

    const updateStatus = (itemID) => {
        console.log(itemID)
        const listObject = lists.get(id);
        const listItem = listObject.items.get(itemID);
        let updated;
        if (listItem.completed)
            updated = { value: listItem.value, completed: false };
        else
            updated = { value: listItem.value, completed: true };
        const check = new Map(lists.get(id).items.set(itemID, updated));
        setLists(new Map(lists.set(id, {
            ...lists.get(id),
            items: check,
            lastUpdate: new Date()
        })));
        const jsonMap = JSON.stringify(lists, replacer);
        updateStorage(jsonMap);
    }

    return (
        <View style={styles.container}>
            <Text>{list.name}</Text>
            {divided.uncompleted.map((item) => {
                return (
                    <CheckBox
                        key={item.key}
                        checked={item.items.completed}
                        style={{ marginVertical: 5 }}
                    >
                        {item.items.value}
                    </CheckBox>
                )
            })}
            <Text>Completed items</Text>
            {divided.completed.map((item) => {
                return (
                    <CheckBox
                        key={item.key}
                        onChange={() => updateStatus(item.key)}
                        checked={item.items.completed}
                        style={{ marginVertical: 5 }}
                    >
                        {item.items.value}
                    </CheckBox>
                )
            })}
        </View>
    )
}

export default List;
