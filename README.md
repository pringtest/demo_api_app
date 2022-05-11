# demo_api_server

## Setting the environment

1. copy and paste `.env.example` to `.env` and fill up all the parameters.


## dockerize

1. create the container for the app
```sh
docker build . -t demo-api-server
```

2. run the container and publish. 
```sh
docker run -p 4000:3000 demo-api-server
```

-  `Note: publish or -p will creates a firewall rule which maps a container port to a port on the Docker host`
