import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import Transaction from './Transaction';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Transaction", () => {
    it("should render Transaction", () => {
        const wrapper = shallow(<Transaction />);
        expect(wrapper).toBeTruthy();
    });  
});