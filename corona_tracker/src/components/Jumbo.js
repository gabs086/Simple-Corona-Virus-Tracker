import React, { Component } from 'react';
import { Jumbotron, Spinner } from 'reactstrap';
import axios from 'axios';

export class Jumbo extends Component {
    constructor(props){
        super(props)

        this.getResults = this.getResults.bond

        this.state = {
            results: [],
            loading: true
        }
    }

    getResults(){
      
    }

    componentDidMount(){
        axios.get('https://thevirustracker.com/free-api?global=stats')
        .then(res =>{
          this.setState({
            results: res.data.results,
            loading: false
          })
        } )
        .catch(err => console.log(err));
    }

    render() {
        const { results, loading } = this.state;
        return (
            <div>
                 <Jumbotron className="col sm">
                          <h1 className="display-6">Simple, Corona Virus Tracker.</h1>
                         
                          <p>API Reference:
                            <br></br>
                        1. <a href="https://api.covid19api.com/summary" target="_blank">https://api.covid19api.com/summary</a>
                        <br />
                        2. <a href="https://thevirustracker.com/free-api?global=stats" target="_blank">https://thevirustracker.com/free-api?global=stats</a></p>
                        
                          <hr className="my-2" />
                    
                    {
                        loading ?
                        <p className="text-center">
                        <Spinner style={{ width: '5rem', height: '5rem' }} type="grow" /><br/>
                        Loading data...
                        </p>

                        :

                    results.map((result,id) => {
                      return( 
                          <div>
                           <p className="text-danger">Total cases around the globe: {result.total_cases}</p>
                           <p className="text-danger">Total deaths around the globe: {result.total_deaths}</p>
                           <p
                           className="text-success">Total recoveries around the globe: {result.total_cases}</p>
                           <p className="text-primary">Total Cases in the world today: {result.total_new_cases_today}</p>
                           </div>
                        )
                    })

                    }
                        


                          
                        </Jumbotron>
            </div>
        )
    }
}

export default Jumbo
