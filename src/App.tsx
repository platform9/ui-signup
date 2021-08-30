// Styles
import './App.css'

// Libs
import React from 'react'

// App
import { segmentKey, ViewPanes } from './constants'
import { AppContext, appDefaultState, IAppContext } from './context'
import { syncState, rehydrateState, findActiveView } from './helpers'
import browserHistory from './history'
import { SegmentAnalytics } from './analytics'

// Pages
import GettingStarted from './pages/getting-started'
import CreateUser from './pages/create-user'
import ConfirmAndDeploy from './pages/confirm-and-deploy'

// Elements
import Text from './elements/text'

const viewByActiveType = {
  [ViewPanes.GettingStarted]: GettingStarted,
  [ViewPanes.CreateUser]: CreateUser,
  [ViewPanes.ConfirmAndDeploy]: ConfirmAndDeploy,
}

const defaultState = {
  ...appDefaultState,
  activePane: ViewPanes.GettingStarted,
  user: {
    firstName: '',
    lastName: '',
    organizationName: '',
    organizationEmail: '',
  },
  embarkUser: {
    vcode: '',
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
    ...rehydrateState(defaultState),
    setContextValue: this.setContextValue,
  }

  render() {
    const ActiveView = viewByActiveType[this.state.activePane]
    return (
      <AppContext.Provider value={this.state}>
        <main id="uiSignupAppMainEntry">
          <Text variant="h3" className="uiSignupAppMainTitle">
            Get started with Platform9.
          </Text>
          <ActiveView />
        </main>
      </AppContext.Provider>
    )
  }
}

export default App
