import React from 'react';
import { Button } from '@ui-kitten/components';
import { View, Text, CheckBox } from 'react-native';
import { styles } from './ListStyles';
import { replacer, setLists as updateStorage } from '../../AsyncStorageHandler';

const List = ({ id, list, lists, setLists }) => {

    const items = Array.from(list.items, ([key, items]) => ({ key, items }));
    const divided = items.reduce((array, item) => {
        array[item.items.completed ? 'completed' : 'uncompleted'].push(item);
        return array;
    }, { completed: [], uncompleted: [] });

    const updateStatus = (itemID) => {
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
                    <View key={item.key} style={styles.checkboxContainer}>
                        <CheckBox
                            value={item.items.completed}
                            onValueChange={() => updateStatus(item.key)}
                        />
                        <Text style={styles.labelUncompleted}>
                            {item.items.value}
                        </Text>
                    </View>
                )
            })}
            <Text>Completed items</Text>
            {divided.completed.map((item) => {
                return (
                    <View key={item.key} style={styles.checkboxContainer}>
                        <CheckBox
                            value={item.items.completed}
                            onValueChange={() => updateStatus(item.key)}
                        />
                        <Text style={styles.labelCompleted}>
                            {item.items.value}
                        </Text>
                    </View>
                )
            })}
        </View>
    )
}

export default List;
