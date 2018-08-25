import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Call from './components/Call';
import Block from './components/Block';

export default class App extends React.Component {
  state = {
    board: [
    [
    	{ value: 1, access: 2},
    	{ value: 2, access: 0},
    	{ value: 3, access: 1},
    	{ value: 4, access: 0},
    	{ value: 5, access: 0},
    	{ value: 6, access: 0},
    	{ value: 7, access: 0},
    	{ value: 8, access: 0},
    	{ value: 9, access: 2},
    ],[
    	{ value: 6, access: 2},
    	{ value: 7, access: 0},
    	{ value: 5, access: 0},
    	{ value: 4, access: 0},
    	{ value: 3, access: 1},
    	{ value: 9, access: 0},
    	{ value: 2, access: 1},
    	{ value: 8, access: 0},
    	{ value: 1, access: 2},
    ],[
    	{ value: 3, access: 0},
    	{ value: 2, access: 0},
    	{ value: 4, access: 2},
    	{ value: 1, access: 0},
    	{ value: 5, access: 1},
    	{ value: 9, access: 1},
    	{ value: 7, access: 1},
    	{ value: 8, access: 0},
    	{ value: 6, access: 0},
    ],[
    	{ value: 1, access: 2},
    	{ value: 2, access: 0},
    	{ value: 3, access: 1},
    	{ value: 4, access: 0},
    	{ value: 5, access: 0},
    	{ value: 6, access: 0},
    	{ value: 7, access: 0},
    	{ value: 8, access: 0},
    	{ value: 9, access: 2},
    ],[
    	{ value: 6, access: 2},
    	{ value: 7, access: 0},
    	{ value: 5, access: 0},
    	{ value: 4, access: 0},
    	{ value: 3, access: 1},
    	{ value: 9, access: 0},
    	{ value: 2, access: 1},
    	{ value: 8, access: 0},
    	{ value: 1, access: 2},
    ],[
    	{ value: 3, access: 0},
    	{ value: 2, access: 0},
    	{ value: 4, access: 2},
    	{ value: 1, access: 0},
    	{ value: 5, access: 1},
    	{ value: 9, access: 1},
    	{ value: 7, access: 1},
    	{ value: 8, access: 0},
    	{ value: 6, access: 1},
    ],[
        { value: 1, access: 2},
        { value: 2, access: 0},
        { value: 3, access: 1},
        { value: 4, access: 0},
        { value: 5, access: 0},
        { value: 6, access: 0},
        { value: 7, access: 0},
        { value: 8, access: 0},
        { value: 9, access: 2},
    ],[
        { value: 6, access: 2},
        { value: 7, access: 0},
        { value: 5, access: 0},
        { value: 4, access: 0},
        { value: 3, access: 1},
        { value: 9, access: 0},
        { value: 2, access: 1},
        { value: 8, access: 0},
        { value: 1, access: 2},
    ],[
        { value: 3, access: 0},
        { value: 2, access: 0},
        { value: 4, access: 2},
        { value: 1, access: 0},
        { value: 5, access: 1},
        { value: 9, access: 1},
        { value: 7, access: 1},
        { value: 8, access: 0},
        { value: 6, access: 0},
    ],]
  }

	handleChangeCall = (block, call, value) => {
		const board = this.state.board;
		board[block][call].value = value;
		board[block][call].access = 2;
		//console.log(board)
		this.setState({
			board: [...board],
		});
	}

  render() {
      const lineArr=[0,1,2];
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sudoku</Text>
        </View>
        <View style={styles.board}>
        {
            lineArr.map(ind => (
                <View key={ind} style={styles.boardLines}>
                {
                    this.state.board.slice(ind * 3, (ind * 3) + 3).map((call, mapInd) => (
                        <Block
                            calls={call}
                            onChangeCall={this.handleChangeCall}
                            index={(ind * 3) + mapInd}
                            key={(ind * 3) + mapInd}
                        />
                    ))
                }
                </View>
            ))
        }
        </View>
        <View style={styles.footer}>
          <Button title="New" onPress={() => 5}></Button>
          <Button title="Cancel" onPress={() => 5}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 10,
    
    //color: '#777',
    // backgroundColor: '#aaa',
    //fontSize: 60,
    //textAlign: 'center'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
  },
  board: {
    height: 375,
    flex: 0,
  	backgroundColor: '#aaa',
	flexDirection: 'column',
  	justifyContent: 'flex-start',
  },
  boardLines: {
    flex: 1,
  	flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  footer: {
	flexDirection: 'row',
	justifyContent: 'space-around',
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
