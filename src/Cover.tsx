import { CoverInterface } from './CoverInt';
import {SwitchOne} from './Switch';
import './Cover.css';
import {ApiKey} from './ApiKey';

export function CoverPage({setCurrPage}: CoverInterface) {
    
    return (
        <p className="Cover" style={{marginLeft:"20%", marginRight:"20%"}}>
            <div className="container-fluid">
                <h1>Cover page</h1>
                <ApiKey></ApiKey>
            </div>
            <div><SwitchOne setCurrPage={setCurrPage} newCurrPage={0} type={"button"}></SwitchOne></div>
        </p>
    );
}

export default CoverPage;

