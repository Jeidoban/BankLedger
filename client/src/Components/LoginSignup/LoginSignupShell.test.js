import React from 'react';
import { shallow } from 'enzyme';
import LoginSignupShell from './LoginSignupShell';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("LoginSignupShell", () => {
    it("should render LoginSignupShell", () => {
        const wrapper = shallow(<LoginSignupShell />);
        expect(wrapper).toBeTruthy();
    });  
});