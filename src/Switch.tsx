import { switchpages } from './switchpage';
import { Button } from 'react-bootstrap';

export function SwitchOne({setCurrPage, newCurrPage, type}: switchpages) {
    const buttonName: string[]=["Home Page", "Basic Page", "Detailed Page", "Results Page"];

    function changePage() {
        if((setCurrPage && newCurrPage) || (setCurrPage && newCurrPage === 0)){
            setCurrPage(newCurrPage);
        }
    }

    if(type==="button") {
        return (<Button onClick={changePage}>{buttonName[newCurrPage]}</Button>);
    } else {
        return (<Button variant="text" onClick={changePage}>{(newCurrPage && buttonName[newCurrPage]) || (newCurrPage === 0 && buttonName[newCurrPage])}</Button>);
    }
}