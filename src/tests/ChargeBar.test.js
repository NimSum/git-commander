import React from 'react';
import ChargeBar from '../user-interface/ChargeBar';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Charge Bar' , () => {
  

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      < ChargeBar 
      />
    );
  });

  it('Should generate match charge bar snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

})