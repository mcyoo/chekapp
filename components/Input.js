import React from 'react';
import {TouchableOpacity, Dimensions, Platform} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('screen');

const isAndroid = Platform.OS === 'android';

const Android = styled.TextInput`
  width: ${width / 1.5}px;
  padding: 5px 20px;
  border: 1px solid grey;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Ios = styled.TextInput`
  width: ${width / 1.5}px;
  padding: 8px 20px;
  border: 1px solid grey;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Input = ({
  value,
  placeholder,
  isPassword = false,
  autoCapitalize,
  stateFn,
  keyboardType,
}) =>
  isAndroid ? (
    <Android
      keyboardType={keyboardType}
      value={value}
      placeholder={placeholder}
      secureTextEntry={isPassword ? true : false}
      autoCapitalize={autoCapitalize}
      onChangeText={text => stateFn(text)}
    />
  ) : (
    <Ios
      keyboardType={keyboardType}
      value={value}
      placeholder={placeholder}
      secureTextEntry={isPassword ? true : false}
      autoCapitalize={autoCapitalize}
      onChangeText={text => stateFn(text)}
    />
  );

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  stateFn: PropTypes.func.isRequired,
};

export default Input;
