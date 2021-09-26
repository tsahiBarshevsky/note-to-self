import { StyleSheet, Platform, StatusBar } from "react-native";
import { primary, secondary } from "../../colors";

export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    container: {
        padding: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15
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
        paddingHorizontal: 5
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
        marginTop: 10
    },
    itemContainer: {
        // backgroundColor: 'lightgray',
        // height: 100,
        marginTop: 30,
    },
    listItem: {

    }
});