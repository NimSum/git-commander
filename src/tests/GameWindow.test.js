import React from 'react';
import GameWindow from '../game-interface/GameWindow';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});

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
    expect(wrapper.state().obstacles).toHaveLength(4)
    expect(wrapper.state().obstaclePositions.length).toBeGreaterThan(2);
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
  })

})