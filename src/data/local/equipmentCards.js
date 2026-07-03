import EquipmentCard from '../../models/cards/EquipmentCard';
import cardsData from './cardsData';
import { CARD_TYPE } from './cards.constants';

const equipmentCards = cardsData
  .filter((card) => card.type === CARD_TYPE.EQUIPMENT)
  .map((card) => {
    const equipment = new EquipmentCard(
      card._id,
      card.name,
      card.type,
      card.attackPoints,
      card.healthPoints,
      card.quantityOfTargets,
      card.targetScope,
    );

    equipment.price = card.price;

    return equipment;
  });

export default equipmentCards;
