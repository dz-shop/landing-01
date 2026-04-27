// ---- Facebook Pixel ----

// ---- TikTok Pixel ----

// ---- PostHog ----
!(function (t, e) {
  var o, n, p, r
  e.__SV ||
    (window.posthog && window.posthog.__loaded) ||
    ((window.posthog = e),
    (e._i = []),
    (e.init = function (i, s, a) {
      function g (t, e) {
        var o = e.split('.')
        2 == o.length && ((t = t[o[0]]), (e = o[1])),
          (t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
          })
      }
      ;((p = t.createElement('script')).type = 'text/javascript'),
        (p.crossOrigin = 'anonymous'),
        (p.async = !0),
        (p.src =
          s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') +
          '/static/array.js'),
        (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r)
      var u = e
      for (
        void 0 !== a ? (u = e[a] = []) : (a = 'posthog'),
          u.people = u.people || [],
          u.toString = function (t) {
            var e = 'posthog'
            return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e
          },
          u.people.toString = function () {
            return u.toString(1) + '.people (stub)'
          },
          o =
            'init ls vs Ce hs cs ns us capture calculateEventProperties gs register register_once register_for_session unregister unregister_for_session xs getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty ys createPersonProfile setInternalOrTestUser ws rs $s opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing fs debug M bs getPageViewId captureTraceFeedback captureTraceMetric Zr'.split(
              ' '
            ),
          n = 0;
        n < o.length;
        n++
      )
        g(u, o[n])
      e._i.push([i, s, a])
    }),
    (e.__SV = 1))
})(document, window.posthog || [])
posthog.init('phc_vF9vCnTWBkLxgc5kiJhxjcGf3r8PEzMrqGPE8jaKuWey', {
  api_host: 'https://eu.i.posthog.com',
  defaults: '2026-01-30',
  person_profiles: 'always',

  /* ✅ pour n'envoyer QUE ton event */
  capture_pageview: false,
  capture_pageleave: false,
  autocapture: false,

  loaded: function (ph) {
    // Récupère tous les query params
    const sp = new URLSearchParams(window.location.search)
    const props = {}

    // Supporte les clés répétées (?a=1&a=2)
    for (const [k, v] of sp.entries()) {
      if (props[k] === undefined) props[k] = v
      else if (Array.isArray(props[k])) props[k].push(v)
      else props[k] = [props[k], v]
    }

    // Optionnel: info utile
    props.page_url = window.location.href
    props.referrer = document.referrer || ''

    // ✅ event standard PostHog
    ph.capture('$pageview', props)
  }
})
