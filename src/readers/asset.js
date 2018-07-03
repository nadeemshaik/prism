import _property from 'lodash/property';

export default {
  type: _property('assetType'),
  id: _property('_id'),
  preview: _property('preview'),
  src: _property('src'),
  orientation: _property('orientation'),
  width: _property('width'),
  height: _property('height'),
};
