import AsyncStorage from '@react-native-async-storage/async-storage';

// Two handler funcions for JSON.stringify and JSON.parse

export function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries())
        }
    }
    else {
        return value;
    }
}

export function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

export const getLists = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@lists');
        return jsonValue != null ? JSON.parse(jsonValue, reviver) : null;
    }
    catch (e) {
        alert("An unknown error occurred.");
    }
}

export const setLists = async (map) => {
    try {
        await AsyncStorage.setItem('@lists', map);
    }
    catch (e) {
        alert("An unknown error occurred.");
    }
}