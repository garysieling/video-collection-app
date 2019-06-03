import React from 'react';
import tagControlStyles from './TagControl.module.css';

const tags = ['ceiling_fan', 'breaker_box', 'sump_pump', 'washer']

export default 
    () =>
        <div>
            {
                tags.map(
                    (tag) => <button key={tag} className={tagControlStyles.button}>{tag}</button>
                )
            }
        </div>