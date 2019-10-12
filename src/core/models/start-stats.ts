import { Profession } from '../enums/profession';
import Stats from './stats';

// Стартовые статы
export default class StartStats extends Stats {

  constructor(lvl: number, prof: Profession) {
    super();

    switch (prof) {
      case Profession.Footman:
        this.str = 3 + lvl;
        this.spd = 4;
        this.cnt = 3;
        this.tch = 3;
        this.msh = 3;
        this.zhv = 5 + lvl;
        this.eng = 0;

        this.klb = 0;
        this.zsc = 2;
        this.vld = 0;
        this.mtk = 2 + lvl;

        this.aspd = 2;
        this.acnt = 2;
        this.atch = 0;
        this.amsh = 0;
        break;
      case Profession.Engineer:
        this.str = 2;
        this.spd = 2;
        this.cnt = 6 + lvl;
        this.tch = 2;
        this.msh = 0;
        this.zhv = 6 + lvl;
        this.eng = 5;

        this.klb = 0;
        this.zsc = 0 + lvl;
        this.vld = 0;
        this.mtk = 0;

        this.aspd = 2;
        this.acnt = 0;
        this.atch = 2;
        this.amsh = 2;
        break;
      case Profession.SpecialForces:
        this.str = 5;
        this.spd = 6 + lvl;
        this.cnt = 4;
        this.tch = 5;
        this.msh = 0;
        this.zhv = 5 + lvl;
        this.eng = 0;

        this.klb = 0 + lvl;
        this.zsc = 0;
        this.vld = 0;
        this.mtk = 0;

        this.aspd = 0;
        this.acnt = 0;
        this.atch = 2;
        this.amsh = 2;
        break;
      case Profession.Pilot:
        this.str = 3;
        this.spd = 3;
        this.cnt = 2;
        this.tch = 5 + lvl;
        this.msh = 5;
        this.zhv = 5 + lvl;
        this.eng = 0;

        this.klb = 0;
        this.zsc = 0;
        this.vld = 2 + lvl;
        this.mtk = 2;

        this.aspd = 0;
        this.acnt = 0;
        this.atch = 0;
        this.amsh = 2;
        break;
    }

  }
}
