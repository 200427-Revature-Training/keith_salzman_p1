import React from 'react';
import { LoginComponent } from '../../components/login.component';
import { mount, shallow } from 'enzyme';

jest.mock('../../remote/reimbursements.remote')

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

    
})