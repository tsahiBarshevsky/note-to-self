import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { Button, Input, Icon } from '@ui-kitten/components';
import { styles } from './InsertionStyles';

const PlusIcon = (props) => (
    <Icon name='plus' fill='#ffffff' {...props} />
);

export default Insertion = () => {

    const [name, setName] = useState('');

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.header}>
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
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
