import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './GameBoard.module.css';
import { gameActions } from '../../store/game-slice';

const xMark = `<i class='fa-solid fa-x text-light fs-1 ${styles['click-disable']}'></i>`;
const oMark = `<i class='fa-solid fa-o text-light fs-1 ${styles['click-disable']}'></i>`;

const GameBoard = () => {
    const [icon, setIcon] = useState(xMark);
    const [winConditions] = useState([
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ]);
    const [valueAssignable, setValueAssignable] = useState(true);
    const gameState = useSelector(state =>  state.game);
    const dispatch = useDispatch();

    const assignIconToButtonHandler = (e) => {
        
        if(!gameState.winner) {
            if(e.target.innerHTML.length === 0) {
                addValueToStore(icon.includes('fa-x')?'x':'o', parseInt(e.target.value))
                e.target.innerHTML = icon;
                setIcon(icon === xMark ? oMark : xMark);
            }
        }
    }

    const addValueToStore = (type, value) => {
        dispatch(gameActions.addValue({type, value}));
    }

    useEffect(() => {
        // check if 3 boxes in a row are the same icon
        if(icon.includes('fa-o')) {
            if(gameState.xValues.length >= 3 ) {
                for(let i=0; i<winConditions.length; i++){
                    if(JSON.stringify(winConditions[i]) === JSON.stringify(gameState.xValues.slice(0,3))){
                        dispatch(gameActions.setWinner('Player 1'));
                        return;
                    }
                }
            }
        } else {
            if(gameState.oValues.length >= 3) {
                for(let j=0; j<winConditions.length; j++){
                    if(JSON.stringify(winConditions[j]) === JSON.stringify(gameState.oValues.slice(0,3))){
                        dispatch(gameActions.setWinner('Player 2'));
                        return;
                    }
                }
            }   
        }
    }, [icon, dispatch, gameState.xValues, gameState.oValues, winConditions]);

    useEffect(() => {
        setValueAssignable(true);
        if((gameState.xValues.length+gameState.oValues.length === 9 && !gameState.winner)){
            dispatch(gameActions.setWinner('Draw'));
        }
    }, [gameState.xValues, gameState.oValues, dispatch, gameState.winner])


    const resetGameHandler = () => {
        dispatch(gameActions.clearValues());
        setIcon(xMark);
        setValueAssignable(false)
    }


    return (
        <>
            {
                !gameState.winner &&
                <p className='text-light text-center mt-3 fs-3'>
                    <span className={icon===`${xMark}`?'text-info':'text-danger'}>{icon===`${xMark}`? 'Player 1' : 'Player 2'}</span> is Playing !
                </p>
            }

            {
                (gameState.winner!=='Draw' && gameState.winner) && 
                <p className='text-light text-center mt-3 fs-3'>
                    <span className={icon===`${xMark}`?'text-danger':'text-info'}>{icon===`${xMark}`? 'Player 2' : 'Player 1'}</span> Win !
                </p>
            }
            {
                gameState.winner==='Draw' && 
                <p className='text-secondary text-center mt-3 fs-3'>
                    Draw
                </p>
            }
            <div className={`${styles['margin-y']} col- d-flex justify-content-center`}>
                <div className={`container text-light ${styles['container-width']}`}>
                    <div className={`row ${styles['row-container']} ${styles['row-height']}`}>
                        <button 
                            value='1'
                            className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>

                        <button  
                            value='2'
                            className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>
                            
                        <button  
                            value='3'
                            className={`col-4 ${styles['row-item-flex']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>

                        <button  
                            value='4'
                            className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                            onClick={assignIconToButtonHandler}    
                        >
                            {valueAssignable===false && ''}
                        </button>

                        <button  
                            value='5'
                            className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                            onClick={assignIconToButtonHandler}    
                        >
                            {valueAssignable===false && ''}
                        </button>
                        
                        <button  
                            value='6'
                            className={`col-4 ${styles['row-item-flex']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>

                        <button  
                            value='7'
                            className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['row-item-height']}`}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>
                        
                        <button  
                            value='8'
                            className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['row-item-height']}`}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>

                        <button  
                            value='9'
                            className={`col-4 ${styles['row-item-flex']} ${styles['row-item-height']}`}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>
                    </div>
                </div>
            </div>
            
            {
                gameState.winner && <div className='d-flex justify-content-center'>
                    <button onClick={resetGameHandler} className='btn btn-outline-success'>Start new game!</button>
                </div>
            }
        </>
    )
}

export default GameBoard;