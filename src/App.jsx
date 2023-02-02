import React from 'react'
import css from './styles/App.module.scss'
import Home from './screens/Home'


const App = () => {
  return (
    <div className={`bg-primary ${css.container}`}>
      <Home />
    </div>
  )
}

export default App