import React from 'react';
import ReactDOM from 'react-dom';

import { shallow, mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<App/>', () => {
    it('enzyme', () => {
        const component = render(<App/>);
        expect(renderToJson(component)).toMatchSnapshot();
    });
});
