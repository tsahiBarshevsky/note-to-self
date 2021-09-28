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
        paddingHorizontal: 20,
        flexWrap: 'wrap'
    },
    backButton: {
        borderRadius: 50,
        width: 40,
        height: 40,
        marginRight: 15
    },
    text: {
        color: 'white',
    },
    messageContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});