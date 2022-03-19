import gameSlice from './game-slice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {game: gameSlice.reducer}
})

export default store;