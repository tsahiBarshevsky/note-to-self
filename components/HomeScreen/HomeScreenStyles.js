import { StyleSheet, Platform, StatusBar } from "react-native";
import { primary, secondary } from "../../colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 5,
        borderRadius: 10,
        backgroundColor: secondary,
        // elevation: 5,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
    },
    input: {
        color: 'white',
        paddingHorizontal: 5,
        width: 200,
        textAlign: 'center',
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomWidth: 1
    },
    addButton: {
        borderRadius: 50,
        width: 30,
        height: 30
    },
    labelContainer: {
        marginHorizontal: 20,
        marginBottom: 15
    },
    labelBottomContainer: {
        marginHorizontal: 20,
        marginBottom: 15,
        marginTop: 10
    },
    label: {
        color: 'white'
    },
    backToTop: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: secondary,
        borderWidth: 0
    },
    messageContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});