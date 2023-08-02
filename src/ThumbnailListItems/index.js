const ThumbnailListItems = props => {
  const {Items, matchingFunction} = props
  const {thumbnailUrl, id} = Items

  const matchId = () => {
    matchingFunction(id)
  }

  return (
    <li className="listItems">
      <button className="imageButton" onClick={matchId} type="button">
        <img src={thumbnailUrl} className="images" alt="thumbnail" />
      </button>
    </li>
  )
}

export default ThumbnailListItems
