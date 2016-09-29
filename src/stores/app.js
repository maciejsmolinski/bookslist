const initial = {
  errors: [],
};

module.exports = {
  state: initial,
  reducers: {

    /**
     * send('clear', done);
     */
    clear: () => initial,

    /**
     * send('error', 'Custom Error Message', done);
     */
    error: (message, state) => {
      // Prevent duplicate error messages from ocurring on the list
      if (state.errors.indexOf(message) !== -1) {
        return state;
      }

      const errors = [].concat(state.errors, message);

      return Object.assign({}, state, { errors });
    },

  },
  effects: { },
  subscriptions: [],
};
