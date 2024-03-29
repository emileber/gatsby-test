import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Button from './Button';

export default {
  title: 'Shared/Button',
};

const SIZES = {
  Small: 'sm',
  Normal: null,
  Large: 'lg',
};

const ButtonStory = (otherProps) => {
  const props = {
    children: text('Content', 'Click me'),
    size: select('Size?', SIZES, null),
    disabled: boolean('Disabled?', false),
    icon: boolean('Icon?', false) ? (
      <FontAwesomeIcon icon={faFacebookF} />
    ) : null,
    ...otherProps,
  };

  const linkProps = { color: 'link', ...props };

  return (
    <div className="mb-4">
      <Button color="conference" {...props} />
      <div className="bg-dark d-inline-block p-2">
        <Button color="conference" outline {...props} />
        <Button color="primary" {...props} />
      </div>
      <Button {...props} />
      <Button color="dark" {...props} />
      <Button {...linkProps} />

      <Button size="sm" className="text-light" {...linkProps} />
    </div>
  );
};

export const DefaultButtons = () => (
  <>
    <p>Default buttons</p>
    <ButtonStory />
    <p>Internal Link component buttons</p>
    <ButtonStory to="/test" />
    <p>External link buttons</p>
    <ButtonStory href="http://google.ca" target="_blank" />
  </>
);

const IconStory = (otherProps) => (
  <div className="mb-4">
    <Button
      icon={<FontAwesomeIcon icon={faFacebookF} />}
      color="primary"
      {...otherProps}
    />
    <Button
      icon={<FontAwesomeIcon icon={faLinkedin} />}
      color="secondary"
      {...otherProps}
    />
    <Button icon={<FontAwesomeIcon icon={faTwitter} />} {...otherProps} />
  </div>
);

export const IconButtons = () => (
  <>
    <p>Small icon buttons</p>
    <IconStory size="sm" />
    <p>Medium icon buttons</p>
    <IconStory size="md" />
    <p>Large icon buttons</p>
    <IconStory size="lg" />
  </>
);
