import React from 'react';
import ChallengeHistory from '../user-interface/ChallengeHistory';
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Game Window' , () => {
  
  let wrapper;
  const mockQuestion =  {
    "statement" : "Our Git spaceship needs to switch to a different branch to steer the ship!",
    "detail" : "Switch to the branch called \"steer-ship\" to avoid the obstacle",
    "answer" : "git checkout steer-ship", 
    "difficulty" : "1",
    "moreInfo" : "/////A link to where they could read more about this command",
    "id": "1"
  };
  
  beforeEach(() => {
    wrapper = shallow(
      < ChallengeHistory 
        challenges={ mockQuestion }
      />
    );
  });

  it('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
});