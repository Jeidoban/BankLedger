import React from 'react';
import { shallow } from 'enzyme';
import LoginSignupForm from './LoginSignupForm';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("LoginSignupForm", () => {
    it("should render LoginSignupForm", () => {
        const wrapper = shallow(<LoginSignupForm />);
        expect(wrapper).toBeTruthy();
    });  
});