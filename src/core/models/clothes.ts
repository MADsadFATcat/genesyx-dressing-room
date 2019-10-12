import Stats from './stats';

// Одежда
export default class Clothes extends Stats {
  public miu = 0; // Минимальный урон
  public mau = 0; // Максимальный урон
  public ith = false; // Двуручное
  public prc = 0; // Цена
  public ml = 0; // Минимальная цена
  public rds = 0; // Радиус атаки
  public ms = null; // Патронов
  public ing = false; // Цена в золоте
  public ct = 1; // Тип одежды
  public pt = null; // Профессия
  public cc = 1; // Класс вещи
  public ia = true; // Можно ли купить в госе
  public cti = null; // Тип патронов
  public fe = null; // Влияние силы (огнестрельное)
  public src = ''; // Путь до картинки
  public cid = 0; // id
  public ac = false; // Признак чужая ли вещь
  public name = ''; // Название
}
