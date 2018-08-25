import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = {
	height: 40,
	//width: 40,
	flex: 1,
	borderColor: 'gray',
	borderWidth: 1,
	textAlign: 'center',
	fontSize: 30,
};
export default class Names extends React.PureComponent {
	handleChangeValue = (text) => {
		const { block, line, index, onChangeValue } = this.props;

		const value = text.match(/[1-9]/g);
		onChangeValue(block, (line * 3) + index, value !== null ? value[value.length - 1] : '');
	}

  render() {
  	const { access, value } = this.props;

    return (	<TextInput
		style={{ ...styles, backgroundColor: access === 1 ? '#ddd' : '#fff' }}
		onChangeText={(text) => this.handleChangeValue(text)}
		editable={access !== 1 ? true : false}
		keyboardType='numeric'
		maxLength={2}
		underlineColorAndroid='rgba(0,0,0,0)'
		value={access !== 0 ? value.toString() : ''}
	/>);
  }
}



