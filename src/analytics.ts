declare var analytics: any

export const SegmentAnalytics = {
  page: (name, details) => {
    if (!analytics) return
    analytics.page(name, details)
  },
  track: (name, details) => {
    if (!analytics) return
    analytics.track(name, details)
  },
  identifyAnonymous: (user) => {
    if (!analytics) return
    analytics.identify(user)
  },
  identify: (id, user) => {
    if (!analytics) return
    analytics.identify(id, user)
  },
}
