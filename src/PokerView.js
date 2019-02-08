import { isArrayEqual } from './helpers';
import {
  CARDS_SECTION_ID,
  TYPES_SECTION_ID,
  SELECTED_CARD_SECTION_ID,
} from './constants.js';

export default function PokerView(appRoot, componentFactory) {
  this.appRoot = appRoot;
  this.componentFactory = componentFactory;
  this.cardTypes = [];
  this.currentCards = [];
  this.cardEventListeners = {};
  this.cardTypeEventListeners = {};
  this.selectedType = null;
  this.selectedValue = null;
  this.selectedValueShown = true;
  this.selectedCardSection = null;

  const append = element => this.appRoot.append(element);

  const removeChild = element => this.appRoot.removeChild(element);

  const querySelector = param => this.appRoot.querySelector(param);

  const syncAppRoot = (currentComponent, newComponent) => {
    if (currentComponent) {
      removeChild(currentComponent);
    }

    append(newComponent);
  };

  const renderSection = (sectionSelector, newSectionElement) => {
    const currentSectionElement = querySelector(sectionSelector);
    syncAppRoot(currentSectionElement, newSectionElement);
  };

  const renderCards = () => renderSection(
    `section#${CARDS_SECTION_ID}`,
    this.componentFactory.createCardsSection(this.currentCards, this.cardEventListeners)
  );

  const renderCardTypes = () => renderSection(
    `section#${TYPES_SECTION_ID}`,
    this.componentFactory.createTypesSection(this.cardTypes, this.selectedType, this.cardTypeEventListeners)
  );

  const renderSelectedCard = () => {
    let content = null;

    if (!this.selectedCardSection) {
      const newSection = this.componentFactory.createSection(SELECTED_CARD_SECTION_ID);
      this.appRoot.append(newSection);
      this.selectedCardSection = newSection;
    }

    this.selectedCardSection.innerHTML = null;

    if (this.selectedValue) {
      const value = this.selectedValueShown ? this.selectedValue : '&#x1F914';
      content = this.componentFactory.createSelectedCard(value, () => toggleSelectedCard(!this.selectedValueShown));
      this.selectedCardSection.append(content);
      this.selectedCardSection.addEventListener('click', clearSelectedCard);
    }

    const sectionClassName = [
      this.selectedValue ? 'is-active' : '',
      this.selectedValueShown ? 'is-shown' : '',
    ].join(' ');
    this.selectedCardSection.className = sectionClassName;
  };

  const showCards = (cards, eventListeners = {}) => {
    if (isArrayEqual(cards, this.currentCards)) {
      return;
    }

    this.currentCards = cards;
    this.cardEventListeners = eventListeners;
    renderCards();
  };

  const showCardTypes = (types, selectedType, eventListeners = {}) => {
    if (
      isArrayEqual(types, this.cardTypes) &&
      selectedType === this.selectedType
    ) {
      return;
    }

    this.cardTypes = types;
    this.selectedType = selectedType;
    this.cardTypeEventListeners = eventListeners;
    renderCardTypes();
  };

  const selectCard = value => {
    this.selectedValue = value;
    this.selectedValueShown = true;
    renderSelectedCard();
  };

  const clearSelectedCard = () => {
    this.selectedValue = null;
    renderSelectedCard();
  };

  const toggleSelectedCard = shown => {
    this.selectedValueShown = !!shown;
    renderSelectedCard();
  };

  const hideSelectedCard = () => toggleSelectedCard(false);

  const showSelectedCard = () => toggleSelectedCard(true);

  return {
    showCards,
    showCardTypes,
    selectCard,
    clearSelectedCard,
    hideSelectedCard,
    showSelectedCard,
  };
};

