<<<<<<< HEAD
/*import React, { useState } from 'react';*/
=======
import React, { useState } from 'react';
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
import { HomeInterface } from './HomeInt';
import {SwitchOne} from './Switch';
import './Home.css';


export function HomePage({setCurrPage}: HomeInterface) {
    


    return (
        <p className="Home">
            <h1>Home page</h1>
            <div><SwitchOne setCurrPage={setCurrPage} newCurrPage={1} type={"button"}></SwitchOne>
            <SwitchOne setCurrPage={setCurrPage} newCurrPage={2} type={"button"}></SwitchOne>
            <SwitchOne setCurrPage={setCurrPage} newCurrPage={3} type={"button"}></SwitchOne></div>
            
<<<<<<< HEAD
=======
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>ZhihuaSun</p>
            <p>Ray Fischer</p>
            <p>Connor Chipoletti</p>
            
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
        </p>
    );
}

export default HomePage;

