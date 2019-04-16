import React from 'react';
import GameWindow from '../game-interface/GameWindow';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});
jest.useFakeTimers();

describe('Game Window' , () => {
  
  let wrapper;
  const currRound = 1;
  
  beforeEach(() => {
    wrapper = shallow(
      < GameWindow 
        currRound={ currRound }
      />
    );
  });

  it.skip('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('Should have untouched default state when mounted', () => {
    expect(wrapper.state().clearPath <= 5).toEqual(true);
    expect(wrapper.state().moveObstacle).toEqual(false);
  })

  it('Should generate obstacles and track their position', () => {
    expect(wrapper.state().obstacles.length).toEqual(12)
    expect(wrapper.state().obstaclePositions.length).toBeGreaterThan(10);
  })

  it('Should set octocat to be on a collision course with the obstacles', () => {
    wrapper.state().obstaclePositions = ['31'];
    wrapper.instance().setCollitionCourse();
    expect(wrapper.state().octoCatPosition).toEqual(3)
  })

  it('Should be able to move octocat', () => {
    wrapper.state().clearPath = 4;
    wrapper.state().octoCatPosition = 2;
    wrapper.instance().moveOctocat();
    expect(wrapper.state().octoCatPosition).toEqual(4);
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  })

  it('Should collide with the obstacle', () => {
    wrapper.instance().collideWithObstacle();
    expect(wrapper.state().moveObstacle).toEqual(true);
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  })

  it('Should should start collision with updated props', () => {
    const mockCollide= { collide: true };
    
    const spyOnCollide = jest.spyOn(wrapper.instance(), 'collideWithObstacle')

    wrapper.setProps(mockCollide);
    expect(spyOnCollide).toHaveBeenCalled();
  })

  it('Should move octocat when theres a new round', () => {
    const mockChangeRound = { currentRound: 2 };
    
    const spyOnOctocat = jest.spyOn(GameWindow.prototype, 'moveOctocat')

    wrapper.setProps(mockChangeRound);
    expect(spyOnOctocat).toHaveBeenCalled();
  })

  it('Should generate new obstacles on reset', () => {
    const mockReset = { resetGame: 'reset' };
    
    const spyOnObstacleGeneration = jest.spyOn(wrapper.instance(), 'moveOctocat')

    wrapper.setProps(mockReset);
    expect(spyOnObstacleGeneration).toHaveBeenCalled();
  })

})