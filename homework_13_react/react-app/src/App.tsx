import React, {ReactElement} from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Sidebar} from "./components/sidebar/Sidebar";
import {CompanyDesvription} from "./components/mainContainer/CompanyDescription";
import {ReclamList} from "./components/mainContainer/ReclamList";
import {PopularItems} from "./components/popularItems/PopularItems";
import {Footer} from "./components/footer/Footer";

export class App extends React.Component {
  render () : ReactElement {
      return (
          <div className="App">
              <div className="App-header">
                  <Header/>
              </div>
              <div className="App-mainContainer">
                  <Sidebar />
                  <div className="App-workContainer">
                      <CompanyDesvription />
                      <ReclamList />
                      <PopularItems />
                  </div>
              </div>
              <div className="App-footer">
                  <Footer />
              </div>
          </div>
      );
  }
}

export default App;
