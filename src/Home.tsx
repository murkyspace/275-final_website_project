import { HomeInterface } from './HomeInt';
import {SwitchOne} from './Switch';
import './Home.css';


export function HomePage({setCurrPage}: HomeInterface) {
    


    return (
        <div style={{backgroundColor:"#8D5A97"}}><p className="Home" style={{marginLeft:"20%", marginRight:"20%"}}>
            <div className="container-fluid">
                <h1>Home page</h1>
                <div className="row">
                    <div className="col-sm-6" style= {{color: "pomp and power" }}>
                        <h3>Basic Questions</h3>
                        <p>This button will take you to a page with Agree/Disagree questions to learn about your personality type</p>
                        <div><SwitchOne setCurrPage={setCurrPage} newCurrPage={1} type={"button"}></SwitchOne></div>
                    </div>
                    <div className="col-sm-6" style= {{color: "celadon" }}>
                        <h3>Basic Questions</h3>
                        <p>This button will take you to a page with Agree/Disagree questions to learn about your personality type</p>
                        <div><SwitchOne setCurrPage={setCurrPage} newCurrPage={2} type={"button"}></SwitchOne></div>
                    </div>
                </div>
            </div>
            <div>
            
            <SwitchOne setCurrPage={setCurrPage} newCurrPage={3} type={"button"}></SwitchOne></div>
        </p></div>
        
    );
}

export default HomePage;

