import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather.js";

const APP_KEY = "55d899d59dab5a458359c2c5f7e12a84";

class App extends React.Component{
  
  state = {
    temperature : undefined,
    city : undefined,
    country : undefined,
    humidity : undefined,
    description : undefined,
    error : undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    var city = e.target.elements.city.value;
    var country = e.target.elements.country.value;
    const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=city&appid=55d899d59dab5a458359c2c5f7e12a84');
    const data = await api_call.json();
    console.log(data);
    console.log(city);
    if(city || country){
      
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
  
      })
    }else{
      this.setState({
        temperature : undefined,
        city : undefined,
        country : undefined,
        humidity : undefined,
        description : undefined,
        error : "Please enter the value"
      });
    }
  } 

  render(){
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                  <Titles />
              </div>
              <div className="col-xs-7 form-container">
                  <Form getWeather = {this.getWeather} />
                  <Weather
                      temperature = {this.state.temperature}
                      humidity = {this.state.humidity}
                      city = {this.state.city}
                      country = {this.state.country}
                      description = {this.state.description}
                      error = {this.state.error}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;