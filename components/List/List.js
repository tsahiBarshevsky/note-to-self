import React from 'react';
import { CheckBox } from '@ui-kitten/components';
import { View, Text } from 'react-native';
import { styles } from './ListStyles';

const List = ({ id, list }) => {

    const items = Array.from(list.items, ([key, items]) => ({ key, items }));
    const divided = items.reduce((array, item) => {
        array[item.val ? 'completed' : 'uncompleted'].push(item);
        return array;
    }, { completed: [], uncompleted: [] });

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
