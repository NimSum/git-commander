import React from 'react';
import UserInterface from '../user-interface/UserInterface';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('User Interface' , () => {
  const mockData = [{
      "statement" : "Our Git spaceship needs to switch to a different branch to steer the ship!",
      "detail" : "Switch to the branch called \"steer-ship\" to avoid the obstacle",
      "answer" : "git checkout steer-ship", 
      "difficulty" : "1",
      "moreInfo" : "/////A link to where they could read more about this command",
      "id": "1"
    },{
      "statement" : "Our Git spaceship needs to switch to a different branch to steer the ship!",
      "detail" : "Switch to the branch called \"steer-ship\" to avoid the obstacle",
      "answer" : "git checkout steer-ship", 
      "difficulty" : "1",
      "moreInfo" : "/////A link to where they could read more about this command",
      "id": "1"
    }]
  
  const mockEvent = {
    target: { 
      value: 'git checkout steer-ship',
      reset: () => {}
    },
    preventDefault: () => {}
  };
  const mockNextRound = jest.fn();
  const mockProps = {    
    challenges: mockData,
    currentRound: 1
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      < UserInterface 
        nextRound={mockNextRound}
        {...mockProps}
      />
    );
  });

  it('Should match render snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('Should automatically update states when mounted using generateChallenge', () => {
    expect(wrapper.state()).toEqual({
      currentQuestion: mockData[0],
      currDifficulty: 1,
      questionsByDiff: [mockData[0]],
      userAnswer: ''
    });
  })

  it('Should handle user command input', () => {
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('userAnswer')).toEqual('git checkout steer-ship');
  })

  it('Should verify user answer', () => {
    const spy = jest.spyOn(UserInterface.prototype, 'changeDifficulty');

    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('userAnswer')).toEqual('git checkout steer-ship');

    wrapper.instance().verifyAnswer(mockEvent);
    expect(spy).toHaveBeenCalled();
    expect(mockNextRound).toHaveBeenCalled();
  })

  it('Should change difficulty', () => {
    const spy = jest.spyOn(wrapper.instance(), 'generateChallenge');
    
    wrapper.instance().changeDifficulty();
    expect(spy).toHaveBeenCalled();
  })


})