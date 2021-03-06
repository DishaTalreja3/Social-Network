import React, { Component } from 'react';
import EventPanel from './EventPanel';
import PostPanel from './PostPanel';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {changePanel: props.changePanel, chats: []};
        this.changePanel = this.changePanel.bind(this);
    }

    changePanel(event){
        this.setState({panel: event.target.textContent.toLowerCase()});
        var panel = event.target.textContent.toLowerCase();
        if(panel === "home" || panel === "events"){
            console.log(panel);
            this.state.changePanel(panel);
        }
    }

    render() {
        return (
            <div id="dash_chatPanel">
                <nav>
                    <div className="p-fixed bg-primary border-lg w-100">
                        <ul className="d-flex">
                            <li className="cursor-pointer" onClick={this.changePanel}>Home</li>
                            <li className="cursor-pointer active">Chats</li>
                            <li className="cursor-pointer" onClick={this.changePanel}>Events</li>
                        </ul>
                    </div>
                </nav>
                <ul className="chats">

                </ul>
            </div>
        );
    }
}

export default App;
