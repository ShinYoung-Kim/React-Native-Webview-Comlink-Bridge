import React, {useRef} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import WebView from 'react-native-webview';
import * as Comlink from 'comlink';
import {getEndpoint, rpcs} from '@react-native-webview-comlink-bridge/app';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const clinetRpcs = {
  async confirmAlert(title: string, body: string): Promise<'ok' | 'cancel'> {
    return await new Promise(resolve => {
      Alert.alert(title, body, [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress() {
            resolve('cancel');
          },
        },
        {
          text: 'OK',
          onPress() {
            resolve('ok');
          },
        },
      ]);
    });
  },
};

function App(): React.JSX.Element {
  const ref = useRef<WebView>(null);
  const endpoint = getEndpoint(ref);
  const {getRemoteRPC, exposeClientRPC} = rpcs();

  exposeClientRPC(clinetRpcs, endpoint);
  const webRpcs: Comlink.Remote<any> = getRemoteRPC(endpoint);

  const handleClick = async () => {
    await webRpcs.changeWebText('Hello from React Native!');
  };

  const stopTimer = async () => {
    await webRpcs.stopTime();
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: 'http://172.30.1.74:3000'}}
        onMessage={endpoint.onMessage}
        ref={ref}
      />
      <Button title="hihi" onPress={handleClick} />
      <Button title="stop Timer" onPress={stopTimer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});

export default App;
