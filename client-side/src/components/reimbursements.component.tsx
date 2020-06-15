import React, { useState, useEffect } from 'react';
import * as reimbursementRemote from '../remote/reimbursements.remote';
import { Reimbursement } from '../models/Reimbursement';
import { Modal, Button, Form, Table, Col, Fade, Alert } from 'react-bootstrap';
import "./reimbursements.component.css";


export const ReimbursementComponent: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
    const [inputReimbursementAmount, setInputReimbursementAmount] = useState(0);
    const [inputReimbursementDescription, setInputReimbursementDescription] = useState('');
    const [inputReimbursementReceipt, setInputReimbursementReceipt] = useState({});
    const [inputReimbursementAuthor, setInputReimbursementAuthor] = useState(0);
    const [inputReimbursementTypeId, setInputReimbursementTypeId] = useState(1);
    const [alert, setAlert] = useState(false);
    const [bigPic, setBigPic] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [picModalVisible, setPicModalVisible] = useState(false);


    useEffect(() => {
        loadReimbursements();
    }, [])

    const setInformation = async () => {
        setInputReimbursementAmount(0);
        setInputReimbursementDescription('');
        setInputReimbursementReceipt({});
        setInputReimbursementAuthor(0);
        setInputReimbursementTypeId(0);
        setModalVisible(false);
        loadReimbursements();
    }

    const addReimbursement = async () => {
        const payload = {
            reimbAmount: inputReimbursementAmount,
            reimbDescription: inputReimbursementDescription,
            reimbReceipt: inputReimbursementReceipt,
            reimbAuthor: localStorage.getItem('userId'),
            reimbTypeId: inputReimbursementTypeId,
        };

        try {
            await reimbursementRemote.createReimbursement(payload);
            setAlert(false);
            await setInformation();
        } catch { setAlert(true) }
    }

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setInputReimbursementReceipt(e.target.files[0]);
        }
    };

    const setModalAndAlert = () => {
        setModalVisible(false);
        setAlert(false);
    }

    const loadReimbursements = () => {
        reimbursementRemote.getReimbursementsById(+JSON.parse(JSON.stringify(localStorage.getItem('userId')))).then(reimbursements => {
            setReimbursements(reimbursements);
        });
    }

    const display = (e: any) => {
        setBigPic(e);
        setPicModalVisible(true);
    }

    return (
        <div id="flex-container">
            <header>
                <h2 id="reimbursement-header" className="dark">My Reimbursements
                </h2>
            </header>
            <span id="interface">
                <Button id="add-reimbursement-button" variant="outline-dark" onClick={() => setModalVisible(true)}>Add Reimbursement</Button>{' '}
            </span>
            <section>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Submission Date</th>
                            <th>Resolution Date</th>
                            <th>Description</th>
                            <th>Receipt</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reimbursements.map(r => {
                            return (<tr key={r.reimbId}>
                                <th scope="row">{r.reimbId}</th>
                                <td>{r.reimbAmount}</td>
                                <td>{typeof r.reimbSubmitted == 'string' ?
                                    r.reimbSubmitted :
                                    r.reimbSubmitted.toDateString()}</td>
                                <td>{r.reimbResolved == '1970-01-01T00:00:00.000Z' ?
                                    undefined :
                                    r.reimbResolved}</td>
                                <td>{r.reimbDescription}</td>
                                <img onClick={(e) => display(r.reimbReceipt)} id="img" src={r.reimbReceipt}></img>
                                <td>{r.reimbStatus}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </section>

            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header>
                    <Modal.Title>New Reimbursement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control id="change-amount" required placeholder="Amount" type="number" value={inputReimbursementAmount} onChange={
                                    (e) => setInputReimbursementAmount(+e.target.value)} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Description</Form.Label>
                                <Form.Control id="change-description" required placeholder="Description" type="text" value={inputReimbursementDescription} onChange={
                                    (e) => setInputReimbursementDescription(e.target.value)} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="3" controlId="validationCustom05">
                                <Form.Label>Receipt</Form.Label>
                                <input id="#change-file" type="file" onChange={(e) => upload(e)} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Type</Form.Label>
                                <Form.Control id="dropdown" as="select" type="number" value={inputReimbursementTypeId} onChange={
                                    (e) => setInputReimbursementTypeId(+e.target.value)}>
                                    <option value="1">Lodging</option>
                                    <option value="2">Travel</option>
                                    <option value="3">Food</option>
                                    <option value="4">Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Fade in={alert} timeout={300} >
                            <div className="lars-container" >
                                <Alert className='alert-lars' variant="danger">
                                    Invalid Reimbursement
                                </Alert>
                            </div>
                        </Fade>

                    </Form>
                </Modal.Body>
                <Modal.Footer className="footer-bars">
                    <Button variant="outline-dark" onClick={() => setModalAndAlert()}>Close</Button>
                    <Button variant="outline-dark" type="submit" onClick={() => addReimbursement()}>Submit</Button>
                </Modal.Footer>
            </Modal>
            <div className="pic-container">
                <Modal className="modal-lars" show={picModalVisible} onHide={() => setPicModalVisible(false)}>
                        <img className="img-lars" src={bigPic}></img>
                </Modal>
            </div>
        </div>
    )

}