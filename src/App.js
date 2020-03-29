import React from 'react';
import './App.css';
import ListItems from "./UIComponents/ListItem";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

import axio from 'axios'

library.add(faTrash);
library.add(faEdit);
library.add(faCheck);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            currentItem: {
                text: '',
                id: '',
                state: false
            }
        };
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    loadData(){
        let inputList ;
        const options = {
            method: 'get',
            url: 'http://localhost:8080/items',
        };
        axio(options)
            .then(response => {
                inputList = response.data;
                console.log(response);
            })
            .catch(error =>{
                console.log(error)
            })

    }


    handleInput(e) {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now()
            }
        })
    };

    deleteItem(key) {
        const filteredItems = this.state.items.filter(item => item.key !== key);
        this.setState({
            items: filteredItems
        });
        const options = {
            method: 'delete',
            url: 'http://localhost:8080/items/'+key,
            header:{
                'Content-Type': 'application/json' }

        };
        axio(options)
            .then(response => {
                console.log(response);
            })
            .catch(error =>{
                console.log(error)
            })
    }

    changeState(key) {
        const items = this.state.items;
        let updateItem;
        items.map(item => {
            if (item.key === key) {
                updateItem = item;
                item.state = !item.state;
            }
        });
        this.setState({items: items});

        const options = {
            method: 'post',
            url: 'http://localhost:8080/items',
            header:{
                'Content-Type': 'application/json' },
            data: {
                id: updateItem.key,
                text: updateItem.text,
                state: updateItem.state
            }
        };
        axio(options)
            .catch(error =>{
                console.log(error)
            })
    }

    setUpdate(text, key) {
        const items = this.state.items;
        let updateItem;
        items.map(item => {
            if (item.key === key) {
                item.text = text;
            }
        });
        this.setState({items: items});
        const options = {
            method: 'put',
            url: 'http://localhost:8080/items',
            header:{
                'Content-Type': 'application/json' },
            data: {
                id: key,
                text: text,
                state: false
            }
        };
        axio(options)
            .catch(error =>{
                console.log(error)
            });

    }

    addItem(e) {
        e.preventDefault();
        const newItem = this.state.currentItem;
        console.log(this.state);
        if (newItem.text !== "") {
            const newItems = [...this.state.items, newItem];
            this.setState({
                items: newItems,
                currentItem: {
                    text: '',
                    key: '',
                    state: false
                }
            });


            const options = {
                method: 'post',
                url: 'http://localhost:8080/items',
                header:{
                    'Content-Type': 'application/json' },
                data: {
                    id: newItem.id,
                    text: newItem.text,
                    state: false
                }
            };
            axio(options)
                .then(response => {
                    console.log(response);
                })
                .catch(error =>{
                    console.log(error)
                })
        }
        }


        render()
        {
            return (
                <div className="App" onLoad={this.loadData}>
                    <header>
                        <form id="todoform" onSubmit={this.addItem}>
                            <input type="text" placeholder="Enter task" value={this.state.currentItem.text}
                                   onChange={this.handleInput}/>
                            <button type="submit">Add</button>
                        </form>
                    </header>
                    <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}
                               changeState={this.changeState}/>
                </div>
            );
        }
    }


    export
    default
    App;
