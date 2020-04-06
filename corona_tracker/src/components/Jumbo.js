import React, { Component } from 'react';
import { Jumbotron, Spinner } from 'reactstrap';
import axios from 'axios';

export class Jumbo extends Component {
    constructor(props){
        super(props)

        this.getResults = this.getResults.bind(this);

        this.state = {
            results: {},
            loading: true
        }
    }

    getResults(){
        axios.get('https://corona.lmao.ninja/all')
        .then(res =>{
                this.setState({
                    results: res.data,
                    loading: false
                  })
        } )
        .catch(err => console.log(err));    
    }

    componentDidMount(){
        this.interval = setInterval(this.getResults(), 60000)
    }

    render() {
        const { results, loading } = this.state;
        return (
            <div>
                 <Jumbotron className="col sm">
                          <h1 className="display-6">Simple, Corona Virus Tracker.</h1>
                         
                          <p>API Reference:
                            <br></br>
                        1. <a href="https://corona.lmao.ninja/countries?sort=country" target="_blank">https://corona.lmao.ninja/countries?sort=country</a>
                        <br />
                        2. <a href="https://corona.lmao.ninja/all" target="_blank">https://corona.lmao.ninja/all
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
                    
                           <p className="text-danger">Total cases around the globe: {results.cases}</p>
                           <p className="text-danger">Total deaths around the globe: {results.deaths}</p>
                           <p className="text-danger">Total deaths around the globe today: {results.todayDeaths}</p>
                           <p
                           className="text-success">Total recoveries around the globe: {results.recovered}</p>
                           <p className="text-primary">Total Cases in the world today: {results.todayCases}</p>
                           </div>
                        

                    }
                        


                          
                        </Jumbotron>
            </div>
        )
    }
}

export default Jumbo
