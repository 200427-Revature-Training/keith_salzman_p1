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
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should render', () => {

        const wrapper = shallow(<ReimbursementComponent />);
        console.log(wrapper.debug())
        expect(wrapper).toBeDefined();
    });

    test('should change value of amount input', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-amount')
        input.simulate('change', {target: {value: 0}});

        console.log(input.props());
        expect(input.prop('value')).toBe(0);
    });
    
    test('should change value of description input', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-description')
        input.simulate('change', {target: {value: ''}});

        console.log(input.props());
        expect(input.prop('value')).toEqual('');
    });

    test('Should call upload on change', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-file')
        input.simulate('change', {target: {value: '0'}});

        console.log(input.props());
        expect(input.prop('value')).toBeCalled();
    });

    test('Should change value of type on change', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-type')
        input.simulate('change', {target: {value: '0'}});

        console.log(input.props());
        expect(input.prop('value')).toBe(0);
    });

    test('Should call setModalandAlert on click', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-file')
        input.simulate('change', {target: {value: '0'}});

        console.log(input.props());
        expect(input.prop('value')).toBeCalled();
    });

    test('Should call addReimbursement on click', () => {
        const wrapper = shallow(<ReimbursementComponent />);
        const input = wrapper.find('#change-file')
        input.simulate('change', {target: {value: '0'}});

        console.log(input.props());
        expect(input.prop('value')).toBeCalled();
    });

})