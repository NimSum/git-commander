import React from 'react';
import UserInterface from '../user-interface/UserInterface';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});

jest.useFakeTimers();

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

  const incorrectAnsEvent = {
    target: { 
      value: 'NIMSUM',
      reset: () => {}
    },
    preventDefault: () => {}
  };

  const mockProps = {    
    challenges: mockData,
    currentRound: 1
  };
  const mockNextRound = jest.fn();
  const mockActivateCollision = jest.fn();
  let wrapper;
  let spyGenerateChallenge;

  beforeEach(() => {
    wrapper = shallow(
      < UserInterface 
        nextRound={mockNextRound}
        activateCollition={mockActivateCollision}
        {...mockProps} />
    );
    spyGenerateChallenge = jest.spyOn(wrapper.instance(), 'generateChallenge');
  });

  it('Should match render snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('Should automatically update states when mounted using generateChallenge', () => {
    expect(wrapper.state()).toEqual({
      currentQuestion: mockData[0],
      currDifficulty: 1,
      questionsByDiff: [mockData[1]],
      userAnswer: '',
      challengeHistory: [],
      showAnswer: false,
    });
  })

  it('Should handle user command input', () => {
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state().userAnswer).toEqual('git checkout steer-ship');
  })

  it('Should be able to generate challenge', () => {
    wrapper.instance().generateChallenge();
    expect(wrapper.state().questionsByDiff).toHaveLength(1);
    expect(wrapper.state().currentQuestion).toEqual(mockData[0]);
  })

  it('Should be able to activate collition course', () => {
    wrapper.instance().incorrectAnswer()
    expect(mockActivateCollision).toHaveBeenCalled();
  })

  it('Should perform tasks when user answer is correct', () => {
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('userAnswer')).toEqual('git checkout steer-ship');

    wrapper.instance().verifyAnswer(mockEvent);
    expect(wrapper.state('showAnswer')).toEqual('correct');
    expect(mockNextRound).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  })

  it('Should perform tasks when user answer is NOT correct', () => {
    const spyIncorrectAns = jest.spyOn( UserInterface.prototype, 'incorrectAnswer')
    
    wrapper.instance().handleChange(incorrectAnsEvent);
    expect(wrapper.state('userAnswer')).toEqual('NIMSUM');

    wrapper.instance().verifyAnswer(incorrectAnsEvent);
    expect(wrapper.state('showAnswer')).toEqual('incorrect');

    expect(spyIncorrectAns).toHaveBeenCalled();
  })

  it('Should change difficulty', () => {
    wrapper.instance().changeDifficulty();
    expect(spyGenerateChallenge).toHaveBeenCalled();
  })
  
  it('Should generate challenge if player decides to keep going', () => {
    const mockRound = { currentRound: 7 };

    wrapper.setProps(mockRound);
    expect(spyGenerateChallenge).toHaveBeenCalled();
  })

  it('Should reset game', () => {
    const mockReset = { resetGame: 'reset' };

    wrapper.state().currDifficulty = 4;
    wrapper.state().showAnswer = true;
    
    wrapper.setProps(mockReset);
    
    expect(wrapper.state().currDifficulty).toEqual(1);
    expect(wrapper.state().showAnswer).toEqual(false);
    expect(spyGenerateChallenge).toHaveBeenCalled();
  })

})