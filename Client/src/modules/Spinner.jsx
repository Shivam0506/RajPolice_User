import React from "react";
import { Component } from "react";
import loading from '../../public/assets/spinner.gif'

export default class NewsItem extends Component {
    render(){
        return(
            <div className="container text-center">
                <img src={loading} alt="loading" style={{height: "70px", width: "70px"}}/>
            </div>
        )

    }
}