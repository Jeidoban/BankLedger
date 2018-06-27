import React from 'react';
import { shallow } from 'enzyme';
import LedgerShell from './LedgerShell';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("LedgerShell", () => {
    it("should render LedgerShell", () => {
        const wrapper = shallow(<LedgerShell />);
        expect(wrapper).toBeTruthy();
    });  
});