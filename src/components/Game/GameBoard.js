import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './GameBoard.module.css';
import { gameActions } from '../../store/game-slice';

const xMark = `<i class='fa-solid fa-x text-light fs-1 bg-transparent ${styles['click-disable']}'></i>`;
const oMark = `<i class='fa-solid fa-o text-light fs-1 bg-transparent ${styles['click-disable']}'></i>`;

const GameBoard = () => {
    const box1 = useRef(1); const box2 = useRef(2); const box3 = useRef(3); const box4 = useRef(4); const box5 = useRef(5);
    const box6 = useRef(6); const box7 = useRef(7); const box8 = useRef(8); const box9 = useRef(9);
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
    const [animationBoxes, setAnimationBoxes] = useState([])
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
                        setAnimationBoxes(winConditions[i])
                        return;
                    }
                }
            }
        } else {
            if(gameState.oValues.length >= 3) {
                for(let j=0; j<winConditions.length; j++){
                    if(JSON.stringify(winConditions[j]) === JSON.stringify(gameState.oValues.slice(0,3))){
                        dispatch(gameActions.setWinner('Player 2'));
                        setAnimationBoxes(winConditions[j])
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
        setValueAssignable(false);
        setAnimationBoxes([])
    }

    const Player1Win = `${styles['box-rotate']} bg-info`;
    const Player2Win = `${styles['box-rotate']} bg-danger`;


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
                            value={box1.current}
                            className={`
                                col-4 
                                ${styles['row-item-flex']} 
                                ${styles['border-right']} 
                                ${styles['border-bottom']} 
                                ${styles['row-item-height']} 
                                ${(animationBoxes.includes(box1.current) && gameState.winner==='Player 1') ? Player1Win : ''}
                                ${(animationBoxes.includes(box1.current) && gameState.winner==='Player 2') ? Player2Win : ''}
                            `}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>

                        <button  
                            value={box2.current}
                            className={`
                                col-4 
                                ${styles['row-item-flex']} 
                                ${styles['border-right']} 
                                ${styles['border-bottom']} 
                                ${styles['row-item-height']} 
                                ${(animationBoxes.includes(box2.current) && gameState.winner==='Player 1') ? Player1Win : ''}
                                ${(animationBoxes.includes(box2.current) && gameState.winner==='Player 2') ? Player2Win : ''}
                            `}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>
                            
                        <button  
                            value={box3.current}
                            className={`
                                col-4 
                                ${styles['row-item-flex']} 
                                ${styles['border-bottom']} 
                                ${styles['row-item-height']} 
                                ${(animationBoxes.includes(box3.current) && gameState.winner==='Player 1') ? Player1Win : ''}
                                ${(animationBoxes.includes(box3.current) && gameState.winner==='Player 2') ? Player2Win : ''}
                            `}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>

                        <button  
                            value={box4.current}
                            className={`
                                col-4 
                                ${styles['row-item-flex']} 
                                ${styles['border-right']} 
                                ${styles['border-bottom']} 
                                ${styles['row-item-height']} 
                                ${(animationBoxes.includes(box4.current) && gameState.winner==='Player 1') ? Player1Win : ''}
                                ${(animationBoxes.includes(box4.current) && gameState.winner==='Player 2') ? Player2Win : ''}
                            `}
                            onClick={assignIconToButtonHandler}    
                        >
                            {valueAssignable===false && ''}
                        </button>

                        <button  
                            value={box5.current}
                            className={`
                                col-4 
                                ${styles['row-item-flex']} 
                                ${styles['border-right']} 
                                ${styles['border-bottom']} 
                                ${styles['row-item-height']} 
                                ${(animationBoxes.includes(box5.current) && gameState.winner==='Player 1') ? Player1Win : ''}
                                ${(animationBoxes.includes(box5.current) && gameState.winner==='Player 2') ? Player2Win : ''}
                            `}
                            onClick={assignIconToButtonHandler}    
                        >
                            {valueAssignable===false && ''}
                        </button>
                        
                        <button  
                            value={box6.current}
                            className={`
                                col-4 
                                ${styles['row-item-flex']} 
                                ${styles['border-bottom']} 
                                ${styles['row-item-height']} 
                                ${(animationBoxes.includes(box6.current) && gameState.winner==='Player 1') ? Player1Win : ''}
                                ${(animationBoxes.includes(box6.current) && gameState.winner==='Player 2') ? Player2Win : ''}
                            `}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>

                        <button  
                            value={box7.current}
                            className={`
                                col-4 
                                ${styles['row-item-flex']} 
                                ${styles['border-right']} 
                                ${styles['row-item-height']} 
                                ${(animationBoxes.includes(box7.current) && gameState.winner==='Player 1') ? Player1Win : ''}
                                ${(animationBoxes.includes(box7.current) && gameState.winner==='Player 2') ? Player2Win : ''}
                            `}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>
                        
                        <button  
                            value={box8.current}
                            className={`
                                col-4 
                                ${styles['row-item-flex']} 
                                ${styles['border-right']} 
                                ${styles['row-item-height']} 
                                ${(animationBoxes.includes(box8.current) && gameState.winner==='Player 1') ? Player1Win : ''}
                                ${(animationBoxes.includes(box8.current) && gameState.winner==='Player 2') ? Player2Win : ''}
                            `}
                            onClick={assignIconToButtonHandler}
                        >
                            {valueAssignable===false && ''}
                        </button>

                        <button  
                            value={box9.current}
                            className={`
                                col-4 
                                ${styles['row-item-flex']} 
                                ${styles['row-item-height']} 
                                ${(animationBoxes.includes(box9.current) && gameState.winner==='Player 1') ? Player1Win : ''}
                                ${(animationBoxes.includes(box9.current) && gameState.winner==='Player 2') ? Player2Win : ''}
                            `}
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