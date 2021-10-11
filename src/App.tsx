// Styles
import './App.css'

// Libs
import React from 'react'

// App
import { segmentKey, ViewPanes } from './constants'
import { AppContext, appDefaultState, IAppContext } from './context'
import {
  syncState,
  findActiveView,
  getDefaultEmail,
  getDefaultOrganizationName,
  getDefaultVcode,
  getDefaultFirstName,
  getDefaultLastName,
} from './helpers'
import browserHistory from './history'
import { SegmentAnalytics } from './analytics'

// Pages
// import GettingStarted from './pages/getting-started'
import CreateUser from './pages/create-user'
import ConfirmAndDeploy from './pages/confirm-and-deploy'

const viewByActiveType = {
  [ViewPanes.GettingStarted]: CreateUser,
  [ViewPanes.CreateUser]: CreateUser,
  [ViewPanes.ConfirmAndDeploy]: ConfirmAndDeploy,
}

const defaultState = {
  ...appDefaultState,
  activePane: ViewPanes.CreateUser,
  user: {
    firstName: getDefaultFirstName() || '',
    lastName: getDefaultLastName() || '',
    organizationName: getDefaultOrganizationName() || '',
    organizationEmail: getDefaultEmail() || '',
  },
  embarkUser: {
    vcode: getDefaultVcode() || '',
    password: '',
    confirmPassword: '',
  },
}

class App extends React.Component<any, IAppContext> {
  componentDidMount() {
    SegmentAnalytics.init(segmentKey)
    window.addEventListener('popstate', this.handleLocationChange)
    browserHistory.onChange((route, action) => {
      // these location changes are only a search change because I don't control
      // the parent app's routing.
      const params = new URLSearchParams(route.location.search)
      const activePane = params.get('view') as ViewPanes
      this.setState({ activePane })
    })
    const activePane = findActiveView(this.state)
    if (activePane && activePane !== this.state.activePane) {
      this.setState({ activePane })
    }
  }

  handleLocationChange = (e: PopStateEvent) => {
    this.forceUpdate()
  }

  setContextValue = (payload) => {
    this.setState(payload, () => {
      if (this.state.activePane !== ViewPanes.ConfirmAndDeploy) {
        syncState(this.state)
      }
    })
  }

  state = {
    ...defaultState,
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
