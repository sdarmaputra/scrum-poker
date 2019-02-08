import { state } from './data';
import { availableCards } from './data';

export default function PokerController(view) {
  this.view = view;

  const updateView = () => {
    const cardTypes = Object.keys(availableCards);
    const { selectedCardType } = state;
    this.view.showCardTypes(
      cardTypes,
      selectedCardType,
      {
       click: updateSelectedType
      }
    );
    this.view.showCards(state.cards, {
      click: updateSelectedCard
    });
  };

  const updateSelectedCard = index => {
    const value = state.cards[index];
    state.selectedCardIndex = index;
    this.view.selectCard(value);
  };

  const updateSelectedType = type => {
    if (type in availableCards) {
      state.selectedCardType = type;
      state.cards = availableCards[type].cards;
      this.view.clearSelectedCard();
      updateView();
    }
  };

  const init = () => {
    const selectedCardType = 'standard';
    state.selectedCardType = selectedCardType;
    state.cards = availableCards[selectedCardType].cards;
    updateView();
  };

  return {
    init,
  };
}

