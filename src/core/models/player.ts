import Stats from './stats';
import { Profession } from '../enums/profession';
import Clothes from './clothes';

// Данные которые расчитываются для каждой куклы
export default class Player extends Stats {
  public prof = Profession.Footman; // Профессия
  public lvl = 0; // Уровень
  public exp = 0; // Опыт

  public ds = 0; // Максимум вкинутых статов
  public dmst = 0; // Максимум вкинутых статов мастерства

  public ldmg = '0-0'; // Предполагаемый урон с левой руки
  public ldmgc = '0-0'; // Предполагаемый урон критом с левой руки

  public rdmg = '0-0'; // Предполагаемый урон с правой руки
  public rdmgc = '0-0'; // Предполагаемый урон критом с правой руки

  public rate = 0; // Рейтинг

  public prc = 0; // Стоимость всех вещей
  public prcg = 0; // Стоимость всех вещей в золоте

  public injUsed = 0; // Всего использовано инъекций
  public injgUsed = 0; // Всего использовано инъекций, золотых
  public injPrc = 0; // Стоимость всех инъекций
  public injPrcg = 0; // Стоимость всех инеъекций в золоте

  public clothes: Clothes[] = [];
}
