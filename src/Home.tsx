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
        </p>
    );
}

export default HomePage;

