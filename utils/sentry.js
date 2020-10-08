const Sentry = require('@sentry/node')
const { SENTRY_KEY } = process.env

const captureException = (...params) => {
	if (Sentry.getCurrentHub().getClient())
		return Sentry.captureException(...params)

	Sentry.init({
		dsn: SENTRY_KEY,
		tracesSampleRate: 1.0
	})
	return Sentry.captureException(...params)
}

module.exports = {
	captureException
}
