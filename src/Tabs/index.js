const Tabs = props => {
  const {listItem, category, requiredFunction} = props
  const {displayText, tabId} = listItem
  const showOrHide = category === tabId ? 'showButton' : ''

  const changeCategory = () => {
    requiredFunction(tabId)
  }

  return (
    <li>
      <button
        className={`fruitsButton ${showOrHide}`}
        type="button"
        onClick={changeCategory}
      >
        {displayText}
      </button>
    </li>
  )
}

export default Tabs
