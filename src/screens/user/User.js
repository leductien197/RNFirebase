import React from 'react'
import { StyleSheet, Text, View, Dimentions } from 'react-native'

const { width, height } = Dimensions.get('window');
const scale = height / 768
const User = () => {
    return (
        <View style={style.main}> 
            <Text style={styles.textMain}>This is User Screen</Text>
        </View>
    )
}

export default User

const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",
        justifyContents:"center"
    },
    textMain:{
        fontSize:14 * scale,
        color:"blue",
        lineHeight:25*scale,
    },
})
