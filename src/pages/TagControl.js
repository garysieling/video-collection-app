import React from 'react';
import tagControlStyles from './TagControl.module.css';

const tags = [
    'ceiling_fan', 
    'breaker_box', 
    'sump_pump', 
    'washer',
    'dryer',
    'lamp',
    'furnace',
    'oil_tank'
];

export default 
    ({defaultValue, setTag}) =>
        <div>
            {
                tags.map(
                    (tag) => 
                        <button 
                            onClick={() => setTag(tag)}
                            key={tag}
                            className={
                                defaultValue === tag ? 
                                    tagControlStyles.buttonSelected : 
                                    tagControlStyles.button
                            }>
                            {tag}
                        </button>
                )
            }
        </div>