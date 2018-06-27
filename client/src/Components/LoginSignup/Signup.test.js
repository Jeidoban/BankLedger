import React from 'react';
import { shallow } from 'enzyme';
import Signup from './Signup';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Signup", () => {
    it("should render Signup", () => {
        const wrapper = shallow(<Signup />);
        expect(wrapper).toBeTruthy();
    });  
});