import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button, Divider, MenuItem, OverflowMenu, Icon } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import { styles } from './ListItemStyles';

const ListItem = ({ id, value, deleteItem, items, setItems }) => {

    const [visible, setVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newValue, setNewValue] = useState('');

    useEffect(() => {
        setNewValue(value);
    }, []);

    const onItemSelectMainMenu = (index) => {
        switch (index.row) {
            // delete item
            case 0:
                deleteItem(id);
                Toast.show({
                    type: 'info',
                    position: 'bottom',
                    text1: 'Item deleted from list',
                });
                break;
            // save changes
            case 1:
                setItems(new Map(items.set(id, { value: newValue, completed: false })));
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Item saved',
                });
                break;
            default: return null;
        }
        setVisible(false);
    }

    const ToggleButton = () => (
        <Button
            onPress={() => setVisible(true)}
            size="small"
            appearance='ghost'
            accessoryLeft={MenuIcon}
            style={styles.menuButton}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TextInput
                    value={newValue}
                    onChangeText={setNewValue}
                    placeholder="New item..."
                    placeholderTextColor="white"
                    style={styles.input}
                />
                <OverflowMenu
                    anchor={ToggleButton}
                    visible={visible}
                    onSelect={onItemSelectMainMenu}
                    placement="bottom"
                    onBackdropPress={() => setVisible(false)}
                >
                    <MenuItem title='Delete' accessoryLeft={DeleteIcon} />
                    <MenuItem title='Save' accessoryLeft={SaveIcon} />
                </OverflowMenu>
            </View>
            <Divider style={styles.divider} />
        </View>
    )
}

export default ListItem;

const MenuIcon = (props) => (
    <Icon name='more-vertical' fill='#fff' {...props} />
);

const DeleteIcon = (props) => (
    <Icon name='trash-2' fill='#fff' {...props} />
);

const EditIcon = (props) => (
    <Icon name='edit-2' fill='#fff' {...props} />
);

const SaveIcon = (props) => (
    <Icon name='save' fill='#fff' {...props} />
);

const CancelIcon = (props) => (
    <Icon name='arrow-back' fill='#fff' {...props} />
);
