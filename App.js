import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { View, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DropdownAlert from 'react-native-dropdownalert';



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
