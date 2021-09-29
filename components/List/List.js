import React, { useState } from 'react';
import Moment from 'moment';
import { Button, Text } from '@ui-kitten/components';
import { View, CheckBox } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { replacer, setLists as updateStorage } from '../../AsyncStorageHandler';
import { ArrowSideIcon, ArrowDownIcon, DeleteIcon, PinOffIcon, PinIcon, EditIcon } from './Icons';
import { styles } from './ListStyles';


const List = ({ id, list, lists, setLists, navigation }) => {

    const [expanded, setExpanded] = useState(false);
    const items = Array.from(list.items, ([key, items]) => ({ key, items }));
    const divided = items.reduce((array, item) => {
        array[item.items.completed ? 'completed' : 'uncompleted'].push(item);
        return array;
    }, { completed: [], uncompleted: [] });

    const deleteList = () => {
        const temp = new Map(lists);
        temp.delete(id)
        setLists(new Map(temp));
        const jsonMap = JSON.stringify(temp, replacer);
        updateStorage(jsonMap);
    }

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

    const updatePin = () => {
        const updatedList = list;
        updatedList.pinned = !list.pinned;
        const updatedMap = new Map(lists);
        updatedMap.set(id, updatedList);
        setLists(new Map(updatedMap));
        const jsonMap = JSON.stringify(updatedMap, replacer);
        updateStorage(jsonMap);
    }

    const formatDate = () => {
        const date = new Date(list.lastUpdate);
        return Moment(date).format('DD/MM/YYYY, HH:mm');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text category='h6' style={styles.text}>{list.name}</Text>
                <Button
                    size="small"
                    appearance='ghost'
                    style={styles.pinButton}
                    accessoryLeft={list.pinned ? PinOffIcon : PinIcon}
                    onPress={() => updatePin()}
                />
            </View>
            <View style={styles.checkboxes}>
                {divided.uncompleted.map((item) => {
                    return (
                        <View key={item.key} style={styles.checkboxContainer}>
                            <CheckBox
                                tintColor={{ true: 'white' }}
                                tintColors={{ true: 'white' }}
                                value={item.items.completed}
                                onValueChange={() => updateStatus(item.key)}
                            />
                            <Text style={styles.labelUncompleted}>
                                {item.items.value}
                            </Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.collapseHeader}>
                <Button
                    size="tiny"
                    appearance="ghost"
                    accessoryLeft={expanded ? ArrowDownIcon : ArrowSideIcon}
                    onPress={() => setExpanded(!expanded)}
                    style={styles.expandButton}
                />
                <Text style={styles.text}>Completed items</Text>
            </View>
            <View style={styles.checkboxes}>
                {divided.completed.map((item) => {
                    return (
                        <Collapse
                            key={item.key}
                            isExpanded={expanded}
                            onToggle={(isExpanded) => setExpanded(isExpanded)}
                        >
                            <CollapseHeader />
                            <CollapseBody>
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        tintColor={{ true: 'white' }}
                                        tintColors={{ true: 'white' }}
                                        value={item.items.completed}
                                        onValueChange={() => updateStatus(item.key)}
                                    />
                                    <Text style={styles.labelCompleted}>
                                        {item.items.value}
                                    </Text>
                                </View>
                            </CollapseBody>
                        </Collapse>
                    )
                })}
            </View>
            <View style={styles.footer}>
                <Button
                    appearance='ghost'
                    accessoryLeft={DeleteIcon}
                    style={styles.button}
                    onPress={() => deleteList()}
                />
                <Button
                    appearance='ghost'
                    accessoryLeft={EditIcon}
                    style={styles.button}
                    onPress={() => navigation.navigate('Editing', { id: id, title: list.name })}
                />
                <View style={styles.lastUpdate}>
                    <Text category='label' style={styles.label}>Last update:</Text>
                    <Text category='c1' style={styles.text}>{formatDate()}</Text>
                </View>
            </View>
        </View>
    )
}

export default List;
