import React from 'react';
import { ReimbursementManagerComponent } from '../../components/reimbursement-manager.component';
import { mount, shallow } from 'enzyme';
import { getAllReimbursements, getAllReimbursementsByStatus } from '../../remote/reimbursements.remote';

jest.mock('../../remote/reimbursements.remote')
const mockGetReimbursements = getAllReimbursements as any;
const mockFilterAllByStatus = getAllReimbursementsByStatus as any;

const setModalvisible = jest.fn();


const setUp = (props = {}) => {
    const component = shallow(<ReimbursementManagerComponent {...props} />);
    return component
}

describe('ReimbursementManagerComponent', () => {


    test('should render', () => {
        const wrapper = shallow(<ReimbursementManagerComponent />);
        const input = wrapper.find('#change-id-input')
        input.simulate('change', {
            target: {
                value: 0
            }
        });

        expect(input.prop('value')).toBe(0);
    });

    test('should render', () => {
        const wrapper = shallow(<ReimbursementManagerComponent />);
        const input = wrapper.find('#inlineFormCustomSelect')
        input.simulate('change', {
            target: {
                value: 0
            }
        });

        expect(input.prop('value')).toBe(0);
    });


})