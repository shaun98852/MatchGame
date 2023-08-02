const WinOrLostPage = props => {
  const {score, functionReset} = props

  const resetFunction = () => {
    functionReset()
  }

  return (
    <div className="winnerBackground">
      <div className="purpleBg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          className="tropyImage"
          alt="trophy"
        />

        <p className="yourscore">YOUR SCORE</p>
        <h1 className="scoreValue">{score}</h1>
        <div className="buttonBox">
          <button className="playAgain" onClick={resetFunction} type="button">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
              className="resetImage"
              alt="reset"
            />
            <p className="resetText">PLAY AGAIN</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WinOrLostPage
