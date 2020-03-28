import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input, Jumbotron } from 'reactstrap';

export class Datas extends Component {
    constructor(props){
      super(props)

      this.onSearchFilter = this.onSearchFilter.bind(this);
      this.getDatas = this.getDatas.bind(this);

      this.state = {
        datas: [],
        countries: [],
        loading: true,

        //Search Filterfing
        search: '',
      }

    }

    getDatas(){
      axios.get('https://api.covid19api.com/summary')
      .then(res =>{
        this.setState({
          datas: res.data,
          countries: res.data.Countries,
          loading: false
        })
      } )
      .catch(err => console.log(err));
    }

    componentDidMount(){
      this.interval = setInterval(this.getDatas(), 7200000)
    }

    onSearchFilter(e){
      
     this.setState({
       search: e.target.value
     })
    }

    render() {
      const { countries, loading, search } = this.state;
      const onSearchFilter = this.onSearchFilter;

        return (
          <div className="row">
                    <div className="container">

                        <FormGroup>
                        <Label for="exampleSelect">Select Country</Label>
                        <Input type="select" 
                        name="select" 
                        id="exampleSelect"
                        onChange={onSearchFilter}
                        >
                         { loading ? 
                          <option>  Please Wait. The selection is loading... </option>
                        : 
                        countries.map((country, id) => {
                          return( <option key={id} value={country.Country}>{country.Country}</option> ) 
                        })
                        }
                        </Input>
                      </FormGroup>

                      <br/>

                        {
                          search === '' ?
                          <Jumbotron className="col sm">
                          <h1 className="display-6">Simple, YET informative Corona Virus Tracker.</h1>
                          <p className="lead">This is a simple corona virus tracker made in pure ReactJS.</p>
                          <p>API Reference: <a>https://api.covid19api.com/summary</a></p>
                          {/* <p>API Link: <a href="https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest" target="_blank">hhttps://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest</a></p> */}
                          <hr className="my-2" />
                          
                        </Jumbotron>
                          :
                          //Filtering Specific Datas
                         countries.filter(country => country.Country === search).map(country =>{
                              return(
                                <div>
                              <ul class="list-group">
                                <li class="list-group-item active">Country: {country.Country}</li>

                                {country.NewConfirmed >= 100 ?

                                <li class="list-group-item text-danger">New Confirmed Cases in the Country:   {country.NewConfirmed} </li>

                                :  <li class="list-group-item ">New Confirmed Cases in the Country:   {country.NewConfirmed} </li>
                                }
                                
                                { country.TotalConfirmed >= 100 
                                ?
                                <li class="list-group-item text-danger">Total Confirmed Cases in the Country: {country.TotalConfirmed}</li>
                                :
                                <li class="list-group-item">Total Confirmed Cases in the Country: {country.TotalConfirmed}</li>
                                }

                                { country.NewDeaths >= 100
                                ?
                                <li class="list-group-item text-danger">New Confirmed Deaths in the Country: {country.NewDeaths}</li>
                                  :
                                <li class="list-group-item">New Confirmed Deaths in the Country: {country.NewDeaths}</li>
                                }

                                { country.TotalDeaths >= 100
                                ?
                                <li class="list-group-item text-danger">Total Confirmed Deaths in the Country: {country.TotalDeaths}</li>
                                :
                                <li class="list-group-item">Total Confirmed Deaths in the Country: {country.TotalDeaths}</li>
                              }

                                <li class="list-group-item text-success">Total Recoveries in the Country: {country.TotalRecovered}</li>
                              </ul>

                              </div>
                              )
                         })
                  
                          
                        }
                    </div>
            </div>
        )
    }
}

export default Datas


