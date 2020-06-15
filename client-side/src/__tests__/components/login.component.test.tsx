import React from 'react';
import { LoginComponent } from '../../components/login.component';
import * as loginService from '../../components/login.component';
import { mount, shallow } from 'enzyme';

jest.mock('../../remote/reimbursements.remote')

const mockFn = jest.fn();

const setUp = (props={}) => {
    const component = shallow(<LoginComponent {...props} />);
    return component
}

describe('LoginComponent', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    test('should render', () => {

        const wrapper = setUp();
        console.log(wrapper.debug())
        expect(wrapper).toBeDefined();
    });

    test('should change value of username on input', () => {
        const wrapper = shallow(<LoginComponent />);
        const input = wrapper.find('#username-input')
        input.simulate('change', {target: {value: ''}});

        console.log(input.props());
        expect(input.prop('value')).toBe('');
    });

    test('should change value of password on input', () => {
        const wrapper = shallow(<LoginComponent />);
        const input = wrapper.find('#password-input')
        input.simulate('change', {target: {value: ''}});

        expect(input.prop('value')).toBe('');
    });

    test('should change value of password on input', () => {
        const wrapper = shallow(<LoginComponent />);
        const input = wrapper.find('Button').first()
        input.simulate('click');

        expect(mockFn).toBeCalled();
    });

    
})