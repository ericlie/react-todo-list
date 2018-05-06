import React, { Component } from 'react';
import logo from './logo.svg';
import "./Loading.css";
class Loading extends Component {
  render() {
    return (
      <div style={{fontSize: "24px"}}> <img src={logo} alt="Loading" className="spinning icon" /> Loading... </div>
    )
  }
}
export default Loading