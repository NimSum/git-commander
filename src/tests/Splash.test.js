import React from 'react';
import Splash from '../splash-page/Splash';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Progress Indicator' , () => {

  let wrapper;
  let mockStartGame = jest.fn();
  let mockEvent = {
    target: { value: 'NIMSUM' },
    preventDefault: () => {}
  }


  beforeEach(() => {
    wrapper = shallow(
      < Splash 
        startGame={mockStartGame}
      />
    );
  });

  it('Should have default states', () => {
    expect(wrapper.state()).toEqual( {
      userName: '',
      octoForward: false
    } )
  })

  it('Should match rendered snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('Should handle username change', () => {
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('userName')).toEqual('NIMSUM');
  })

  it('Should start game', () => {
    wrapper.instance().startGame(mockEvent);
    expect(wrapper.state('octoForward')).toEqual(true);
    setTimeout(() => expect(mockStartGame).toHaveBeenCalled(), 2000);
  })

  it('Should invoke startGame when Start Game button is clicked', () => {
    wrapper.find('.start-game-btn').simulate(
      'click', {
        preventDefault: () => {}
      }
    )
  })
  
})