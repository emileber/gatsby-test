import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import StoryWrapper from '~/stories/Wrapper';
import '@/scss/main.scss';
import './globals';
import README from './README.md';

addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(StoryWrapper());

// Option defaults.
addParameters({
  options: {
    theme: themes.dark,
  },
  notes: { Introduction: README, 'How to?': 'test' },
  backgrounds: [
    { name: 'Light', value: '#fff', default: true },
    // Same as our brand #161843e6 or rgba(22, 24, 67, .9) on white
    { name: 'Background', value: '#161843' },
    { name: 'Dark', value: '#101522' },
    { name: 'Darkest', value: '#040919' },
  ],
  knobs: {
    escapeHTML: false,
  },
});

// automatically import all files ending in *.stories.js
configure([
  require.context('../stories', true, /\.stories\.jsx?$/),
  require.context('../src/components', true, /\.stories\.jsx?$/),
], module);
