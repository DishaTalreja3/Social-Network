import React, { Component } from 'react';
import Cookie from './../Utility/Cookie';
class EventsSection extends Component {

    constructor(props){
        super(props);
        this.state = {eventsID: props.events, events: []};
        this.getEvents = this.getEvents.bind(this);
        this.getEvents();
    }


    getEvents(){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        };
        fetch("http://" + process.env.REACT_APP_API_HOST  + "/events?eventIDs=" + JSON.stringify(this.state.events), options).then(result =>{
            return result.json();
        }).then(result => {
            this.setState({events: result.events});
        });
    }

    render() {
        return (
        <div className="events">
            <h3>Your Events</h3>
            <ul>
                {this.state.events.map((event, i) => {
                    if(i < 4){
                        return(
                            <li key={i.toString()} className="d-flex">
                                <div>
                                    <h4>{event.name}</h4>
                                    <h5>{event.location}</h5>
                                </div>
                                <div>
                                    <h4 className="text-right">{event.company}</h4>
                                    <h5 className="text-right">{event.date}</h5>
                                </div>
                            </li>
                        );
                    }else{
                        return ("");
                    }
                })}

                { 
                    this.state.events.length > 3 ?
                    <div className="text-right color-red"><a>See More</a></div> 
                    : ""
                }
            </ul>
        </div>
        );
    }
}

export default EventsSection;
