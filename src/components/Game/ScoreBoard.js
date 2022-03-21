import { useSelector } from "react-redux";

const ScoreBoard = () => {
    const gameState = useSelector(state => state.game);

    
    return (
        <div className='text-light d-flex justify-content-evenly align-items-center mt-5'>
            <div>
                <h3><i className='fa-solid fa-user text-info' /></h3>
                <h4 className='text-center text-info'>{gameState.player1WinCount}</h4>
            </div>

            <div>
                <h3><i className='fa-solid fa-xmark text-secondary'></i>  </h3>
                <h4 className='text-center text-secondary'>{gameState.drawCount}</h4>
            </div>
            
            <div>
                <h3><i className='fa-solid fa-user text-danger' /></h3>
                <h4 className='text-center text-danger'>{gameState.player2WinCount}</h4>
            </div>
        </div>
    )
}

export default ScoreBoard;