import React from 'react';

export default class Undo extends React.Component{
    render() {
        if (!this.props.prevState) { return null; }
       
        return <button onClick={this.props.undo.bind(this)} >Undo</button>
    }
}