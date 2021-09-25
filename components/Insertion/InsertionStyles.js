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
        borderRadius: 10
    },
    listItem: {

    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    card: {
        backgroundColor: primary,
        borderColor: primary,
        borderRadius: 10
    }
});