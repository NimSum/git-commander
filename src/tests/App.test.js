import React from 'react';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Challenge card' , () => {


  let wrapper;
  const defaultState = {
    challenges: [],
    currentRound: 1,
    startGame: false,
    playerName: ''
  }

  beforeEach(() => {
    wrapper = shallow(
      < App />
    );
  });

  it('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('Should have default state properties', () => {
    expect(wrapper.state()).toEqual(defaultState);
  })

  it('Should be able to start game', () => {
    wrapper.instance().startGame('NIMSUM');
    expect(wrapper.state().playerName).toEqual('NIMSUM');
    expect(wrapper.state().startGame).toEqual(true);
  })

  it('Should be able to change round', () => {
    wrapper.instance().nextRound();
    expect(wrapper.state().currentRound).toEqual(2);
    wrapper.instance().nextRound();
    expect(wrapper.state().currentRound).toEqual(3);
    wrapper.instance().nextRound();
    expect(wrapper.state().currentRound).toEqual(4);
  })

})