import React from 'react';

export default class Undo extends React.Component{
    render() {
        if (!this.props.prevTodo) { return null; }
       
        return <button onClick={this.props.onClick} >Undo</button>
    }
}