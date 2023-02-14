# billy

## Retrieve raw events data
### Installation 
Just install :
- [Docker](https://docs.docker.com/engine/install/) 

### Configuration
This project contains a typescript rest api coded with express. It has the following structure :
``` 
$ tree
├── app
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── common
│   │   │   └── mongoose.ts
│   │   ├── controllers
│   │   │   └── events.ts
│   │   ├── models
│   │   │   ├── eventsRawData.ts
│   │   │   └── events.ts
│   │   ├── routes
│   │   │   └── events.ts
│   │   └── server.ts
│   └── tsconfig.json
├── mongo-seed
│   ├── convertToCamelCase.js
│   ├── Dockerfile
│   ├── organizers-data.csv
│   └── smart-contracts-data.json
├── docker-compose.yml
└── README.md
```

For running checkout the docker-compose.yml file. It runs 3 containers, one for the mongo database, one for the app, and the last one for populating the database with the data.
```
version: '3'
services:
  mongodb:
    image: mongo
    command: mongod
    ports:
      - 27017

  mongo_seed:
    build: ./mongo-seed
    links:
      - mongodb

  client:
    build: ./app
    links:
      - mongodb
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
      - MONGO_URI=mongodb:27017/billy
```

I manipulated a bit the data :
- `smart-contracts-data.json` : I used the script in `mongo-seed/converToCamelCase.js` in order to convert the snake_case to camelCase
- `organizers-data.csv` : I removed spaces and named variable as camelCase too

The mongo-seed folder will let us populate the mongo database through the Dockerfile. The csv file is imported into `events` collection and json is imported into `eventsRawData` collection.
```
    FROM mongo
    COPY organizers-data.csv /organizers-data.csv
    COPY smart-contracts-data.json /smart-contracts-data.json
    CMD mongoimport --host mongodb --db billy --collection events --type=csv --headerline --file /organizers-data.csv;mongoimport --host mongodb --db billy --collection eventsRawData --type json --file /smart-contracts-data.json --jsonArray
```

### Running
In root, just run :
```
$ docker-compose up -d
```

The app will be available at port 8080. You can : 
- GET `/events` : get a list of all events and filter through `startDateTime` by adding to query `lt` or `gt` which asks a timestamp as value. For example : `/events?lt=1672527599`
- GET `/events/:id` : get one event
- PUT `/events/:id` : update one event. In request body you can specify `eventTitle`, `lineUp`, `collectionName`, `eventUrl`.