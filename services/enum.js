/**
 * Services serve generic purpose, they either do something or hold something.
 */

/**
 * ENUM exposes common enumerables to the app so they're available / shared
 * easily between the front-end and the back-end thus the code does not repeat too often
 * and is easier to maintain in the long-run
 */
const ENUM = {

  genres: [
    'all',
    'action',
    'animation',
    'comedy',
    'documentary',
    'family',
    'fantasy',
    'financial',
    'history',
    'horror',
    'musical',
    'sport',
    'thriller',
  ],

  genders: [
    'all',
    'male',
    'female',
  ],

  sorting: [
    'none',
    'desc',
    'asc',
  ]

};

module.exports = ENUM;
