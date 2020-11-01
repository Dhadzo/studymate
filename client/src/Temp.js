import React from 'react';
import {useState} from 'react';
 
function Temp(){
    
    const  [count, setCount]  = useState(0);

    const increment = () => {
        setCount(count +1);
    }

    return (
    
        <div >
            <button onClick={increment}>
                Click here to increment
            </button>
            <h2>{count}</h2>
        </div>
    );
}

export default Temp;