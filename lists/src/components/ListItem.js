import React, {useState} from 'react';

const styles = {
    parent: {
        container: {
            border: '1px solid green',
            padding: '5px 10px',
            margin: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: 500,
            width: '100%'
        }
    },
    child: {
        container: {
            border: '1px solid red',
            padding: '5px 10px',
            margin:'5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: 250,
            width: '100%'
        }
    },
    ul: {

    },
    button: {
    margin:'5px'
    }
}

function ListItem ({listItem, getListItem, isParent, onUp, onDown, onDelete, onAdd}){
    //const [hidden, setHidden] = useState(false);
    const listStyles = isParent ? styles.parent : styles.child;

    //const hide = () => setHidden(!hidden);

    const getValue = (id) => {
        return document.getElementById(id).value;
    }

    return (
        <>
            <li style={listStyles.container} /*onClick={hide}*/ >
                <p>{listItem.title}</p>
                <div>
                    <button onClick={() => onUp(listItem.id, listItem.parentId)}>UP</button>
                    <button onClick={() => onDown(listItem.id, listItem.parentId)}>DOWN</button>
                    <button onClick={() => onDelete(listItem.id, listItem.parentId)}>DELETE</button>
                </div>
            </li>
            <li>
                <input type="text" placeholder="New Item" id={listItem.id}/>
                <button onClick={()=>onAdd(listItem.id, getValue(listItem.id))}>Add Item to {listItem.title}</button>
            </li>

            {listItem.subList && listItem.subList.length > 0 && (
                <>
                    {/*!hidden && (*/
                        <ul style={styles.ul}>
                            {listItem.subList.map(item => getListItem(item))}
                        </ul>
                    //)
                        }
                </>
            )}
        </>
    );
}



export default ListItem;