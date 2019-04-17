import React from 'react';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure, mount } from 'enzyme';

configure({adapter: new Adapter()});
jest.useFakeTimers();

describe('Challenge card' , () => {



  const defaultState = {
    challenges: [],
    currentRound: 1,
    startGame: false,
    playerName: '',
    collide: false,
    resetGame: false
  }

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      < App />
    );
  });
  
  it('Should fetch data when mounted', () => {
    const spyComponentDidMount = jest.spyOn(App.prototype, 'componentDidMount')
    let mockMount= mount(<App />)
    expect(spyComponentDidMount).toHaveBeenCalled();
  })

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

  it('Should be able to start and end collision', () => {
    wrapper.instance().collide(true);
    expect(wrapper.state().collide).toEqual(true);
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);

    wrapper.instance().collide(false);
    expect(wrapper.state().collide).toEqual(false);
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  })

  it('Should be able to reset game', () => {
    wrapper.state().currentRound = 5;

    wrapper.instance().resetGame();
    expect(wrapper.state().currentRound).toEqual(1);
    
  })

})