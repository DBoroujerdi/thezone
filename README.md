# Stream Service

A service that checks how many video streams a user is watching which also prevents a user from watching more than 3 streams at a time.


### Prerequisites

- (nodejs)[https://nodejs.org/en/]
- (yarn)[https://yarnpkg.com/en/]

## Deployment

todo url to online digital oceon deployment

## Endpoints

`GET` - `/watch?v=hpKlCKL9FsM`

returns 400 bad request if session ID is not present
returns 403 if the concurrent stream count has been exceeded

`GET` - `/health`

## Testing

todo example curl with header or cookie?


## Architecture
todo Explanation/motivation for design

todo draw.io diagram of imagined architecture that this service lives within

Gateway - decides where to forward the request to. e.g any unauthenticated requests are rejected. Requests to login are forwarded to the Authentication Service. It encapsulates security mechanisms such as authentication tokens. It can convert from external protocols such as websocket and XMPP to internal protocols such as HTTP or AMQP.

Authentication service - seperation of concerns. Handles authentication so that other services behind the gateway don't have to. Subsequent requests are handled by passing an auth token, with requests lacking a valid token not being allowed beyond the gateway to the stream service. Hence the reason for the API. Or something.. todo reword.


## Scaling

todo horizontally scale service as it is stateless. Kubernetes platform, scale it up..
todo sit behind aload balancer
todo sharding database