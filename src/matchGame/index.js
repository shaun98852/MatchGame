import {Component} from 'react'

import './index.css'

import ThumbnailListItems from '../ThumbnailListItems'

import WinOrLostPage from '../WonOrLost'

import Tabs from '../Tabs'

class MatchGame extends Component {
  state = {
    time: 60,
    score: 0,
    Won: false,
    category: '',
    requiredId: '',
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    const {time} = this.state
    if (time === 0) {
      clearInterval(this.timerId)
    } else {
      this.setState(prevState => ({time: prevState.time - 1}))
    }
  }

  categoryChange = cate => {
    this.setState({category: cate})
  }

  resetFunction = () => {
    this.setState({
      time: 60,
      score: 0,
      category: '',
      Won: false,
      requiredId: '',
    })

    this.componentDidMount()
  }

  generateImageId = () => {
    const {imagesList} = this.props
    const values = Math.ceil(Math.random() * imagesList.length)
    const value = imagesList[values].id

    return value
  }

  matchThumbnail = id => {
    const {requiredId} = this.state
    const {imagesList} = this.props
    const getValue = this.generateImageId()
    if (requiredId === '') {
      if (id === imagesList[0].id) {
        this.setState(prevState => ({
          score: prevState.score + 1,
          requiredId: getValue,
        }))
      } else {
        this.setState({Won: true, time: 0})
      }
    } else if (id === requiredId) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        requiredId: getValue,
      }))
    } else {
      this.setState({Won: true, time: 0})
    }
  }

  render() {
    const {imagesList, tabsList} = this.props

    const {category, time, score, Won, requiredId} = this.state
    const requiredCategory = category === '' ? tabsList[0].tabId : category

    const fruitList = imagesList.filter(
      eachItem => eachItem.category === requiredCategory,
    )

    const findObject = imagesList.find(eachItem => eachItem.id === requiredId)

    const toMatchUrl =
      requiredId === '' ? imagesList[0].imageUrl : findObject.imageUrl

    return (
      <>
        <div className="navbar">
          <ul className="navbarSection">
            <li className="classImage">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                className="gameImage"
                alt="website logo"
              />
            </li>

            <li className="scoresSection">
              <p className="score">
                Score: <span className="spanElement">{score}</span>
              </p>

              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                className="timerImage"
                alt="timer"
              />
              <p className="time">{time} sec</p>
            </li>
          </ul>
        </div>
        {(time === 0 || Won) && (
          <WinOrLostPage score={score} functionReset={this.resetFunction} />
        )}
        {time > 0 && (
          <div className="bgContainer">
            <div className="imageContainer">
              <img src={toMatchUrl} className="imageIdentify" alt="match" />
            </div>

            <ul className="tabsSection">
              {tabsList.map(eachItem => (
                <Tabs
                  listItem={eachItem}
                  category={requiredCategory}
                  requiredFunction={this.categoryChange}
                  key={eachItem.tabId}
                />
              ))}
            </ul>

            <div className="thumbnailSection">
              <ul className="unorderedList">
                {fruitList.map(eachItem => (
                  <ThumbnailListItems
                    Items={eachItem}
                    matchingFunction={this.matchThumbnail}
                    key={eachItem.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default MatchGame
