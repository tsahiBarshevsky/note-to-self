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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        borderRadius: 10
    }
});