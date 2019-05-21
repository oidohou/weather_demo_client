This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Weather Demo Client (React app)

Weather Demo Client is a FrontEnd App that allows to filter data in a table using dropdown selects to restrict data to selected agencies and regions

## Components used:

    *Material-ui

    *lodash

    *json-server

## Run the application

1. Clone this repository anywhere on your computer

```
git clone https://github.com/DraQlaBlood/weather_demo_client.git
```

2. Run the application

    Make sure you have NODEJs installed on your computer 

    In your CLI, go to the application folder 

    ```
    yarn start or npm start
    ```

    Open [http://localhost:8083](http://localhost:8083) to view it in the browser.

    Json-server will be running at [http://localhost:4000](http://localhost:4000)
    
## Connecting to BackEnd API 

1. clone API from [HERE](https://github.com/DraQlaBlood/weather_demo_server)

2. Update **const url** API's protocol+hostname+port in App.js

3. Update the BackEnd API with CrossOrigin annotation on the request endpoint used.

4. Update the table component in App.js

```javascript
     header={[
                        {
                            name: "IATA",
                            props: "IATA"
                        },
                        {
                            name: "Name",
                            props: "name"
                        },
                        {
                            name: "WMO",
                            props: "WMO"
                        },
                        {
                            name: "MSC",
                            props: "MSC_ID"
                        },
                        {
                            name: "Latitude",
                            props: "Latitude"
                        },
                        {
                            name: "Longitude",
                            props: "Longitude"
                        },
                        {
                            name: "Elevation",
                            props: "elevation"
                        },
                        {
                            name: "Provider",
                            props: "provider"
                        },
                        {
                            name: "DataSet",
                            props: "dataset"
                        },
                        {
                            name: "Type",
                            props: "type"
                        },
                        {
                            name: "Region",
                            props: "region"
                        }
                    ]}
   ```

By the following 

```javascript
     header={[
                        {
                            name: "IATA",
                            props: "iata"
                        },
                        {
                            name: "Name",
                            props: "name"
                        },
                        {
                            name: "WMO",
                            props: "wmo"
                        },
                        {
                            name: "MSC",
                            props: "msc_ID"
                        },
                        {
                            name: "Latitude",
                            props: "latitude"
                        },
                        {
                            name: "Longitude",
                            props: "longitude"
                        },
                        {
                            name: "Elevation",
                            props: "elevation"
                        },
                        {
                            name: "Provider",
                            props: "provider"
                        },
                        {
                            name: "DataSet",
                            props: "dataset"
                        },
                        {
                            name: "Type",
                            props: "type"
                        },
                        {
                            name: "Region",
                            props: "region"
                        }
                    ]}
   ```

5. Update package.json sripts   

 ```javascript
"scripts": {
    "json:server": "json-server --watch db.json --routes routes.json --port 4000",
    "start:app": "cross-env PORT=8083 react-scripts start",
    "start": "npm-run-all --parallel start:app json:server",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
 ```
 
 By
 
  ```javascript
"scripts": {
    "json:server": "json-server --watch db.json --routes routes.json --port 4000",
    "start": "cross-env PORT=8083 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
 ```

Then run both BackEnd Java/SpringBoot API and the React app.
