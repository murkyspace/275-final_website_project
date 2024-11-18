import { HomeInterface } from './HomeInt';
import './Home.css';


export function HomePage({ setCurrPage }: HomeInterface) {
    return (
        <div className="HomeBackground" style={{ backgroundSize:"cover", backgroundPosition:"center", color: "#000000", padding: "20px", minHeight: "100vh" }}>
            <div className="container text-center" style={{ }}>
                
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>Pathfinder</h1>
                <div className="row">
                    <div className="quiz_selection_widget">
                        <h1>Choose a Quiz!</h1>
                        <div className="text-content">
                            <div className="choice-card">
                                <h2>A Quick Stop</h2>
                                <div className="nav-buttons" style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "40px" }}>
                                    <button onClick={() => setCurrPage(1)} style={{ backgroundColor: "#B8EBD0", color: "#2B3A67", borderRadius: "20px", 
                                        padding: "10px 20px", border: "none", fontSize: "1rem" }}>
                                        Short Quiz
                                    </button>
                                </div>
                                <p>In this quiz, you will be given a few questions where you will answer based on agreement or disagreement, 
                                    then we will assess your answers and suggest a career based on what might fit the best.</p>
                                
                            </div>
                        
                            <div className="choice-card">
                                <h2>The Long Drive</h2>
                                <div className="nav-buttons" style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "40px" }}>
                                    <button onClick={() => setCurrPage(2)} style={{ backgroundColor: "#B8EBD0", color: "#2B3A67", borderRadius: "20px", 
                                        padding: "10px 20px", border: "none", fontSize: "1rem" }}>
                                        Long quiz
                                    </button>
                                </div>
                                <p>In this quiz, you will be given a few short answer questions where you can give more descriptive answers yourself for 
                                    a chance at a more accurate assessment of the career that you are looking for.</p>
                            </div>
                        </div>
                    </div>
                    <div className="Results-choice-card">
                        <h2>Check Your Results</h2>
                        <div className="nav-buttons" style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "40px" }}>
                            <button onClick={() => setCurrPage(3)} style={{ backgroundColor: "#63C7B2", color: "#2B3A67", borderRadius: "20px", padding: "10px 20px", border: "none", fontSize: "1rem" }}>
                                Result 
                            </button>
                        </div>
                        <p>Use this button to see the career that we have picked out for you.</p>
                        <p>(Disclaimer, the results from this page are generated by AI using OpenAI, so the results may or may not be formatted weirdly.)</p>
                    </div>
                </div>
                
                <footer className="inspired-by" style={{ textAlign: "right", fontStyle: "italic", marginTop: "20px", backgroundColor: "#8D5A97"}}>
                    Page by <span style={{ fontWeight: "bold" }}>ZHIHUA,CONNOR,RAY</span>
                </footer>
                
            </div>
        </div>
    );
}

export default HomePage;

