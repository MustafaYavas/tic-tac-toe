import { createSlice } from '@reduxjs/toolkit';

const initialGameState = {
    xValues: [],
    oValues: [],
    winner: null,
    player1WinCount: 0,
    player2WinCount: 0,
    drawCount: 0,
}


const gameSlice = createSlice({
    name: 'game',
    initialState: initialGameState,
    reducers: {
        addValue(state, action) {
            if(action.payload.type === 'x') {
                state.xValues.push(action.payload.value);
                state.xValues = state.xValues.sort((a, b) => {return a - b})
            }
            else {
                state.oValues.push(action.payload.value);
                state.oValues = state.oValues.sort((a, b) => {return a - b})
            } 
        },

        clearValues(state) {
            state.xValues = [];
            state.oValues = [];
            state.winner = null;
        },

        setWinner(state, action) {
            state.winner = action.payload;
            if(action.payload === 'Player 1') state.player1WinCount++;
            else if(action.payload === 'Player 2') state.player2WinCount++;
            else state.drawCount++;
            
        }
    }
});

export const gameActions = gameSlice.actions;
export default gameSlice;