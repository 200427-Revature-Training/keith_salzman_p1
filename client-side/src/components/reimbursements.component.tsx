import React, { useState, useEffect } from 'react';
import * as reimbursementRemote from '../remote/reimbursements.remote';
import { Reimbursement } from '../models/Reimbursement';
import { Modal, Button, Form, Table, Col } from 'react-bootstrap';
import "./reimbursements.component.css";


export const ReimbursementComponent: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
    const [inputReimbursementAmount, setInputReimbursementAmount] = useState(0);
    const [inputReimbursementDescription, setInputReimbursementDescription] = useState('');
    const [inputReimbursementReceipt, setInputReimbursementReceipt] = useState({});
    const [inputReimbursementAuthor, setInputReimbursementAuthor] = useState(0);
    const [inputReimbursementTypeId, setInputReimbursementTypeId] = useState(1);
    const [validated, setValidated] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadReimbursements();
    }, [])

    const addReimbursement = async () => {
        const payload = {
            reimbAmount: inputReimbursementAmount,
            reimbDescription: inputReimbursementDescription,
            reimbReceipt: inputReimbursementReceipt,
            reimbAuthor: localStorage.getItem('userId'),
            reimbTypeId: inputReimbursementTypeId,
        };

        await reimbursementRemote.createReimbursement(payload);
        setInputReimbursementAmount(0);
        setInputReimbursementDescription('');
        setInputReimbursementReceipt({});
        setInputReimbursementAuthor(0);
        setInputReimbursementTypeId(0);
        setModalVisible(false);
        loadReimbursements();
    }

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setInputReimbursementReceipt(e.target.files[0]);
        }
    };

    const handleSubmit = (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
    };

    const loadReimbursements = () => {
        reimbursementRemote.getReimbursementsById(+JSON.parse(JSON.stringify(localStorage.getItem('userId')))).then(reimbursements => {
            setReimbursements(reimbursements);
        });
    }

    return (
        <div id="flex-container">
            <header>
                <h2 id="reimbursement-header" className="dark">Reimbursements
                </h2>
            </header>

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
                                <td>{typeof r.reimbResolved == 'string' ?
                                    r.reimbResolved :
                                    r.reimbResolved.toDateString()}</td>
                                <td>{r.reimbDescription}</td>
                                <img id="img" src={r.reimbReceipt}></img>
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
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                                <input type="file" onChange={(e) => upload(e)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Type</Form.Label>
                                <Form.Control id="change-type" as="select" type="number" value={inputReimbursementTypeId} onChange={
                                    (e) => setInputReimbursementTypeId(+e.target.value)}>
                                    <option value="1">Lodging</option>
                                    <option value="2">Travel</option>
                                    <option value="3">Food</option>
                                    <option value="4">Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalVisible(false)}>Close</Button>
                    <Button type="submit" onClick={() => addReimbursement()}>Submit</Button>
                </Modal.Footer>
            </Modal>
            <footer>
                <Button id="add-reimbursement-button" variant="info" onClick={() => setModalVisible(true)}>Add Reimbursement</Button>{' '}
            </footer>
        </div>
    )

}