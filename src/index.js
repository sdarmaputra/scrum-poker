import './style.css';
import ComponentFactory from './ComponentFactory';
import PokerView from './PokerView';
import PokerController from './PokerController';

const appRoot = document.getElementById('app');
const componentFactory = new ComponentFactory(window.document);
const pokerView = new PokerView(appRoot, componentFactory);
const pokerController = new PokerController(pokerView);

pokerController.init();
