const initial = {
  errors: [],
};

module.exports = (state, emitter) => {
  Object.assign(state, initial);

  /**
   * emit('clear');
   */
  emitter.on('clear', (state) => {
    Object.assign(state, initial);

    emitter.emit('render');
  });

  /**
   * emit('error', 'Custom Error Message');
   */
  emitter.on('error', (message) => {
    // Prevent duplicate error messages from ocurring on the list
    if (state.errors.indexOf(message) !== -1) {
      return;
    }

    const errors = [].concat(state.errors, message);

    return Object.assign(state, { errors });

    emitter.emit('render');
  });
};

module.exports.initial = initial;