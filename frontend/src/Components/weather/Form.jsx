import React from "react";

class Form extends React.Component {
  render(){
    return (
      <form onSubmit={this.props.getWeather}>
        <input className="inputi"type="text" name="city" placeholder="city..."></input>
        <input className="inputi" type="text" name = "country" placeholder="country..."></input>
        <button className="button-weather">Get Weather!</button>
      </form>
    );
  }
}

export default Form;