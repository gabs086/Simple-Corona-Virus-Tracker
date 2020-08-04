import React, { useState, useEffect } from 'react';
import { Jumbotron, Spinner } from 'reactstrap';
import axios from 'axios';

 function Jumbo(props) {

    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);

    const getResults = _ => {
        // axios.get('https://corona.lmao.ninja/all')
        axios.get('https://corona.lmao.ninja/v2/all')
        .then(res =>{
                // this.setState({
                //     results: res.data,
                //     loading: false
                //   });
                setResults(res.data);
                setLoading(false);

        } )
        .catch(err => console.log(err));    
    }

    useEffect(_ => {
        const id = setInterval(_ => {
            getResults();
        }, 1000)

        return _ => {
          clearInterval(id);
        }
    },[])

    const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
 
        return (
            <div>
                 <Jumbotron className="col sm">
                          <h1 className="display-6">Simple, Corona Virus Tracker.</h1>
                         
                          <p>API Reference:
                            <br></br>
                        1. <a href="https://corona.lmao.ninja/v2/countries" target="_blank">https://corona.lmao.ninja/v2/countries</a>
                        <br />
                        2. <a href="https://corona.lmao.ninja/v2/all" target="_blank">https://corona.lmao.ninja/v2/all
                        </a></p>
                        <div className="text-center"> 
                        <span style={{color: 'red', height: '10px'}}>LIVE</span>
                        <Spinner type="grow" color="danger" />
                        </div>
                          <hr className="my-2" />
                    
                    {
                        loading ?
                        <p className="text-center">
                        <Spinner style={{ width: '5rem', height: '5rem' }} type="grow" /><br/>
                        Loading data...
                        </p>

                        :
                          <div>
                    
                           <p className="text-danger">Total cases around the globe: {numberWithCommas(results.cases)}</p>
                           <p className="text-danger">Total deaths around the globe: {numberWithCommas(results.deaths)}</p>
                           <p className="text-danger">Total deaths around the globe today: {numberWithCommas(results.todayDeaths)}</p>
                           <p
                           className="text-success">Total recoveries around the globe: {numberWithCommas(results.recovered)}</p>
                           <p className="text-primary">Total Cases in the world today: {numberWithCommas(results.todayCases)}</p>
                           </div>
                        

                    }
                        


                          
                        </Jumbotron>
            </div>
        )
    
}

export default Jumbo;
