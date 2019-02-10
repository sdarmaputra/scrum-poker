export const state = {
  cards: [],
  selectedCardType: null,
  selectedCardIndex: null,
};

export const availableCards = {
  standard: {
    cards: [ '0', '1/2', 1, 2, 3, 5, 8, 13, 20, 40, 100, '?', '&infin;', '&#x2615;' ],
  },
  fibonacci: {
    cards: [ '0', 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, '?', '&infin;', '&#x2615;' ],
  },
};

