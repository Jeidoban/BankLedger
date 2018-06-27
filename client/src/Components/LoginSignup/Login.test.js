import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Login", () => {
    it("should render Login", () => {
        const wrapper = shallow(<Login />);
        expect(wrapper).toBeTruthy();
    });  
});