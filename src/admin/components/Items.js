import React from 'react';
import panelitem from './dashboard.item';
import Item from './Item';

import style from "./Items.module.css";

const Items = () => {
    return (
        <div>
            <div className={style.container}>
                <div className={style.main}>
                    {
                        panelitem.map(item => <div><Item icon={item.icon} name={item.name}/></div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Items;