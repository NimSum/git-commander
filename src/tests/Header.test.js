import React from 'react';
import Header from '../header/Header';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Header' , () => {
  
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(
      < Header />
    );
  });

  it('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })


})
