import React from 'react';
import { ReimbursementComponent } from '../../components/reimbursements.component';
import { mount, shallow } from 'enzyme';
import { ReimbursementManagerComponent } from '../../components/reimbursement-manager.component';

jest.mock('../../remote/reimbursements.remote')

const setUp = (props={}) => {
    const component = shallow(<ReimbursementComponent {...props} />);
    return component
}


describe('ReimbursementManagerComponent', () => {



    test('should render', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-amount')
        input.simulate('change', {target: {value: '0'}});

        console.log(input.props());
        expect(input.prop('value')).toBe(0);
    });

    test('should render', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-amount')
        input.simulate('change', {target: {value: '0'}});

        console.log(input.props());
        expect(input.prop('value')).toBe(0);
    });
    
    test('should render', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-description')
        input.simulate('change', {target: {value: 'new'}});

        console.log(input.props());
        expect(input.prop('value')).toEqual('');
    });

    test('should render', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-amount')
        input.simulate('change', {target: {value: '0'}});

        console.log(input.props());
        expect(input.prop('value')).toBe(0);
    });

    test('should render', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-type')
        input.simulate('change', {target: {value: '0'}});

        console.log(input.props());
        expect(input.prop('value')).toBe(1);
    });


})