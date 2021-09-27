import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import { getLists } from '../../AsyncStorageHandler';
import { styles } from './EditingStyles';

const Editing = ({ navigation, route }) => {

    const [items, setItems] = useState(new Map());
    const { id, title } = route.params;

    useEffect(() => {
        getLists().then((storage) => {
            const list = storage.get(id);
            setItems(new Map(list.items));
        });
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.header}>
                <Button
                    appearance='ghost'
                    accessoryLeft={ArrowIcon}
                    style={styles.backButton}
                />
                <Text style={styles.text}>Edit {title}</Text>
            </View>
            {items.size > 0 ?
                Array.from(items, ([key, properties]) => ({ key, properties })).map((item) => {
                    return (
                        <View key={item.key}>
                            <Text style={{ color: 'white' }}>{item.properties.value}</Text>
                        </View>
                    )
                })
                :
                <Text style={styles.text}>No items yet</Text>
            }
        </SafeAreaView>
    )
}

export default Editing;

const ArrowIcon = (props) => (
    <Icon name='chevron-left' fill='#fff' {...props} />
);
