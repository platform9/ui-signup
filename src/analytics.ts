type IWindow = Window & { analytics: any }
declare var window: IWindow

export const SegmentAnalytics = {
  page: (name, details) => {
    if (!window.analytics) return
    window.analytics.page(name, details)
  },
  track: (name, details) => {
    if (!window.analytics) return
    window.analytics.track(name, details)
  },
  identifyAnonymous: (user) => {
    if (!window.analytics) return
    window.analytics.identify(user)
  },
  identify: (id, user) => {
    if (!window.analytics) return
    window.analytics.identify(id, user)
  },
}
