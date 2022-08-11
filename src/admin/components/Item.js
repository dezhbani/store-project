import React from 'react';

import style from "./Item.module.css";

const Item = ({icon, name}) => {
    return (
        <div className={style.container}>
            <div>{icon}</div>
            <h3>{name}</h3>
        </div>
    );
};

export default Item;