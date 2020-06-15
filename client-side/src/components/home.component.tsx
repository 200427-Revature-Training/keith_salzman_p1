import React, { useEffect } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import './home.component.css';


export const HomeComponent: React.FC = () => {

    return (

        <div>
            <Jumbotron className="jumbo-lars">
                <h1>Reimbursements!</h1>
                <p>
                    Nont enough Money? Your solution is here!
                </p>
                <p>
                    <Button variant="outline-dark">Learn more</Button>
                </p>
            </Jumbotron>
        </div>
    )

}
