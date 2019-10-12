import { Profession } from '../enums/profession';
import DollStats from './doll-vm-stats';
import DollVMInjections from './doll-vm-injections';

// То что вводит пользователь для каждой куклы
export default class DollVM {
  public prof = Profession.Footman; // Профессия
  public lvl = 0; // Уровень
  public exp = 0; // Опыт
  public st = new DollStats(); // Вкинутые статы
  public inj = new DollVMInjections(); // Обычные инъекции
  public injg = new DollVMInjections(); // Золотые инъекции
  public besh = false; // Инъекция бешенсва
  public privatelvl = 0; // Супружеский уровень
  public privatestat = 'str'; // Бонус к какому стату от приватной комнаты
  public chemplvl = 0; // бонус чемпионата клана
  public pdalvl = 0; // уровень кпк

  public clothes: Array<number | null> = [null, null, null, null, null, null, null, null, null, null, null, null];
  public chips: Array<number | null> = [null, null, null, null, null, null, null, null, null, null, null, null];
  public superchips: Array<number | null> = [];
}

