import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';

import Call from './components/Call';
import Block from './components/Block';
import utils from './utils';

export default class App extends React.Component {

    state = {
        board: [],
        total: 0,
        config: {
            score: 5,
        }
    }

    getArrayBlocksBoard = () => {
        return this.state.board.reduce((board,block) => 
            [ ...board, block.map(call => (call.value * 1))], [])
    }

    getArrayLinesBoard = () => {
        return utils.LinesBlocksConverter(this.getArrayBlocksBoard())
    } 

    handleCheckBoard = () => {
        let isGood;

        if (this.state.board.length) {
            const blocksBoard = this.getArrayBlocksBoard();
            const linesBoard = this.getArrayLinesBoard();

            let i = 0;
            do {
                const line = linesBoard[i];
                const column = utils.getColumn(linesBoard, i);
                const square = blocksBoard[i];

                isGood = (
                    utils.uniq(line).length === 9 &&
                    utils.uniq(column).length === 9 &&
                    utils.uniq(square).length === 9
                );
                //console.log(utils.uniq(line).length, utils.uniq(column).length, utils.uniq(square).length, i, isGood)
            } while (isGood && ++i < 9)
        }
        console.log('board', isGood)
        return isGood;
    }

    handleResetBoard = () => {
        this.setState({
            board: this.state.board.map(block => block.map(call => 
                call.access !== 2
                ? call
                : { ...call, value: 0 }))
        });
    }

    handleGenerateBoard = () => {
        const board = utils.getRows([], []);

        let newBoard = board.map((line, lineIndex) => {
            let countVisibleCalls = utils.getRandom(this.state.config.score - 1, this.state.config.score + 1);
            let arrVisibleCalls = [];

            do {
                //generate index fo visible calls
                const numberVisibleCall = utils.getRandom(0, 8);

                if (!arrVisibleCalls.includes(numberVisibleCall)) {
                    arrVisibleCalls.push(numberVisibleCall);
                    --countVisibleCalls;
                }
            } while (countVisibleCalls)

            return line.map((call, callIndex) => (arrVisibleCalls.includes(callIndex)
            ? {value: call, access: 1}
            : {value: 0, access: 0})
            );
        });

        newBoard = utils.LinesBlocksConverter(newBoard);

        this.setState({
            board: newBoard,
            total: 0,
        });
    }

    handleChangeCall = (block, call, value) => {
        const board = this.state.board;
        board[block][call].value = value;
        board[block][call].access = 2;

    	this.setState({
    		board: [...board],
    	});
        this.handleCheckBoard();
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
                <View style={styles.footerButtonsContainer}>
                    <Button style={{fontSize: 30, color: 'gray'}} onPress={() => this.handleGenerateBoard()}>New</Button>
                </View>
                <View style={styles.footerButtonsContainer}>
                    <Button style={{fontSize: 30, color: 'gray'}} onPress={() => this.handleResetBoard()}>Reset</Button>
                </View>
            </View>
        </View>
        );
  }
}

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        marginBottom: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 35,
    },
    board: {
        height: 375,
        flex: 0,
        backgroundColor: 'gray',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    boardLines: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    footer: {
        padding: 10,
        flex: 1,
    	flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
    },
    footerButtonsContainer: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-around',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
});
