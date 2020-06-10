import React, { useState, useEffect } from 'react';
import * as reimbursementRemote from '../remote/reimbursements.remote';
import { Reimbursement } from '../models/Reimbursement';
import { Modal, Button, Form, Table, Col } from 'react-bootstrap';

export const ReimbursementComponent: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
    const [inputReimbursementAmount, setInputReimbursementAmount] = useState(0);
    const [inputReimbursementSubmitted, setInputReimbursementSubmitted] = useState('');
    const [inputReimbursementResolved, setInputReimbursementResolved] = useState('');
    const [inputReimbursementDescription, setInputReimbursementDescription] = useState('');
    const [inputReimbursementReceipt, setInputReimbursementReceipt] = useState('');
    const [inputReimbursementAuthor, setInputReimbursementAuthor] = useState(0);
    const [inputReimbursementResolver, setInputReimbursementResolver] = useState(0);
    const [inputReimbursementStatusId, setInputReimbursementStatusId] = useState(1);
    const [inputReimbursementTypeId, setInputReimbursementTypeId] = useState(1);
    const [inputReimbursementStatus, setInputReimbursementStatus] = useState('');
    //  const [inputReimbursementType, setInputReimbursementType] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadReimbursements();
    }, [])

    const addReimbursement = async () => {
        const payload = {
            reimbAmount: inputReimbursementAmount,
            reimbSubmitted: inputReimbursementSubmitted,
            reimbResolved: inputReimbursementResolved,
            reimbDescription: inputReimbursementDescription,
            reimbReceipt: inputReimbursementReceipt,
            reimbAuthor: inputReimbursementAuthor,
            reimbResolver: inputReimbursementResolver,
            reimbStatusId: inputReimbursementStatusId,
            reimbTypeId: inputReimbursementTypeId,
            reimbStatus: inputReimbursementStatus
        };

        await reimbursementRemote.createReimbursement(payload);
        setInputReimbursementAmount(0);
        setInputReimbursementSubmitted('');
        setInputReimbursementResolved('');
        setInputReimbursementDescription('');
        setInputReimbursementReceipt('');
        setInputReimbursementAuthor(0);
        setInputReimbursementResolver(0);
        setInputReimbursementStatus('');
        setModalVisible(false);
        loadReimbursements();
    }

    const loadReimbursements = () => {
        console.log(localStorage.getItem('accessToken'));
        reimbursementRemote.getAllReimbursements().then(reimbursements => {
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
                            <th>Author</th>
                            <th>Resolver</th>
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
                                <td>{r.reimbReceipt}</td>
                                <td>{r.reimbAuthor}</td>
                                <td>{r.reimbResolver}</td>
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
                            <Form.Group as={Col}>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control placeholder="Amount" type="number" value={inputReimbursementAmount} onChange={
                                    (e) => setInputReimbursementAmount(+e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Submission Date</Form.Label>
                                <Form.Control placeholder="Submission Date" type="date" value={inputReimbursementSubmitted} onChange={
                                    (e) => setInputReimbursementSubmitted(e.target.value)} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Resolved Date</Form.Label>
                                <Form.Control placeholder="Resolved Date" type="date" value={inputReimbursementResolved} onChange={
                                    (e) => setInputReimbursementResolved(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control placeholder="Description" type="text" value={inputReimbursementDescription} onChange={
                                    (e) => setInputReimbursementDescription(e.target.value)} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Receipt</Form.Label>
                                <Form.Control placeholder="Receipt" type="text" value={inputReimbursementReceipt} onChange={
                                    (e) => setInputReimbursementReceipt(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Author</Form.Label>
                                <Form.Control placeholder="Author" type="text" value={inputReimbursementAuthor} onChange={
                                    (e) => setInputReimbursementAuthor(+e.target.value)} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Resolver</Form.Label>
                                <Form.Control placeholder="Resolver" type="number" value={inputReimbursementResolver} onChange={
                                    (e) => setInputReimbursementResolver(+e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" placeholder="Resolver" type="number" value={inputReimbursementResolver} onChange={
                                    (e) => setInputReimbursementResolver(+e.target.value)}>
                                    <option>Pending</option>
                                    <option>Approved</option>
                                    <option>Denied</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>

                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalVisible(false)}>Close</Button>
                    <Button onClick={() => addReimbursement()}>Submit</Button>
                </Modal.Footer>
            </Modal>
            <footer>
                <Button variant="info" onClick={() => setModalVisible(true)}>Add Reimbursement</Button>{' '}
            </footer>
        </div>
    )

}