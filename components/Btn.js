import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  rgba,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import colors from '../colors';

const {width} = Dimensions.get('screen');

const Button = styled.View`
  margin-bottom: 10px;
  border: 1px solid ${props => (props.accent ? 'transparent' : colors.black)};
  border-radius: 10px;
  padding: 10px 0px;
  align-items: center;
  width: ${width / 6}px;
  background-color: ${props => (props.accent ? colors.red : 'transparent')};
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: ${props => (props.accent ? 'white' : colors.black)};
`;

const Text_five = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
`;

//<ActivityIndicator color={accent ? 'white' : 'black'} />
const Btn = ({
  loading = false,
  onPress,
  text,
  accent = false,
  prevent = false,
}) => (
  <TouchableOpacity onPress={prevent ? null : onPress}>
    <Button accent={accent}>
      {loading ? (
        <ActivityIndicator color={accent ? 'white' : 'black'} />
      ) : prevent ? (
        <Text_five accent={accent}>{text}</Text_five>
      ) : (
        <Text accent={accent}>{text}</Text>
      )}
    </Button>
  </TouchableOpacity>
);

Btn.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  accent: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Btn;
