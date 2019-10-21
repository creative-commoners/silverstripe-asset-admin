import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import ValueTracker from 'stories/ValueTracker';
import { Component as UploadField } from 'components/UploadField/UploadField';
import { Component as UploadFieldItem } from 'components/UploadField/UploadFieldItem';
import { Component as AssetDropzone } from 'components/AssetDropzone/AssetDropzone';
import { Component as InsertMediaModal } from 'containers/InsertMediaModal/InsertMediaModal';

const props = {
  id: 'my-field',
  name: 'MyField',
  data: {
    createFileEndpoint: {
      url: '',
      method: '',
      payloadFormat: '',
    },
  },
  files: [],
  UploadFieldItem,
  AssetDropzone,
  InsertMediaModal,
  store: null,
};

storiesOf('AssetAdmin/UploadField', module)
  .addDecorator((storyFn) => (
    <div style={{ margin: '3em' }}>
      <ValueTracker>{storyFn()}</ValueTracker>
    </div>
  ))
  .add('Default', () => (
    <UploadField
      {...props}
    />
  ));
