import PopAppDispatcher from '../dispatcher/PopAppDispatcher.jsx';

let {Action} = require('../constants/actionType/ImageUploadType.jsx');

module.exports = {

  init(props) {
    PopAppDispatcher.dispatch({
      type: Action.INIT_IMAGE_UPLOAD,
      data: props
    });
  },

  setImageUploadSource(source) {
    PopAppDispatcher.dispatch({
      type: Action.SET_IMAGE_UPLOAD_SOURCE,
      data: source
    });
  }
};