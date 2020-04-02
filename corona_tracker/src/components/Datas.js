import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input } from 'reactstrap';

import Jumbo from './Jumbo';

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
      this.interval = setInterval(this.getDatas(), 60000)
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

                        <FormGroup className="mt-3">
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
                          return( 
                          <option key={id} value={country.Country}>{country.Country}</option> 
                          ) 
                        })
                        }
                        </Input>
                      </FormGroup>

                      <br/>

                        {
                          search === '' ?
                            <Jumbo />
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


