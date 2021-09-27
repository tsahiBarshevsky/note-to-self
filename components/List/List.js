import React, { useState } from 'react';
import Moment from 'moment';
import { Button, Icon } from '@ui-kitten/components';
import { View, Text, CheckBox } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { replacer, setLists as updateStorage } from '../../AsyncStorageHandler';
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

    const formatDate = () => {
        const date = new Date(list.lastUpdate);
        return Moment(date).format('DD/MM/YYYY, HH:mm');
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
            <View style={styles.collapseHeader}>
                <Button
                    size="tiny"
                    appearance="ghost"
                    accessoryLeft={expanded ? ArrowDownIcon : ArrowSideIcon}
                    onPress={() => setExpanded(!expanded)}
                    style={styles.expandButton}
                />
                <Text>Completed items</Text>
            </View>
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
            <Button
                appearance='ghost'
                accessoryLeft={DeleteIcon}
                onPress={() => deleteList()}
            />
            <Button
                appearance='ghost'
                accessoryLeft={EditIcon}
                onPress={() => navigation.navigate('Editing', { id: id, title: list.name })}
            />
            <Text>{formatDate()}</Text>
        </View>
    )
}

export default List;

const ArrowSideIcon = (props) => (
    <Icon name='arrow-ios-forward' fill='#000' {...props} />
);

const ArrowDownIcon = (props) => (
    <Icon name='arrow-ios-downward' fill='#000' {...props} />
);

const DeleteIcon = (props) => (
    <Icon name='trash-2' fill='#000' {...props} />
);

const EditIcon = (props) => (
    <Icon name='edit-2' fill='#000' {...props} />
);