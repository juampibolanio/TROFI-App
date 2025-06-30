import { ActivityIndicator, View, StyleSheet } from "react-native"

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={"#ffffff"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loader;