import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Call from './components/Call';
import Block from './components/Block';
import utils from './utils';

export default class App extends React.Component {
  state = {
    config: {
        score: 4,

        scoreType: {
            3: [2, 3, 4],
            4: [3, 4, 5],
            5: [4, 5, 6],
            6: [5, 6, 7],
            7: [6, 7, 8],
        }
    },
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

handleGenerateBoard = () => {
    let newBoard = new Array(9).reduce((board, _, indexBlock) => {
        //generate count visible calls
        const countVisibleCalls = utils.generateNumberBetween(this.state.config.score - 1, this.state.config.score + 1);
        let arrVisibleCalls = [];

        do {
            //generate index fo visible calls
            let numberCall = utils.generateNumberBetween(0, 8);
            if (!arrVisibleCalls.includes(numberCall)) {
                arrVisibleCalls.push(numberCall);
                --countVisibleCalls;
            }
        } while (countVisibleCalls)

        //generate new block
        return [ ...board, new Array(9).map((_, indexCall) => {
            //generate number for calls
            return { value: indexCall, access: arrVisibleCalls.includes(indexCall) ? 2 : 0}
        })];
    },[]);


    this.setState({
        board: newBoard
    });
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
                <Button title="New" onPress={() => this.handleGenerateBoard()}></Button>
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
