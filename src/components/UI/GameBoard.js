import styles from './GameBoard.module.css'

const GameBoard = () => {
    return (
        <div className={`${styles.container} ${styles['container-margin-top']}`}>

            <div className={styles['border-bottom']}>
                <button className={styles['border-right']}/>
                <button className={styles['border-right']}/>
                <button/>
            </div>
            
            <div className={styles['border-bottom']}>
                <button className={styles['border-right']}/>
                <button className={styles['border-right']}/>
                <button/>
            </div>

            <div>
                <button className={styles['border-right']}/>
                <button className={styles['border-right']}/>
                <button/>
            </div>
            
        </div>
    )
}

export default GameBoard;