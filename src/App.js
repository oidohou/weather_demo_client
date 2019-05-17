import React from 'react';
import './App.css';

import ReactDOM from 'react-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import orderBy from 'lodash/orderBy';
import Paper from '@material-ui/core/Paper';


import Table from './components/table';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',

  },
  paper:{
    width: '90%',
    maxHeight:480,
        marginTop: theme.spacing.unit ,
        margin: '0 auto',
        overflowX: 'auto',
  },
  table: {
      maxWidth: '100%',
    },
  grid: {
      padding: theme.spacing.unit ,
      textAlign: 'center',
    },

  formControl: {
    margin: theme.spacing.unit*2,
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const invertDirection= {
    'asc': 'desc',
    'desc':'asc'
}
const url = window.location.protocol+'//'+window.location.hostname;

class App extends React.Component  {

    state = {
            labelWidth: 0,
            agencies:[],
            regions:[],
            data:[],

            region:'',
            agency:'',
            columnToSort: '',
            sortDirection:'desc',
            baseUrl:'',
        }

    componentDidMount = async () => {
     this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,

        });


    console.log(url);
    fetch(url+'/weather/v1/agency')
        .then(resp=> resp.json())
        .then(data =>this.setState({agencies:data }))

    try{
        let stationUrl = await fetch(url+'/weather/v1/station');
        let regionUrl = await fetch(url+'/weather/v1/region');
        stationUrl = await stationUrl.json();
        regionUrl = await regionUrl.json();
        const data =[];
          stationUrl.map( station => {
                const region = regionUrl.filter(region => station.region === region.id)
                const newStation = station;
                newStation.region = region[0].name;
                data.push(newStation);
                return '';
          })
          this.setState({data})
    }catch(e){
         console.log("error", e)
    }



    }

    handleChange = async(event) => {
        this.setState({ agency: event.target.value });
        if (event.target.value !== ''){
            try{
                let agency_regions_Url = await fetch(url+'/weather/v1/agency/'+event.target.value+'/region');
                    agency_regions_Url = await agency_regions_Url.json();
                let agency_stations_Url = await fetch(url+'/weather/v1/agency/'+event.target.value+'/station');
                    agency_stations_Url = await agency_stations_Url.json();
                let regionUrl = await fetch(url+'/weather/v1/region');
                    regionUrl = await regionUrl.json();
                const data_station =[];
                this.setState({regions:agency_regions_Url })
                agency_stations_Url.map( station => {
                            const region = regionUrl.filter(region => station.region === region.id)
                            const newStation = station;
                            newStation.region = region[0].name;
                            data_station.push(newStation);
                            return '';
                      })
                this.setState({data:data_station })
            }catch (e){
            console.log("error",e)
            }
        }else{
             try{
                 let stationUrl = await fetch(url+'/weather/v1/station');
                 let regionUrl = await fetch(url+'/weather/v1/region');
                 stationUrl = await stationUrl.json();
                 regionUrl = await regionUrl.json();
                 const data =[];
                 this.setState({regions:[] })
                   stationUrl.map( station => {
                         const region = regionUrl.filter(region => station.region === region.id)
                         const newStation = station;
                         newStation.region = region[0].name;
                         data.push(newStation);

                         return '';
                   })
                   this.setState({data})
             }catch(e){
                  console.log("error", e)
             }
        }

     };

    handleRegionChange =async(event) => {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value !== ''){
                    try{
                        let region_stations_Url = await fetch(url+'/weather/v1/region/'+event.target.value
                        +'/agency/'+this.state.agency+'/station');
                            region_stations_Url = await region_stations_Url.json();
                        let regionUrl = await fetch(url+'/weather/v1/region');
                            regionUrl = await regionUrl.json();
                        const data_station =[];
                        region_stations_Url.map( station => {
                                    const region = regionUrl.filter(region => station.region === region.id)
                                    const newStation = station;
                                    newStation.region = region[0].name;
                                    data_station.push(newStation);
                                    return '';
                              })
                        this.setState({data:data_station })
                    }catch (e){
                    console.log("error",e)
                    }
                }else{

                        if (event.target.value === '' && this.state.agency !== ''){
                            try{
                                let agency_stations_Url = await fetch(url+'/weather/v1/agency/'+this.state
                                .agency+'/station');
                                    agency_stations_Url = await agency_stations_Url.json();
                                let regionUrl = await fetch(url+'/weather/v1/region');
                                    regionUrl = await regionUrl.json();
                                const data_station =[];
                                agency_stations_Url.map( station => {
                                            const region = regionUrl.filter(region => station.region === region.id)
                                            const newStation = station;
                                            newStation.region = region[0].name;
                                            data_station.push(newStation);
                                            return '';
                                      })
                                this.setState({data:data_station })
                            }catch (e){
                            console.log("error",e)
                            }
                        }else{
                             try{
                                 let stationUrl = await fetch(url+'/weather/v1/station');
                                 let regionUrl = await fetch(url+'/weather/v1/region');
                                 stationUrl = await stationUrl.json();
                                 regionUrl = await regionUrl.json();
                                 const data =[];
                                   stationUrl.map( station => {
                                         const region = regionUrl.filter(region => station.region === region.id)
                                         const newStation = station;
                                         newStation.region = region[0].name;
                                         data.push(newStation);

                                         return '';
                                   })
                                   this.setState({data})
                             }catch(e){
                                  console.log("error", e)
                             }
                        }
                }
      };

    handleSort=(columnName) =>{
            this.setState(state => ({
                columnToSort: columnName,
                sortDirection:
                state.columnToSort === columnName
                ? invertDirection[state.sortDirection]
                :'asc'
            }))
      }
    render(){
        const { classes } = this.props;
        const { agencies} = this.state;
      return (
        <div className={classes.root} >
            <Grid container spacing={8}>
            <Grid item xs={12} sm={6} className={classes.grid}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={ref => {this.InputLabelRef = ref;}}htmlFor="outlined-agency-simple">
                    Agency
                </InputLabel>
                <Select value ={this.state.agency} onChange={this.handleChange}
                    input={<OutlinedInput labelWidth={this.state.labelWidth} name="agency" id="outlined-agency-simple"/>}>
                    <MenuItem value=""><em>All Agencies</em></MenuItem>
                    {agencies.map((value,index) =>
                        <MenuItem key ={index} value={value.id}>{value.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} className={classes.grid}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={ref => {this.InputLabelRef = ref;}}htmlFor="outlined-region-simple">
                    Region
                </InputLabel>
                <Select value ={this.state.region} onChange={this.handleRegionChange}
                    input={<OutlinedInput labelWidth={this.state.labelWidth} name="region" id="outlined-region-simple"/>}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    {this.state.regions.map((value,index) =>
                         <MenuItem key ={index} value={value.id}>{value.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            </Grid>
            <Paper className={classes.paper}>
                <Table item xs={12} sm={6} className={classes.table}
                    data={orderBy(
                        this.state.data,
                        this.state.columnToSort,
                        this.state.sortDirection
                    )}
                    handleSort = {this.handleSort}
                    columnToSort = {this.state.columnToSort}
                    sortDirection = {this.state.sortDirection}
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
                    ]}/>
            </Paper>
        </Grid>
        </div>
      );
    }
}
export default withStyles(styles)(App);
