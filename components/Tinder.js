import React, {useState} from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated , { useAnimatedStyle, useSharedValue, withSpring, useAnimatedGestureHandler} from 'react-native-reanimated';



const Tinder = ({cardw,cardh,spacing}) => {
    const [index,setIndex] = useState(0);
    const data = [
        {
          id:1,
          color: 'red',
        },
        {
          id:2,
          color: 'blue',
        },
        {
          id:3,
          color: 'green',
        },
        {
          id:4,
          color: 'purple',
        },
      ];
    const [current, setCurrent] = useState([data[0],data.length==1?null:data[1]]);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const posx = useSharedValue(0);
    const posy = useSharedValue(0);
    const gestureHandler = useAnimatedGestureHandler({
        onStart: () => {

        },
        onActive: (event,ctx) => {
            posx.value = event.translationX;
            posy.value = event.translationY;
        },
        onEnd: (event) => {
            if (Math.abs(event.translationX)<screenWidth/4) {
                posx.value = withSpring(0);
                posy.value = withSpring(0);
            } else {
                posx.value = withSpring(event.translationX<0?-2*screenWidth:2*screenWidth);
                posy.value = withSpring(1.5*event.translationY);
                // setIndex(index+1);
                // setCurrent([data[index],data.length-1==index?null:data[index+1]]);
            }
        }
    });

    const animStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: posx.value },{ translateY: posy.value }],
        };
    });

    
    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
        <View style={[S.container,{padding:spacing,width:cardw+2*spacing,height:cardh+2*spacing}]}>
            
                <Animated.View style={[{width:cardw,height:cardh,backgroundColor:'purple',},animStyle]}>
                    
                </Animated.View>
           
        </View>
        </PanGestureHandler>
        
    );
}

const S = StyleSheet.create({
    container: {
        flexGrow:0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'relative',
        backgroundColor:'red'
    }
});

export default Tinder;
