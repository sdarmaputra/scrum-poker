import {
  CARDS_SECTION_ID,
  TYPES_SECTION_ID,
  SELECTED_CARD_SECTION_ID,
} from './constants.js';

export default function ComponentFactory(doc) {
  this.doc = doc;

  const createElement = tag => {
    const element = this.doc.createElement(tag);

    return element;
  }

  const createList = (items, listClassName, modifyItem) => {
    const list = createElement('ul');
    list.className = listClassName;

    items.forEach((item, key) => {
      let listItem = createElement('li');
      listItem.innerHTML = item;
      if (typeof modifyItem === 'function') {
        listItem = modifyItem(listItem, key);
      }
      list.append(listItem);
    });

    return list;
  };

  const createSection = id => {
    const section = createElement('section');
    section.id = id;

    return section;
  };

  const attachListeners = (element, eventListeners = {}, handleListener) => {
    const listenerKeys = Object.keys(eventListeners);
    listenerKeys.forEach(key => {
      let listener = eventListeners[key];
      if (typeof handleListener === 'function') {
        listener = event => handleListener(event, eventListeners[key]);
      }

      element.addEventListener(key, listener);
    });

    return element;
  };

  const createCardsSection = (cards, eventListeners = {}) => {
    const cardsSection = createSection(CARDS_SECTION_ID);
    const cardList = createList(cards, 'card-list', (listItem, key) => {
      listItem.className = 'card-list__item';
      listItem = attachListeners(listItem, eventListeners, (_, listener) => {
        listener(key);
      });
      return listItem;
    });

    cardsSection.append(cardList);

    return cardsSection;
  };

  const createTypesSection = (types, selectedType, eventListeners = {}) => {
    const typesSection = createSection(TYPES_SECTION_ID);
    const typeList = createList(types, 'type-list', (listItem) => {
      const button = createElement('button');
      const value = listItem.innerHTML;
      button.innerHTML = value;
      listItem.className = `type-list__item ${value === selectedType ? 'is-active' : ''}`;
      listItem.innerHTML = null;
      listItem.append(button);
      listItem = attachListeners(listItem, eventListeners, (_, listener) => {
        listener(button.innerHTML);
      });

      return listItem;
    });

    typesSection.append(typeList);

    return typesSection;
  };

  const createSelectedCard = (value, flipHandler) => {
    const wrapper = createElement('div');
    const content = createElement('div');
    const flipButton = createElement('button');

    content.className = 'main-card';
    content.innerHTML = value;

    if (typeof flipHandler === 'function') {
      content.addEventListener('click', event => {
        flipHandler();
        event.stopPropagation();
      });
    }

    wrapper.append(content);

    return wrapper;
  }

  return {
    createSection,
    createCardsSection,
    createTypesSection,
    createSelectedCard,
  };
}

