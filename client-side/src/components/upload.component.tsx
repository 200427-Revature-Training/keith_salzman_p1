import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Table, Modal } from 'react-bootstrap';
import './upload.component.css';
import { Reimbursement } from '../models/Reimbursement';
import * as reimbursementRemote from '../remote/reimbursements.remote';


export const UploadComponent: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
    const [inputReimbursementId, setInputReimbursementId] = useState(0)
    const [inputReimbursementStatusId, setInputReimbursementStatusId] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const loadReimbursements = () => {
        reimbursementRemote.getAllReimbursements().then(reimbursements => {
            setReimbursements(reimbursements);
        });
    }

    const setStatus = async () => {
        const payload = {
            reimbId: inputReimbursementId,
            reimbStatusId: inputReimbursementStatusId
        };

        await reimbursementRemote.patchReimbursement(payload);
        setInputReimbursementId(0);
        setInputReimbursementStatusId(1)
        loadReimbursements();
    }

    useEffect(() => {
        loadReimbursements();
    }, [])

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
                                <th scope="row">{r.reimbId} </th>
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
                        <Modal.Title>Change Reimbrusement Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Reimdursement ID</Form.Label>
                                    <Form.Control placeholder="Amount" type="number" value={inputReimbursementId} onChange={
                                        (e) => setInputReimbursementId(+e.target.value)} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="mr-sm-2"
                                        id="inlineFormCustomSelect"
                                        custom
                                        value={inputReimbursementStatusId} onChange={
                                            (e) => setInputReimbursementStatusId(+e.target.value)}
                                    >
                                        <option value="1">Pending</option>
                                        <option value="2">Accept</option>
                                        <option value="3">Deny</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setModalVisible(false)}>Close</Button>
                        <Button onClick={() => setStatus()}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                <footer>
                    <Button variant="info" onClick={() => setModalVisible(true)}>Change Status</Button>{' '}
                </footer>
        </div>
    )
}