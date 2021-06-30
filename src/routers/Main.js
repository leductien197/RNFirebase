import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Animated,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import { useSelector } from 'react-redux';
// import {CommonColors, CommonSize} from '../utils/CommonStyles';
import useIsKeyboardShown from '../utils/useIsKeyboardShown';
import TabProduct from './TabProduct';
import TabUser from './TabUser';

const Tab = createBottomTabNavigator();
const useNativeDriver = Platform.OS !== 'web';

export default function Main() {
  // const { language } = useSelector(state => state.auth)
  const visibilityAnimationConfigRef = React.useRef(null);

  const isKeyboardShown = useIsKeyboardShown();

  const insets = useSafeAreaInsets();

  const [visible] = React.useState(
    () => new Animated.Value(!isKeyboardShown ? 1 : 0),
  );

  React.useEffect(() => {
    const visibilityAnimationConfig = visibilityAnimationConfigRef.current;

    if (!isKeyboardShown) {
      const animation =
        visibilityAnimationConfig?.show?.animation === 'spring'
          ? Animated.spring
          : Animated.timing;

      animation(visible, {
        toValue: 1,
        useNativeDriver,
        duration: 250,
        ...visibilityAnimationConfig?.show?.config,
      }).start(({finished}) => {
        if (finished) {
          // setIsTabBarHidden(false);
        }
      });
    } else {
      // setIsTabBarHidden(true);

      const animation =
        visibilityAnimationConfig?.hide?.animation === 'spring'
          ? Animated.spring
          : Animated.timing;

      animation(visible, {
        toValue: 0,
        useNativeDriver,
        duration: 200,
        ...visibilityAnimationConfig?.hide?.config,
      }).start();
    }
  }, [visible, isKeyboardShown]);

  return (
    <Tab.Navigator
      tabBar={({state, descriptors, navigation}) => (
        <Animated.View
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            height: 56,
            backgroundColor: 'rgb(255,255,255)',
            borderColor: 'rgb(199,199,204)',
            borderWidth: 0.333333,
            elevation: 8,
            paddingBottom: insets ? insets.bottom : 0,
            zIndex: -1,
            justifyContent: 'space-around',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            transform: [
              {
                translateY: visible.interpolate({
                  inputRange: [0, 1],
                  outputRange: [56, 0],
                }),
              },
            ],
            position: isKeyboardShown ? 'absolute' : null,
          }}
          pointerEvents={isKeyboardShown ? 'none' : 'auto'}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            let iconName;
            let iconStyle;
            if (route.name === 'home') {
              iconName = isFocused
                ? require('../assets/home.png')
                : require('../assets/home.png');
              iconStyle = {width: 24, height: 24};
            } else if (route.name === 'search') {
              iconName = isFocused
                ? require('../assets/search_active.png')
                : require('../assets/search.png');
              iconStyle = {width: 24, height: 24};
            } else if (route.name === 'profile') {
              iconName = isFocused
                ? require('../assets/user_active.png')
                : require('../assets/user.png');
              iconStyle = {width: 24, height: 24};
            }

            return (
              <TouchableOpacity
                activeOpacity={1}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                key={index}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: 26,
                    height: 26,
                  }}>
                  <Image
                    source={iconName}
                    style={[
                      iconStyle,
                      {
                        tintColor: isFocused ? 'green' : 'black',
                      },
                    ]}
                  />
                </View>
                <Text
                  style={{
                    color: isFocused ? 'green' : 'black',
                    fontSize: 12,
                    fontWeight: 'normal',
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      )}>
      <Tab.Screen name="product" component={TabProduct} />
      <Tab.Screen name="user" component={TabUser} />
    </Tab.Navigator>
  );
}
