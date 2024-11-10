import { HomeInterface } from './HomeInt';
import './Home.css';

export function HomePage({ setCurrPage }: HomeInterface) {
    return (
        <div style={{ backgroundColor: "#2B3A67", color: "#EAEAEA", padding: "20px", minHeight: "100vh" }}>
            <div className="container text-center">
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>Research Website Title</h1>
                
                <div className="nav-buttons" style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "40px" }}>
                    <button onClick={() => setCurrPage(1)} style={{ backgroundColor: "#F2A65A", color: "#2B3A67", borderRadius: "20px", padding: "10px 20px", border: "none", fontSize: "1rem" }}>
                        Basic Question
                    </button>
                    <button onClick={() => setCurrPage(3)} style={{ backgroundColor: "#63C7B2", color: "#2B3A67", borderRadius: "20px", padding: "10px 20px", border: "none", fontSize: "1rem" }}>
                       Result 
                    </button>
                    <button onClick={() => setCurrPage(2)} style={{ backgroundColor: "#F2A65A", color: "#2B3A67", borderRadius: "20px", padding: "10px 20px", border: "none", fontSize: "1rem" }}>
                        Detailed Question
                    </button>
                </div>

                <div className="inspired-by" style={{ textAlign: "right", fontStyle: "italic", marginTop: "20px" }}>
                    Page by <span style={{ fontWeight: "bold" }}>ZHIHUA,CONNOR,RAY</span>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

