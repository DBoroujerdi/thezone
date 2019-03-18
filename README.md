# Stream Service

A video streaming service that checks how many video streams a user is watching and prevents a user from watching more than 3 streams at a time.

### Prerequisites

- [nodejs](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)
- [pm2](http://pm2.keymetrics.io/) (only for my remote deployment, tho)

## Deployment

Initial setup

`pm2 deploy staging setup`

Updates

`pm2 deploy ecosystem.config.js staging`

## Endpoints

`GET` - `/watch`

- returns 400 bad request - if session ID is not present
- returns 401 unauthorized - if the concurrent stream count has been exceeded

`GET` - `/health`

- returns 200 - {"status":"UP"}

## Testing

### Unit

`yarn test`

### Server

** I had trouble getting my nginx reverse proxy working, so you have to add the port

- `curl -v failblazing.com:3001/watch` -- 400
- `curl -v --header "Session-Id: lkjlkjely" 'failblazing.com:3001/watch'` -- 200
- `curl -v --header "Session-Id: lkjlkjely" 'failblazing.com:3001/watch'` -- 200
- `curl -v --header "Session-Id: lkjlkjely" 'failblazing.com:3001/watch'` -- 200
- `curl -v --header "Session-Id: lkjlkjely" 'failblazing.com:3001/watch'` -- 401


### Locally

- `yarn start`
- `curl -v localhost:3001/watch` -- 400
- `curl -v --header "Session-Id: lkjlkjely" 'localhost:3001/watch'` -- 200
- `curl -v --header "Session-Id: lkjlkjely" 'localhost:3001/watch'` -- 200
- `curl -v --header "Session-Id: lkjlkjely" 'localhost:3001/watch'` -- 200
- `curl -v --header "Session-Id: lkjlkjely" 'localhost:3001/watch'` -- 401


## Architecture

![Imagined context..](diagram/architecture.png)

To implement this I first came up with an imagined system design in which this service would live. In this system, auth concerns are handled by a gatway service which routes auth requests to the authentication service, assigns a user a session. All subsequest requests after this are only allowed through if they have a valid session (Maybe the session is also checked with the auth service for valididity on each call..?). One reason for this is that these concerns don't have to be implemented in the stream service, another being that it makes this service much simpler..

The flow might go like this..
1. Login - auth service authenticates the user and assigns a session id.
2. Request to view content - session id is present on in a cookie, which gateway validates.
3. Request is forwarded to the stream service as a HTTP header. Cookies are a front end concern so this should not be forwarded as such.
4. User is streamed the content or a stream ID is returned to so that a subsequent request can be made to a server that serves the content.


## Scaling

* Horizontally scale service as it is stateless. If you use plaform such as Kubernetes, scale it up with more instances..
* Shard database on session ID so that load to the database is partitioned.

## Improvements

* Config - the port is hardcoded everywhere, it would be better if this could be changed in 1 place.
* Stream ID header defined as magic string everywhere. This could be a global constant.
* Database - I had planned on using mongo to store the active streams and test with a mock, but I didn't have enough time. I'd use ES6 async/await constructs to make these calls.
* Express renders errors as HTML. I'd turn this off but I wasn't sure how.