import React, {useState, memo} from 'react';
import Button from './Button';

const ListItem = memo(({listItem, getListItem, onDelete, onAdd, onChangeOrder, disableDown, disabledUp}) => {
  const [hidden, setHidden] = useState(false);
  const [name, setName] = useState('');

  const hide = () => setHidden(!hidden);

  const handleOnChange = (e) => setName(e.target.value);

  return (
    <>
      <li
        className="container flexBox">
        <div className="flexBox">
          <p>{listItem.title}</p>
        </div>
        <div className="flexBox">
          <div className="flexBox">
            <Button
              type="primary"
              disabled={disabledUp}
              onClick={() => onChangeOrder(listItem.id, listItem.parentId, 'up')}
            >
              up
            </Button>
            <Button
              type="primary"
              disabled={disableDown}
              onClick={() => onChangeOrder(listItem.id, listItem.parentId, 'down')}
            >
              down
            </Button>
            <Button
              type="danger"
              onClick={() => onDelete(listItem.id, listItem.parentId)}
            >
              delete
            </Button>
          </div>
          <div>
            <input
              type="text"
              placeholder="New Item"
              id={listItem.id}
              onChange={handleOnChange}
              value={name}
            />
            <Button
              type="secondary"
              onClick={() => {
                onAdd(listItem.id, listItem.parentId, name);
                setName('')
              }}
            >
              add sub item
            </Button>
          </div>
        </div>
      </li>

      {listItem.subList.length > 0 && (<button onClick={hide} className='hasSubList'/>)}
      {!hidden && (
        listItem.subList && listItem.subList.length > 0 && (
          <ul>
            {listItem.subList.map(
              (item, index) =>
                (getListItem(
                  item,
                  index === listItem.subList.length - 1 || listItem.subList.length === 1,
                  index === 0
                )))
            }
          </ul>
        )
      )}

    </>
  );
})


export default ListItem;
