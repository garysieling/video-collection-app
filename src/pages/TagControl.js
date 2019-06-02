import React from 'react';
import tagControlStyles from './TagControl.module.css';

const tags = ['ceiling_fan', 'breaker_box', 'sump_pump', 'washer']

export default 
    () =>
        <div>
            <h1>Tags</h1>
            {
                tags.map(
                    (tag) => <button key={tag} className={tagControlStyles.button}>{tag}</button>
                )
            }
        </div>