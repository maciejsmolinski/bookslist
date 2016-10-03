const allSpecials = {

  /**
   * Halloween Special: Horror published on Halloween (Oct 31)
   */
  halloween: (book) => {
    // Escape early if the genre does not match (skip further checks)
    if (book.genre !== 'horror') {
      return false;
    }

    const publicationDate = new Date(book.published * 1000);

    return publicationDate.getDate() === 31 && publicationDate.getMonth() === 9;
  },

  /**
   * Financial Special: Financial published on Last Friday of the month
   */
  financial: (book) => {
    // Escape early if the genre does not match (skip further computations)
    if (book.genre !== 'financial') {
      return false;
    }

    // 1-indexed equivalent of Friday (1=Mo, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat, 7=Sun)
    const targetDay = 5;

    // Offset from the end of the week since we want substract days from the beginning of the next month to find last Friday
    const offsetFromEndOfWeek = 7 - targetDay;

    // Date object of the publication date
    const publicationDate = new Date(book.published * 1000);

    // Compute first day of the next month so it's easier to find the last friday substracting days from it
    const firstDayOfNextMonth = new Date(
      publicationDate.getMonth() === 11 ? publicationDate.getFullYear() + 1 : publicationDate.getFullYear(),
      publicationDate.getMonth() === 11 ? 0 : publicationDate.getMonth() + 1,
      1
    );

    // Substract days from the first day of next month, get the date object for the last friday
    const lastFridayOfBookMonth = new Date(firstDayOfNextMonth.setDate(
      firstDayOfNextMonth.getDate() - firstDayOfNextMonth.getDay() - offsetFromEndOfWeek
    ));

    // Check if the book was published on the last friday of it's publication month
    return publicationDate.getDate() === lastFridayOfBookMonth.getDate();
  },

};

/**
 * Return an array of specials to be applied to a book, e.g.
 *
 * specials(bookObject)        => ['halloween', 'discounted'] // 2 specials matched
 * specials(anotherBookObject) => []                          // none specials found for book
 *
 */
const specials = (book) => {
  return Object
           .keys(allSpecials)
           .reduce((matching, special) => (
             allSpecials[special](book) ? [...matching, special] : matching
           ), []);
};


module.exports = specials;
