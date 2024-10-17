import React, {useRef} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import * as Comlink from 'comlink';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class MessageEvent {
  public origin = 'ReactNativeWebView';
  constructor(public data: unknown) {}
}

export type WebViewEndpoint = Comlink.Endpoint & {
  onMessage: (e: WebViewMessageEvent) => void;
};

const rpcs = {
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

const listeners: any[] = [];

function App(): React.JSX.Element {
  const ref = useRef<WebView>(null);

  const endpoint: WebViewEndpoint = {
    addEventListener: (_, listener) => {
      listeners.push(listener);
    },
    removeEventListener: (_, listener) => {
      listeners.filter(l => l !== listener);
    },
    postMessage: data => {
      if (!ref.current) {
        throw Error('Failed to return RPC response to WebView via postMessage');
      }

      const dataStr = JSON.stringify(data);
      return ref.current.injectJavaScript(`
        document.dispatchEvent(new MessageEvent('ReactNativeWebViewCallback', { data: ${dataStr} }));
      `);
    },
    onMessage: e => {
      const data = JSON.parse(e.nativeEvent.data);
      const messageEvent = new MessageEvent(data);
      listeners.forEach(l => {
        if (typeof l === 'function') {
          l(messageEvent as unknown as Event);
        } else {
          l.handleEvent(messageEvent as unknown as Event);
        }
      });
    },
  };

  Comlink.expose(rpcs, endpoint);
  const webRpcs: Comlink.Remote<any> = Comlink.wrap(endpoint, {});

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
        source={{uri: 'http://192.168.0.24:3000'}}
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
