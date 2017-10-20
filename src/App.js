import React, { Component } from 'react';
import { render } from 'react-dom';


//name and post index of selected cities
const citys = [
  {city: 'Kiev', zip: '03148' },
  {city: 'Odessa', zip: '65029' }
]

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      currentPlace: 0,
    }
  }

  render() {
    let currentPlace = this.state.currentPlace;
    //mapping the const citys and getting it
    let cityList = citys.map( (i, id) => (
      <button key={id}
              onClick={ () => this.setState({currentPlace: id}) }> 
              {i.city}
      </button>
    ))
   
    return <div className="App">
      {cityList}
      <DisplayWeather 
            key={currentPlace}
            zip={citys[currentPlace].zip}/> 
    </div>
    //after click the DisplayWeather got prop with index of selected city
  }

}

class DisplayWeather extends Component {
  constructor() {
    super();
    this.state = {
      curData : null //here will be an arr with full weather info
    }
  }

  componentDidMount() {
    let zip =  this.props.zip;
    //put current index in url
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + zip +
                "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({curData: data}))
      //push all info in curData
  }

  render() {
    
    let curData = this.state.curData;
    if(!curData) return <div>Load</div> //!!! before curData will be loaded, need to do this action
    let icon = 'http://openweathermap.org/img/w/' + curData.weather[0].icon + '.png' //getting right image
    
    //console.log(JSON.stringify(curData));

    //displaying here what I need about weather
    return  <div>
              <h2>
                {curData.weather[0]['main']} in {curData.name}
                <img src={icon} alt="ico"/>
              </h2>
              <p>Temp: <b>{curData.main.temp}°</b> fah</p>
              <p>Wind speed <b>{curData.wind.speed}</b> mi/sec</p>
            </div>
  }
}