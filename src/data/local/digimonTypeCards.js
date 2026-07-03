import DigimonCard from '../../models/cards/DigimonCard';
import cardsData from './cardsData';
import { CARD_TYPE } from './cards.constants';

const digimonCards = cardsData
  .filter((card) => card.type === CARD_TYPE.DIGIMON)
  .map((card) => {
    const digimon = new DigimonCard(
      card._id,
      card.name,
      card.type,
      card.attackPoints,
      card.color,
      card.energyCount,
      card.evolution,
      card.healthPoints,
    );

    digimon.price = card.price;
    digimon.level = card.level;

    return digimon;
  });

export default digimonCards;
