import React from 'react';
import FeedbackPrompt from '../prompts/FeedbackPrompt';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Game Window' , () => {
  const mockQuestion =  {
    "statement" : "Our Git spaceship needs to switch to a different branch to steer the ship!",
    "detail" : "Switch to the branch called \"steer-ship\" to avoid the obstacle",
    "answer" : "git checkout steer-ship", 
    "difficulty" : "1",
    "moreInfo" : "/////A link to where they could read more about this command",
    "id": "1"
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      < FeedbackPrompt
        currentQuestion={ mockQuestion }
      />
    );
  });

  it('Should match snapshot of game reset', () => {
    const mockResetProp = { reset: true };
    wrapper.setProps(mockResetProp);
    expect(wrapper).toMatchSnapshot();
  })

  it('Should match snapshot of winning', () => {
    const mockWinnerProp = { winner: true };
    wrapper.setProps(mockWinnerProp);
    expect(wrapper).toMatchSnapshot();
  })

  it('Should match snapshot incorrect answer', () => {
    const mockIncorrectProp = { correct: 'incorrect' };
    wrapper.setProps(mockIncorrectProp);
    expect(wrapper).toMatchSnapshot();
  })

  it('Should match snapshot or correct answer', () => {
    const mockCorrectProp = { correct: 'correct' };
    wrapper.setProps(mockCorrectProp);
    expect(wrapper).toMatchSnapshot();
  })
  
});