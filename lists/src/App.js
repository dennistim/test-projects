import React, {useState} from 'react';
import './App.css';
import { v1 as uid } from 'uuid';
import ListItem from './components/ListItem';
import Button from './components/Button';
import Container from './components/Container';

function App() {
    const [name, setName] = useState('');
    const [list, setList] = useState([]);

    const handleOnChange = (e) => setName(e.target.value);

    const changeElementOrder = (array, id, moveTo = 'up') => {
        const fromIndex = array.findIndex(item => item.id === id);
        const toIndex = moveTo === 'up' ? fromIndex - 1 : moveTo === 'down' ? fromIndex + 1 : 1;
        return changeElementIndexInArray([...array], fromIndex, toIndex);
    };

    const changeElementOrderInNestedList = (array, id, parentId, moveTo = 'up') => (
        array.map((item) => {
            if (item.id === parentId) {
                const updatedSubList = changeElementOrder(item.subList, id, moveTo);

                return {
                    ...item,
                    subList: updatedSubList
                }
            }
            return {
                ...item,
                ...(item.subList && {subList: changeElementOrderInNestedList(item.subList, id, parentId, moveTo)})
            }
        })
    )

    const addElementToSubList = (array, clickedId, newItem) => (
        array.map((item) => {
            if (item.id === clickedId) {
                return {
                    ...item,
                    subList: [
                        ...item.subList,
                        newItem
                    ]
                }
            }
            return {
                ...item,
                ...(item.subList && {subList: addElementToSubList(item.subList, clickedId, newItem)})
            }
        })
    )

    const changeElementIndexInArray = (arr, fromIndex, toIndex) => {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
        return arr;
    }

    const deleteElementFromList = (array, id, parentId) => (
        array.map((item) => {
            if (item.id === parentId) {
                const updatedSubList = item.subList.filter(listItem => listItem.id !== id);
                return {
                    ...item,
                    subList: updatedSubList
                }
            }
            return {
                ...item,
                ...(item.subList && {subList: deleteElementFromList(item.subList, id, parentId)})
            }
        })
    )

    const handleChangeOrder = (id, parentId, moveTo) => {
        let updatedList;
        if (!parentId) updatedList = changeElementOrder(list, id, moveTo);
        else updatedList = changeElementOrderInNestedList(list, id, parentId, moveTo);
        setList(updatedList);
    }

    const onAdd = (clickedId, parentId, title, isTopLevel) => {
        if (!title) return;

        const newList = {
            id: uid(),
            parentId: clickedId ? clickedId : null,
            title: title,
            subList: [],
        };

        if (isTopLevel) {
            setName('');
            setList([
                ...list,
                newList
            ])
            return;
        }

        const updatedList = addElementToSubList(list, clickedId, newList);
        setList(updatedList);
    }

    const onDelete = (id, parentId) => {
        let updatedList;
        if (!parentId) updatedList = list.filter(listItem => listItem.id !== id)
        else updatedList = deleteElementFromList(list, id, parentId);
        setList(updatedList);
    }

    const getListItem = (listItem, disableDown, disabledUp) => (
        <ListItem
            key={listItem.id}
            listItem={listItem}
            getListItem={getListItem}
            onAdd={onAdd}
            onChangeOrder={handleChangeOrder}
            onDelete={onDelete}
            disableDown={disableDown}
            disabledUp={disabledUp}
        />
    )

    return (

        <Container>
            <ul>
                {list.map((listItem, index) => (
                    getListItem(
                        listItem,
                        index === list.length - 1,
                        index === 0
                    )
                ))}
            </ul>
            <div>
                <input value={name} onChange={handleOnChange} type="text" placeholder="New list"/>
                <Button onClick={() => onAdd(null, null, name, true)} type="primary">Add</Button>
            </div>
        </Container>
    )
}

export default App;
