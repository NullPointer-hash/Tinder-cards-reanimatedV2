import React, {useEffect, useState} from "react";
import {AppRegistry, Platform, Text, View, Image,Button, TouchableHighlight, Dimensions, StyleSheet} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated , {interpolate, useAnimatedStyle, useSharedValue, Extrapolate, withSpring, withTiming, Easing, useAnimatedGestureHandler, event, set, runOnUI, runOnJS} from 'react-native-reanimated';

let Swiper = require('./components/Swiper').default;
let Tinder = require('./components/Tinder').default;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const data = [
  {
    id:1,
    color: 'red',
    src: 'https://i.pinimg.com/736x/d4/fa/9f/d4fa9f7dc09702456954040088e0ae42.jpg',
  },
  {
    id:2,
    color: 'blue',
    src: 'https://www.barnorama.com/wp-content/uploads/2017/07/27-Sexy-Chivers.jpg',
  },
  {
    id:3,
    color: 'green',
    src: 'https://64.media.tumblr.com/a64d79515f15a8b694233d281d53f743/cdeb669d9d2378b1-8d/s500x750/61baf9ae05eb146c8f2280e52198e457305a967d.jpg',
  },
  {
    id:4,
    color: 'purple',
    src: 'https://th.bing.com/th/id/R3b4b0b672578c64ac98e90e56820e9cd?rik=ny4yEoL1lIgWug&riu=http%3a%2f%2facidcow.com%2fpics%2f20130409%2frandom_cute_girls_30.jpg&ehk=6ZxnJJBEIwapoQ%2f%2b8QfNHQIVjLXCI6jGBtarpINZ6bQ%3d&risl=&pid=ImgRaw',
  },
  {
    id:5,
    color: 'yellow',
    src: 'https://th.bing.com/th/id/R79fb5efe91735bd338589cf9e5c289fa?rik=oPgchVcvRmxeVQ&riu=http%3a%2f%2fwww.beautiful-women-pedia.com%2fimages%2fedita-vilkeviciute-12.jpg&ehk=qHyy%2fBMcIWq4iBGM7lUMhOOMg0O8R0ZKl5YF1Y%2fYTW8%3d&risl=&pid=ImgRaw',
  },
  {
    id:6,
    color: 'orange',
    src: 'https://th.bing.com/th/id/OIP.tssNpUMH_b9Ufnd9oGD9yQHaLG?pid=ImgDet&w=1707&h=2560&rs=1',
  },
  {
    id:7,
    color: 'cyan',
    src: 'https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg',
  },
  {
    id:8,
    color: 'white',
    src: 'https://i.pinimg.com/originals/cc/e0/2e/cce02e138d264f69d3dd8aa2fc08fb51.jpg',
  },
];


const App = () => {
  
  const [index, setIndex] = useState(0);
  // const [dt, setDt] = useState([data[0],data[1]]);
  // const [dataState, setDataState] = useState(
  //   data
  // );
  const offx = useSharedValue(0);
  const offy = useSharedValue(0);
  
  
  // console.log(dt);

  const call = () => {
    
    // setDt([]);
    setTimeout(() => {
      setIndex(index+1);
      offx.value = 0;
      offy.value = 0;
    },170);
    // console.log(dt);

    

  }

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_,ctx) => {
      
    },
    onActive: (event,ctx) => {
      offx.value = event.translationX;
      offy.value = event.translationY;
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX)<screenWidth*0.24) {
          offx.value = withSpring(0);
          offy.value = withSpring(0);
      } else {
          offx.value = withSpring(event.translationX<0?-2*screenWidth:2*screenWidth);
          runOnJS(call)();
      }
    }
  });
  

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offx.value*1.25 },
        { translateY: offy.value },
        { rotate: `${interpolate(
          offx.value,
          [0,screenWidth],
          [0,65],
        )}deg` }
      ],
      
    };
  });

  const grow = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            offx.value,
            [-screenWidth,0,screenWidth],
            [1,0.86,1],
            Extrapolate.CLAMP,
          )
        }
      ]
    }
  })


  const yy = useSharedValue(0);  
  const aleftstyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX:interpolate(yy.value,
          [0,screenWidth*0.65],
          [0,screenWidth*0.65],
          Extrapolate.CLAMP,
        )}
      ],
    };
  });
  const arightstyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX:interpolate(yy.value,
          [0,screenWidth*0.65],
          [0,screenWidth*0.65],
          Extrapolate.CLAMP,
        )},
        {scale:interpolate(yy.value,
          [0,screenWidth*0.65],
          [1,0.85],
          Extrapolate.CLAMP,
        )}
      ],

    };
  });
  
  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_,ctx) => {
      ctx.last = yy.value;
    },
    onActive: (event,ctx) => {
      yy.value = event.translationX + ctx.last;
    },
    onEnd: (event,ctx) => {
      if (event.translationX+ctx.last<screenWidth*0.65/2) {
        yy.value = withTiming(0, {
          duration: 280,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      } else {
        yy.value = withTiming(screenWidth*0.65, {
          duration: 280,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
    }
  });

  return (
    // <View style={[S.container]}>
    //   
    // </View>
    
    <View style={{width:'100%',height:'100%',backgroundColor:'#013707'}}>
      <PanGestureHandler
        onGestureEvent={gestureHandler2}
      >
      <Animated.View style={[S.left,aleftstyle]}></Animated.View>
      </PanGestureHandler>
      <PanGestureHandler
        onGestureEvent={gestureHandler2}
      >
      <Animated.View style={[S.right,arightstyle]}>
        <View style={S.navbar}>
          <Button onPress={() => {
            if (yy.value<0.1) {
              yy.value = withTiming(screenWidth*0.65, {
                duration: 400,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              });
            } else if (yy.value>screenWidth*0.649) {
              yy.value = withTiming(0, {
                duration: 400,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              });
            }
            
          }} title='|||||' width={50} />
          <Button title=' \/ ' width={50} />
        </View>
        <View style={{flex:1,position:'relative',margin:15}}>
          {index<data.length-1?
              <Animated.View key={'a'+data[index+1].id} style={[S.blueBox,grow]} >
                <Image style={S.img} source={{uri: data[index+1].src}}></Image>
              </Animated.View>
          :<></>}
          {index<data.length?<PanGestureHandler 
            onGestureEvent={gestureHandler} 
          >
              <Animated.View key={'a'+data[index].id} style={[S.blueBox,animatedStyles]} >
                <Image style={S.img} source={{uri: data[index].src}}></Image>
              </Animated.View>
          </PanGestureHandler>:<></>}
        </View>
        
          <Button title='reset' onPress={()=> {
            setIndex(0);
            yy.value = 0;
          }} ></Button>
      </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#222'
  },
  left: {
    position:'absolute',
    left: -screenWidth,
    width:'100%',
    height:'100%',
    // backgroundColor:'#00000022',
  },
  right: {
    position:'absolute',
    width:'100%',
    height:'100%',
    backgroundColor: "#fff",
    borderRadius:7,
    
    overflow: 'hidden',
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 10,
    height: 55,
    width:'100%',
  },
  img: {
    width:'100%',
    height:'100%',
    resizeMode: 'cover',
  },
  blueBox: {
    position: 'absolute',
    height: 570,
    width: 380,
    borderRadius: 12,
    overflow: 'hidden',
    // backgroundColor: '#1959ff',
  },
  btn: {
    display: 'flex',
    paddingVertical:13,
    paddingHorizontal:45,
    backgroundColor: '#5600f5',
    borderRadius: 10
  },
  btnTxt: {
    margin: 'auto',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: '800',

  }
})

export default App;
