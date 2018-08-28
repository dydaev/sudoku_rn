import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Call from './components/Call';
import Block from './components/Block';
import utils from './utils';

export default class App extends React.Component {
    state = {
        board: [],
        total: 0,
        config: {
            score: 4,
        }
    }


handleGenerateBoard = () => {
    let newBoard = new Array(9).fill(0).reduce((board, _, indexBlock, crr) => {
        //generate count visible calls
        let countVisibleCalls = utils.generateNumberBetween(this.state.config.score - 1, this.state.config.score + 1);
        let arrVisibleCalls = [];

        do {
            //generate index fo visible calls
            let numberVisibleCall = utils.generateNumberBetween(0, 8);

            if (!arrVisibleCalls.includes(numberVisibleCall)) {
                arrVisibleCalls.push(numberVisibleCall);
                --countVisibleCalls;
            }
        } while (countVisibleCalls)
        
        //generate new block
        let block = [];
        let endNumber = 45;
        
        do {
            const numberForCall = block.length < 8
            ? utils.generateNumberBetween(1, 9)
            : endNumber;

            const isOnlyInBlock = !utils.isValueInArray(numberForCall, block);

            const isOnlyInColumn = !utils.isValueInArray(
                numberForCall,
                utils.getColumn(utils.getNumberColumn(indexBlock, block.length), board)
            );
            const isOnlyInRow = !utils.isValueInArray(
                numberForCall,
                utils.getRow(utils.getNumberRow(indexBlock, block.length), board)
            );
// console.log(
//     'block:'+ indexBlock,
//     'call:' + block.length, 
//     'column:' + utils.getNumberColumn(indexBlock, block.length),
//     'row:' + utils.getNumberRow(indexBlock, block.length)
//     , isOnlyInBlock
//     , isOnlyInRow 
//     );
            if (isOnlyInBlock) {//&& (isOnlyInRow || indexBlock > 2)){//&& isOnlyInRow) {
                endNumber = endNumber - numberForCall;
                block.push({
                    value: numberForCall,
                    access: arrVisibleCalls.includes(block.length) ? 1 : 0 
                });
            }
        } while (block.length < 9)

        return [ ...board, [...block] ];
    },[]);
//console.log(utils.getColumn(7,newBoard))
//console.log(utils.getRow(7, newBoard));
//console.log(newBoard)
    this.setState({
        board: newBoard,
        total: 0,
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
      //this.handleGenerateBoard();
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
