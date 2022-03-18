import { useState } from 'react';

import styles from './GameBoard.module.css';


const xMark = `<i class='fa-solid fa-x text-light fs-1 ${styles['click-disable']}'></i>`;
const oMark = `<i class='fa-solid fa-o text-light fs-1 ${styles['click-disable']}'></i>`;

const GameBoard = () => {
    const [icon, setIcon] = useState(xMark)

    const changeContentHandler = (e) => {
        if(e.target.innerHTML.length === 0) {
            e.target.innerHTML = icon;
            setIcon(icon === xMark ? oMark : xMark);
        }
    }

    return (
        <div className={`${styles['margin-y']} d-flex justify-content-center`}>

            <div className={`container text-light ${styles['container-width']}`}>
                <div className={`row ${styles['row-height']}`}>
                    <div 
                        className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                        onClick={changeContentHandler}
                    ></div>

                    <div 
                        className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                        onClick={changeContentHandler}
                    ></div>
                        
                    <div 
                        className={`col-4 ${styles['row-item-flex']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                        onClick={changeContentHandler}
                    ></div>

                    <div 
                        className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                        onClick={changeContentHandler}    
                    ></div>

                    <div 
                        className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                        onClick={changeContentHandler}    
                    ></div>
                    
                    <div 
                        className={`col-4 ${styles['row-item-flex']} ${styles['border-bottom']} ${styles['row-item-height']}`}
                        onClick={changeContentHandler}
                    ></div>

                    <div 
                        className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['row-item-height']}`}
                        onClick={changeContentHandler}
                    ></div>
                    
                    <div 
                        className={`col-4 ${styles['row-item-flex']} ${styles['border-right']} ${styles['row-item-height']}`}
                        onClick={changeContentHandler}
                    ></div>

                    <div 
                        className={`col-4 ${styles['row-item-flex']} ${styles['row-item-height']}`}
                        onClick={changeContentHandler}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default GameBoard;