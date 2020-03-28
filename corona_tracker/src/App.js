import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navibar from './components/Navibar';
import Datas from './components/Datas';
// import ProductFilter from './components/Sample';

function App() {
  return (
    <div className="App">
        <Navibar />
        <Datas />

        {/* <ProductFilter /> */}
    </div>
  );
}

export default App;
