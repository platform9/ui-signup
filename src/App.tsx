import React from 'react'
import './App.css'
// import logo from './logo.svg'
import GettingStarted from './pages/getting-started'
import CreateUser from './pages/create-user'
import ConfirmAndDeploy from './pages/confirm-and-deploy'
import { ViewPanes } from './constants'
import { AppContext, appDefaultState, IAppContext } from './context'

const viewByActiveType = {
  [ViewPanes.GettingStarted]: GettingStarted,
  [ViewPanes.CreateUser]: CreateUser,
  [ViewPanes.ConfirmAndDeploy]: ConfirmAndDeploy,
}

class App extends React.Component<any, IAppContext> {
  componentDidMount() {
    window.addEventListener('popstate', this.handleLocationChange)
  }

  handleLocationChange = (e: PopStateEvent) => {
    // TODO: handle location change
  }

  setContextValue = (payload) => {
    this.setState(payload)
  }

  state = {
    ...appDefaultState,
    activePane: ViewPanes.GettingStarted,
    user: {
      firstName: '',
      lastName: '',
      organizationName: '',
      organizationEmail: '',
    },

    setContextValue: this.setContextValue,
  }

  render() {
    const ActiveView = viewByActiveType[this.state.activePane]
    return (
      <AppContext.Provider value={this.state}>
        <main id="uiSignupAppMainEntry">
          <ActiveView />
        </main>
      </AppContext.Provider>
    )
  }
}

export default App
