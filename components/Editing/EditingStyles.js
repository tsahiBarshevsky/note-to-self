import { StyleSheet, Platform, StatusBar } from "react-native";
import { primary, secondary } from "../../colors";

export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
        marginHorizontal: 20,
        marginTop: 25
    },
    backButton: {
        borderRadius: 50,
        width: 40,
        height: 40,
        marginRight: 15
    },
    text: {
        color: 'white'
    },
    input: {
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingBottom: 5,
        paddingHorizontal: 5,
        marginHorizontal: 20
    },
    itemInput: {
        color: 'white',

        padding: 5,
        flex: 1
    },
    itemInsertionContainer:
    {
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginTop: 10,
        marginHorizontal: 20
    },
    itemContainer: {
        marginTop: 30,
        marginHorizontal: 20,
    },
    messageContainer: {
        marginTop: 30,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});