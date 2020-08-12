import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Loader from './loader';
import api from '../api';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const injectScript = `
  (
    function () {
      var text = '';
    window.onclick = function(e) {
      e.preventDefault();
      if(e.target.style.getPropertyValue('color') != 'lime'){ 
        if(text == '' || text == 'error'){
          var nodeName = e.target.parentNode.nodeName;
          var className = e.target.parentNode.className;
          if(nodeName == '' || className == '')
          {
            text='error';
          }
          else{
          e.target.style.setProperty('color', 'lime');
          e.target.style.setProperty('border-style', 'dotted');
          e.target.style.setProperty('background-color', '#e0ffe2');
          text = nodeName +','+className;
          }
        }
      }
      else{
        e.target.style.removeProperty('color')
        e.target.style.removeProperty('border-style')
        e.target.style.removeProperty('background-color')
        text = '';
      }
      window.ReactNativeWebView.postMessage(text);
      e.stopPropagation()
    }
  }());
`;

export default ({route, navigation}) => {
  const {uri, index, jwt_token} = route.params;
  let data = '';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={{fontSize: 17, paddingRight: 15}}>완료</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const filterling_data = async () => {
    console.log('filterling_data');
    try {
      const {status} = await api.post_filterling(
        {index: index, filterling: data},
        jwt_token,
      );
      console.log(status);

      if (status === 200) {
        navigation.navigate('Home', {
          renderRefresh: true,
        });
      } else {
        Alert.alert('알림', '잘못된 요청입니다.');
      }
    } catch (e) {
      Alert.alert('알림', '데이터 연결을 확인해 주세요.');
    }
  };

  const handleSubmit = () => {
    filterling_data();
  };
  const get_message = (filter_data) => {
    console.log(filter_data);
    if (filter_data === 'error') {
      Alert.alert(
        '알림',
        '다른 내용을 선택해 주세요.(Tip : 더 큰 범위로 지정)',
      );
      data = '';
      return;
    }
    data = filter_data;
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        style={styles.webview}
        source={{uri: uri}}
        injectedJavaScript={injectScript}
        //injectJavaScript={injectrunScript}
        onMessage={(event) => get_message(event.nativeEvent.data)}
        startInLoadingState={true}
        scalesPageToFit={true}
        domStorageEnabled={true}
        renderLoading={() => <Loader />}
        onShouldStartLoadWithRequest={(request) => {
          console.log(request.url);
          return request.url === uri || request.url + '/' === uri;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});
