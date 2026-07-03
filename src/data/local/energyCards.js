import EnergyCard from '../../models/cards/EnergyCard';
import cardsData from './cardsData';
import { CARD_TYPE } from './cards.constants';

const energyCards = cardsData
  .filter((card) => card.type === CARD_TYPE.ENERGY)
  .map((card) => {
    const energy = new EnergyCard(card._id, card.name, card.type, card.energyCount);

    energy.price = card.price;
    energy.color = card.color;

    return energy;
  });

export default energyCards;
