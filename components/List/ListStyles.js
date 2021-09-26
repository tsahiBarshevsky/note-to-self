import { StyleSheet } from "react-native";
import { secondary } from "../../colors";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white'
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
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    labelUncompleted: {
        marginLeft: 5,
    },
    labelCompleted: {
        marginLeft: 5,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }
});