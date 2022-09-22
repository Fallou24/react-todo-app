import React from 'react';
import Edit from './Edit';
import RemoveItem from './RemoveItem';

const List = ({list,removeItem,editItem}) => {
    
    return (
        <div>
            {list.map(value =>{
                return (
                    <div className='item__container' key={value.id}>
                        <p >{value.title} </p>
                        <div className="btn-container">
                            <button onClick={()=>editItem(value.id)}><Edit /></button>
                            <button onClick={()=>removeItem(value.id)}><RemoveItem /></button>
                        </div>
                    </div>
                )
            })}
            
            
        </div>
        
    );
};

export default List;