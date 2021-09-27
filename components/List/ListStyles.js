import { StyleSheet } from "react-native";
import { secondary } from "../../colors";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: secondary
    },
    text: {
        color: 'white'
    },
    collapseHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    expandButton: {
        borderRadius: 50,
        width: 30,
        height: 30,
        marginRight: 5
    },
    checkboxes: {
        marginVertical: 10
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    labelUncompleted: {
        marginLeft: 7,
        color: 'white'
    },
    labelCompleted: {
        marginLeft: 7,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: 'white'
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 0.7
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lastUpdate: {
        flexDirection: 'column'
    }
});