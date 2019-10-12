import Chip from './chip';

// Чипы сгруппированные по типу
export default class ChipGrouped {
  public title = '';
  public chips!: Chip[];
}
