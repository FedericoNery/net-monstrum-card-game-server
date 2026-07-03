import SummonDigimonCard from '../../models/cards/SummonDigimonCard';
import cardsData from './cardsData';
import digimonCards from './digimonTypeCards';
import { CARD_TYPE } from './cards.constants';

const digimonById = new Map(digimonCards.map((digimon) => [digimon.id, digimon]));

const summonDigimonCards = cardsData
  .filter((card) => card.type === CARD_TYPE.SUMMON_DIGIMON)
  .map((card) => {
    const summonedDigimons = card.digimonsCards
      .map((digimonId) => digimonById.get(digimonId))
      .filter((digimon) => digimon);

    const summon = new SummonDigimonCard(card._id, card.name, card.type, summonedDigimons);

    summon.price = card.price;

    return summon;
  });

export default summonDigimonCards;
