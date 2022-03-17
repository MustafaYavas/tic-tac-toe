

const ScoreBoard = () => {
    return (
        <div className='text-light d-flex justify-content-evenly align-items-center mt-5'>
            <div>
                <h3><i className='fa-solid fa-user'></i></h3>
                <h4 className='text-center'>1</h4>
            </div>

            <div>
                <h3>Game</h3>
                <h4 className='text-center'>1</h4>
            </div>
            
            <div>
                <h3><i className='fa-solid fa-robot'></i></h3>
                <h4 className='text-center'>0</h4>
            </div>
        </div>
    )
}

export default ScoreBoard;