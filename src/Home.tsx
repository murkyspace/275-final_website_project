import React from 'react';
import { HomeInterface } from './HomeInt';
import './Home.css'; 

export function HomePage({ setCurrPage }: HomeInterface) {
    return (
        <div className="home-page">
            <div className="container text-center">
                <h1>Research Website Title</h1>

                <div className="nav-buttons">
                    <button onClick={() => setCurrPage(1)}>
                        Basic Question
                    </button>
                    <button onClick={() => setCurrPage(3)}>
                        Result 
                    </button>
                    <button onClick={() => setCurrPage(2)}>
                        Detailed Question
                    </button>
                </div>

                <div className="inspired-by">
                    Page by <span>ZHIHUA, CONNOR, RAY</span>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

