import React from 'react';
import { View, Text } from 'react-native';

import Call from './Call';

const styles = {
	block: {
		//height: 120,
		width: 120,
		borderColor: '#555',
		borderWidth: 1,
		//marginTop: 1,
	},
	line: {
		//marginTop: 1,
		flex:1,
		flexDirection: 'row',
	}
};

const calls2d = calls => calls.reduce((acc, call, ind) => {
	acc[~~(ind / 3)].push(call);
	return acc
}, [[],[],[]])

const Line = ({ lineCalls, block, line, onChangeValue }) => (
	<View style={styles.line}>
	{
		lineCalls.map((call, ind) => (
			<Call
				{...call}
				index={ind}
				line={line}
				block={block}
				onChangeValue={onChangeValue}
				key={ind}
			/>
		))
	}
	</View>
)

export default ({ calls, index, onChangeCall }) => (
	<View
		style={styles.block}
	>
		{
			!calls
			?<Text>No data</Text>
			:calls2d(calls).map((lineCalls, ind) => (
				<Line
					lineCalls={lineCalls}
					block={index}
					line={ind}
					onChangeValue={onChangeCall}
					key={ind}
				/>
			))
		}
	</View>
)

