import _ from 'lodash';

import clothes from '../data/clothes.json';
import expTable from '../data/exp.json';
import chips from '../data/chips.json';


import Clothes from '../core/models/clothes';
import Settings from '../core/models/settings';
import Chip from '../core/models/chip';
import ChipGrouped from '../core/models/chip-grouped';
import Exp from '../core/models/exp';
import StatNames from '../core/models/stat-names';
import DollVM from '../core/models/doll-vm';
import BattleTriggers from '../core/models/battle-triggers';

export default class Data {
  public static clothes = clothes as any as Clothes[];
  public static chips = chips as any as Chip[];
  public static chipGrouped: ChipGrouped[] = Data.groupChips();
  public static expTable = expTable as any as Exp[];

  public static getSettings(cb: (res: Settings) => void) {
    cb(JSON.parse(localStorage.getItem('settings') || 'null') as Settings);
  }

  public static saveSettings(cls: Settings) {
    localStorage.setItem('settings', JSON.stringify(cls));
  }


  public static groupChips(): ChipGrouped[] {
    const chipsGrouped = new Array<ChipGrouped>();
    _.each([
      'str',
      'spd',
      'cnt',
      'tch',
      'msh',
      'zhv',
      'klb',
      'zsc',
      'vld',
      'mtk',
      'aspd',
      'acnt',
      'atch',
      'amsh',
      'aspdp',
      'acntp',
      'atchp',
      'amshp',
    ], (s) => {
      const gr = new ChipGrouped();
      gr.title = (StatNames as any)[s];
      gr.chips = Data.chips.filter((c) => (c as any)[s]);
      chipsGrouped.push(gr);
    });
    return chipsGrouped;
  }

  public static getNamedClothes(): Clothes[] {
    return this.clothes.filter((cl) => cl.cid < 0);
  }

  public static saveClothesToStorage(cls: Clothes[]) {
    localStorage.setItem('named', JSON.stringify(cls));
  }

  public static getClothesFromStorage(cb: (res: Clothes[]) => void) {
    cb(JSON.parse(localStorage.getItem('named') || 'null') as Clothes[]);
  }

  public static saveDollToStorage(vm: DollVM, num: number) {
    localStorage.setItem('doll' + num, JSON.stringify(vm));
  }

  public static getDollFromStorage(num: number, cb: (res: DollVM) => void) {
    cb(JSON.parse(localStorage.getItem('doll' + num) || 'null') as DollVM);
  }

  public static saveTriggersToStorage(bt: BattleTriggers, num: number) {
    localStorage.setItem('triggers' + num, JSON.stringify(bt));
  }

  public static getTriggersFromStorage(num: number, cb: (res: BattleTriggers) => void) {
    cb(JSON.parse(localStorage.getItem('triggers' + num) || 'null') as BattleTriggers);
  }
}
