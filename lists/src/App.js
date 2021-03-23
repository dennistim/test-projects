import React, {useState} from 'react';
import { v1 as uid } from 'uuid';
import ListItem from './components/ListItem';

function App() {
    const [list, setList] = useState([
        {
            id: 1,
            title: '1',
            subList: [
                {
                    id: 99,
                    title: '1 - 1',
                    parentId: 1,
                    subList: [
                        {
                            id: 100,
                            title: '1 - 1 - 1',
                            parentId: 99,
                            subList: []
                        },
                        {
                            id: 101,
                            title: '1 - 1 - 2',
                            parentId: 99,
                            subList: [
                                {
                                    id: 120,
                                    title: '1 - 1 - 2 - 1',
                                    parentId: 101,
                                    subList: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 88,
                    title: '1 - 2',
                    parentId: 1,
                    subList: []
                }
            ],
        },
        {
            id: 2,
            title: '2',
            subList: [],
        },
        ]
    );

    const updateNested = (nodes, id, parentId) => {
        return nodes.map((node) => {
            if (node.id === parentId) {
                const itemToUpdateIndex = node.subList.findIndex(item => item.id === id);
                const updatedSubList = arrayMove([...node.subList], itemToUpdateIndex, itemToUpdateIndex - 1);

                return {
                    ...node,
                    subList: updatedSubList
                }
            }
            else return {
                ...node,
                ...(node.subList && {subList: updateNested (node.subList, id, parentId)})
            }
        })
    }

    function arrayMove(arr, fromIndex, toIndex) {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
        return arr;
    }

    const onUp = (id, parentId) => {
        if (!parentId) {
            const itemToUpdateIndex = list.findIndex(item => item.id === id);
            const updatedList = arrayMove([...list], itemToUpdateIndex, itemToUpdateIndex - 1);
            setList(updatedList);
        } else {
            const updatedList = updateNested(list, id, parentId);
            setList(updatedList);
        }
    }

    const onDown = (id, parentId) => {
        if (!parentId) {
            const itemToUpdateIndex = list.findIndex(item => item.id === id);
            const updatedList = arrayMove([...list], itemToUpdateIndex, itemToUpdateIndex + 1 );
            setList(updatedList);
        } else {
            const updatedList = updateNested(list, id, parentId);
            setList(updatedList);
        }
    }

    const onAdd = (parentId, textItem) => {
        const newItem = {
            id: uid(),
            parentId: parentId,
            title: textItem,
            sublist: [],
        };
        const parentList = list.find(item => item.id === parentId);
        console.log(parentList);

    }

    const onDelete = () => {

    }



    const getListItem = (listItem, isParent = false) => (
        <ListItem
            key={listItem.id}
            listItem={listItem}
            getListItem={getListItem}
            isParent={isParent}
            onUp={onUp}
            onDown={onDown}
            onAdd={onAdd}
            onDelete={onDelete}
        />
    )

    return (
        <>
            <ul>
                {list.map((listItem, i) => (
                    getListItem(listItem, true)
                ))}
            </ul>
            <input type="text" placeholder="New list"/>
            <button>ADD NEW LIST</button>
        </>
    )
}

export default App;
