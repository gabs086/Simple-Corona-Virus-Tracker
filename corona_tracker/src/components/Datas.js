import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input } from 'reactstrap';

import Jumbo from './Jumbo';

function Datas(props) {

    const [datas, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');


   const getDatas = _ => {
      // axios.get('https://corona.lmao.ninja/countries?sort=country')
      axios.get('https://corona.lmao.ninja/v2/countries')
      .then(res => {
      
        setData(res.data);
       
      })
      .catch(err => console.log(err))
    }

   const onSearchFilter = e => {
        setSearch(e.target.value);
     }

    useEffect(_ => {
      const id = setInterval( _ => {
        getDatas();
        setLoading(false)
      }, 2000);

      return _ => {
        clearInterval(id)
      }
    },[]);


      let displayData; 
      if(search === '')
      {
          displayData = <Jumbo />
      } 
      else if(search === 'all')
      {
        displayData = datas.sort((a, b) => a.country.localeCompare(b.country))
        .map(country => {
            return(
              <div>
              <ul class="list-group">
                <li class="list-group-item active">
                  Country:
                  &nbsp;
                  <img src={country.countryInfo.flag} alt="Country Flag" height="20" width="40"/>
                   &nbsp;
                  {country.country} ({country.countryInfo.iso2})
                </li>

                {country.todayCases >= 100 ?

                <li class="list-group-item text-danger">New Confirmed Cases in the Country:   {country.todayCases} </li>

                :  <li class="list-group-item ">New Confirmed Cases in the Country:   {country.todayCases} </li>
                }
                
                { country.cases >= 100 
                ?
                <li class="list-group-item text-danger">Total Confirmed Cases in the Country: {country.cases}</li>
                :
                <li class="list-group-item">Total Confirmed Cases in the Country: {country.cases}</li>
                }

                { country.todayDeaths >= 100
                ?
                <li class="list-group-item text-danger">New Confirmed Deaths in the Country: {country.todayDeaths}</li>
                  :
                <li class="list-group-item">New Confirmed Deaths in the Country: {country.todayDeaths}</li>
                }

                { country.deaths >= 100
                ?
                <li class="list-group-item text-danger">Total Confirmed Deaths in the Country: {country.deaths}</li>
                :
                <li class="list-group-item">Total Confirmed Deaths in the Country: {country.deaths}</li>
              }

                <li class="list-group-item text-success">Total Recoveries in the Country: {country.recovered}</li>
              </ul> 

              </div>
            )
        })

      }
      else {
        displayData = datas.filter(country => country.country === search).map(country =>{
          return(
            <div>
          <ul class="list-group">
            <li class="list-group-item active">
              Country:
              &nbsp;
              <img src={country.countryInfo.flag} height="20" width="40"/>
               &nbsp;
              {country.country} ({country.countryInfo.iso2})
            </li>

            {country.todayCases >= 100 ?

            <li class="list-group-item text-danger">New Confirmed Cases in the Country:   {country.todayCases} </li>

            :  <li class="list-group-item ">New Confirmed Cases in the Country:   {country.todayCases} </li>
            }
            
            { country.cases >= 100 
            ?
            <li class="list-group-item text-danger">Total Confirmed Cases in the Country: {country.cases}</li>
            :
            <li class="list-group-item">Total Confirmed Cases in the Country: {country.cases}</li>
            }

            { country.todayDeaths >= 100
            ?
            <li class="list-group-item text-danger">New Confirmed Deaths in the Country: {country.todayDeaths}</li>
              :
            <li class="list-group-item">New Confirmed Deaths in the Country: {country.todayDeaths}</li>
            }

            { country.deaths >= 100
            ?
            <li class="list-group-item text-danger">Total Confirmed Deaths in the Country: {country.deaths}</li>
            :
            <li class="list-group-item">Total Confirmed Deaths in the Country: {country.deaths}</li>
          }

            <li class="list-group-item text-success">Total Recoveries in the Country: {country.recovered}</li>
          </ul> 

          </div>
          )
     })
      }

        return (
          <div className="row">
                    <div className="container">

                        <FormGroup className="mt-3">
                        <Label for="exampleSelect">Select Country</Label>
                        <Input type="select" 
                        name="select" 
                        id="exampleSelect"
                        onChange={onSearchFilter}
                        value={search}
                        >
                         { loading ? 
                          <option>  Please Wait. The selection is loading... </option>
                        : 
                        <Fragment>

                          <option value="">Select Records...</option>
                          <option value="all">All Countries</option>
                 
                            { 
                            // Sorting of the countries in alphabetical
                            datas.sort((a, b) => a.country.localeCompare(b.country))
                            .map((country, id) => {
                              return(
                                <option key={id} value={country.country}>{country.country}</option> 
                              )
                            })
                         }
                        </Fragment>
                        }
                        </Input>
                      </FormGroup>

                      <br/>

                        { displayData } 
                    </div>
            </div>
        )
    }

export default Datas


