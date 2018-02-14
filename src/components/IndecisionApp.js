import React, { Component } from 'react';
import AddOption from './AddOption'
import Header from './Header'
import Action from './Action'
import Options from './Options'

class IndecisionApp extends Component {
    state = {
        options: []
    }
    handleDeleteOptions = () => {
        this.setState(() => ({options: []}))
    }
    //create a new method that will take in an option that we wanna delete
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState)=>{
                return {
                    options: prevState.options.filter((option)=>{
                        return optionToRemove !== option;
                    })
                }
        })
    }
    handleAddOption = (option) => {
        if(!option){
            return 'Enter valid value to add item';
        }else if(this.state.options.includes(option)){
            return 'This option already exists';
        }
        this.setState((prevState)=>({options: prevState.options.concat([option])}));
    }
    handlePick = (event) => {
       alert(this.state.options[Math.floor(Math.random()*this.state.options.length)])
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json)
            if(options){
                this.setState(()=>({options}))
            }
        } catch (error){
            
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }

    render(){
        const subtitle = 'Put your life in the hands of a computer'
        return(
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length >0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}

export default IndecisionApp