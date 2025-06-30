import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import {  verticalScale } from 'react-native-size-matters'


interface BottomComponentProps {
    title: string;
    onPress: () => void;
}

const BottomComponent = ({ title, onPress }: BottomComponentProps) => {
    return (
        <TouchableOpacity style={styles.bottonContainer} onPress={onPress}>
            <Text style={styles.bottomText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bottonContainer: {
        backgroundColor: 'rgba(164, 148, 148, 0.4)',
        width: '100%',
        paddingVertical: verticalScale(13),
        paddingHorizontal: verticalScale(75),
        borderRadius: verticalScale(30),
    },
    bottomText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default BottomComponent