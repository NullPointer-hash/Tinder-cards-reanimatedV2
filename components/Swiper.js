import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
  } from 'react-native-reanimated';

const Swiper = ({slideW,spacing,style,data}) => {
    const [index,setIndex] = useState(0);
    const translationY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.y;
    });

    const stylez = useAnimatedStyle(() => {
        return {
        transform: [
            {
            translateY: translationY.value,
            },
        ],
        };
    });
    return (
        <View style={[S.container,style]}>
            <Animated.View style={[S.slided,]}>

            </Animated.View>
        </View>
    );
};

const S = StyleSheet.create({
    container: {
        position:'relative',
        overflow: 'hidden',
    },
    slided: {
        position:'absolute',
        
    }
});

export default Swiper;

