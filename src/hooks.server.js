import * as Sentry from "@sentry/sveltekit";
Sentry.init({
  dsn: "https://7eec00c0278349cd8d0ce29bd1e357e5@o1061162.ingest.us.sentry.io/6051380",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/sveltekit/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0
});
const myErrorHandler = ({ error, event }) => {
  console.error("An error occurred on the server side:", error, event);
};
export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);
// or alternatively, if you don't have a custom error handler:
// export const handleError = handleErrorWithSentry();
export const handle = Sentry.sentryHandle();
// Or use `sequence` if you're using your own handler(s):
// export const handle = sequence(Sentry.sentryHandle(), yourHandler());

// import cookie from 'cookie';

// export const getSession = (request) => {
// 	const cookies = cookie.parse(request.headers.cookie || '');
// 	const loggedIn = cookies.jwt !== undefined || false;
// 	const userId = cookies.userId || 0;
// 	const username = cookies.username || '';
// 	const displayName = cookies.displayName || '';
// 	const theme = cookies.theme || 'dark';
// 	return {
// 		API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
// 		BASE_ENDPOINT: import.meta.env.VITE_BASE_ENDPOINT,
// 		DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE,
// 		loggedIn,
// 		theme,
// 		userId,
// 		user: {
// 			id: userId,
// 			displayName,
// 			username
// 		}
// 	};
// };

// export const handle = async ({ request, render }) => {
// 	request.locals.API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
// 	request.locals.BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;
// 	request.locals.DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE;

// 	// TODO https://github.com/sveltejs/kit/issues/1046
// 	const response = await render({
// 		...request,
// 		method: (request.query.get('_method') || request.method).toUpperCase()
// 	});
// 	const cookies = cookie.parse(request.headers.cookie || '');
// 	let headers = response.headers;
// 	const cookiesArray = [];
// 	if (!cookies.theme) {
// 		const theme = request.query.get('theme') || 'dark';
// 		cookiesArray.push(`theme=${theme};path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT`);
// 	}
// 	if (cookiesArray.length > 0) {
// 		headers = {
// 			...response.headers,
// 			'set-cookie': cookiesArray
// 		};
// 	}

// 	return {
// 		...response,
// 		headers
// 	};
// };
