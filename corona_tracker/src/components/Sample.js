import React from 'react';
import axios from 'axios';
class ProductFilter extends React.Component {
  constructor() {
    super();
    
    this.handleFormInput = this.handleFormInput.bind(this);
    
    this.state = {
      series: 0,
      abv: 0
    }
  }
  
  handleFormInput(series, abv) {
    this.setState({
      series: series,
      abv: abv
    })
  }
  
  render() {
    const products = [
      {name: 'IPA', abv:5.5, series:'Year-Round Ales'},
      {name: 'White Rascal', abv:5.7, series:'Year-Round Ales'},
      {name: "Joe's Pilsner", abv:3.5, series:'Year-Round Ales'},
      {name: "Ellie's Brown Ale", abv:5.2, series:'Year-Round Ales'},
      {name: 'Out of Bounds Stout', abv:4.5, series:'Year-Round Ales'},
      {name: 'The Maharaja', abv:6.5, series:'Dictator Series'},
      {name: 'The Kaiser', abv:6.5, series:'Dictator Series'},
      {name: 'The Czar', abv:7.5, series:'Dictator Series'},
      {name: 'Hog Heavens', abv:5.5, series:'Holy Trinity'},
      {name: 'The Reverend', abv:6.8, series:'Holy Trinity'},
      {name: 'Salvation', abv:6.4, series:'Holy Trinity'}
    ];
    
    return (
      <div className="filter">
        <ProductFilterMenu
          series={this.state.series}
          abv={this.state.abv}
          onFormInput={this.handleFormInput}
        />
        <ProductFilterResults
          products={products}
          series={this.state.series}
          abv={this.state.abv}
        />
      </div>
    )
  }
}

 class ProductFilterMenu extends React.Component {
   constructor() {
     super();
     this.handleChange = this.handleChange.bind(this);
   }
   
   handleChange() {
     this.props.onFormInput (
       this.refs['seriesInput'].getDOMNode().value,
       this.refs['abvInput'].getDOMNode().checked
     );
   }
   
   render() {
     return (
       <form className="filter-menu">
         <label for="abvInput">Sort By ABV</label>
         <input id="abvInput" type="checkbox" checked={this.props.abv} ref="abvInput" onChange={this.handleChange} />
         <label for="seriesInput">Filter By Series</label>
         <select id="seriesInput" ref="seriesInput" onChange={this.handleChange}>
           <option value="All">All</option>
           <option value="Year-Round Ales">Year-Round Ales</option>
           <option value="Dictator Series">Dictator Series</option>
           <option value="Holy Trinity">Holy Trinity</option>
         </select>
       </form>
     );
   }
 }

class ProductFilterResults extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    var results = [];
    
    if (this.props.abv === true) {
      this.props.products.sort((a,b) => {
        return b.abv - a.abv;
      })
    } 

    this.props.products.map((product) => {
      if (this.props.series === 0 || this.props.series === 'All') {
        results.push(<Product product={product} />);
      }
      else if (product.series === this.props.series) {
        results.push(<Product product={product} />);
      }
    });
        
    return (
      <div className="filter-results">
        <ul className="blocks blocks_3up">
          {results}
        </ul>
      </div>
    )
  }
}

class Product extends React.Component {
  constructor () {
    super();
  }
  
  render () {
    return (
      <li>
        <div className="feature">
          <div className="feature-hd">
            <h2 class="hdg hdg_2">{this.props.product.name}</h2>
          </div>
          <div className="feature-bd">
            <p>{this.props.product.series}</p>
          </div>
          <div className="feature-ft">
            <p>{this.props.product.abv}% ABV</p>
          </div>
        </div>
      </li>
    )
  }
}                            

export default ProductFilter;

// React.render(<ProductFilter/>, document.getElementById('ProductFilter'));
