import React from "react";
import './ListItem.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function ListItems(props) {
    const items = props.items;
    const listItems = items.map(item => {
        return <div className={item.state ?"list-done":"list"} key={item.key} onDoubleClick={() => props.changeState(item.key)}>
            <p>
                <input  type="text" id={item.key} value={item.text}
                   onChange={(e) => props.setUpdate(e.target.value,item.key)}/>
                <span>
                <FontAwesomeIcon className="faicons" icon='trash'
                                 onClick={() => props.deleteItem(item.key)}
                />
            </span>
            </p>
        </div>
    });
    return (<div> {listItems}</div>

    )
}

export default ListItems