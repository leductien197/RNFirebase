import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { View, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DropdownAlert from 'react-native-dropdownalert';
import {fcmService} from "./src/services/FCMService"
import {localNotificationService} from "./src/services/LocalNotificationService"



function App(){

  const [firstApp, setFirstApp] = useState(true);
  const dropDownAlertRef = useRef(null);
  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setFirstApp(false)
        dropDownAlertRef?.current?.alertWithType('error', '', 'Không có kết nối internet');
      }
      if (state.isConnected) {
        if (!firstApp) {
          setFirstApp(true)
        }
        dropDownAlertRef?.current?.closeAction()
      }
    });
    SplashScreen?.hide();
  }, [])

  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      console.log("[App] onRegister: ", token)
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
      alert("Open Notification: " + notify.body)
    }

    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }

  }, [])

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Route firstApp={firstApp} />
        <DropdownAlert ref={dropDownAlertRef}
          closeInterval={10000000000} tapToCloseEnabled={false} panResponderEnabled={true} contentContainerStyle={{ flexDirection: 'row', flex: 1, alignItem: 'center' }} containerStyle={{ padding: 0, flexDirection: 'row', alignItem: 'center' }} defaultTextContainer={{ flex: 1 }} messageStyle={{ fontSize: 14, textAlign: 'left', fontWeight: 'normal', color: 'white', backgroundColor: 'transparent', paddingLeft: 10 }} imageStyle={{ padding: 4, width: 20, height: 20, alignSelf: 'center' }} errorColor={'#4c4545'} />
      </SafeAreaProvider>
    </Provider>
  );
}
export default App;
