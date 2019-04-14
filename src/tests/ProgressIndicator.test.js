import React from 'react';
import ProgressIndicator from '../game-interface/ProgressIndicator';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Progress Indicator' , () => {

  let mockRound = 3;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      < ProgressIndicator 
        currRound={mockRound}
      />
    );
  });

  it('Should render card based on current round', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
})