import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: '#642d8a', 
        justifyContent: 'center', 
        width: '100%', 
        height: '100%'
    },
    img: {
        width: 250, 
        height: 250, 
        alignSelf: 'center' 
    },
    clockContainer: {
        width: 150, 
        height: '20%', 
        borderRadius: 100, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center'
    },
    touchableButton:{
        backgroundColor: '#6495ED', 
        alignSelf: 'center', 
        borderRadius: 5, 
        marginTop: 10, 
        height: 40, 
        width: 150, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    txtInput: {
        alignSelf: 'center', 
        height: '100%', 
        textAlignVertical: 'center', 
        textAlign: 'center', 
        backgroundColor: '#000', 
        opacity: 0.8, 
        borderRadius: 5
    },
    fontBlueBold:{
        color: '#214C9B', 
        fontWeight: 700
    }
});

export default styles