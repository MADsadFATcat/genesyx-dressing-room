<template>
  <div>
    <div class="clothes-menu" v-show="visible">
      <div>
        <div class="row row--grow">
          <div
            class="btn"
            @click="filter.cc = 1"
            :class="[{ 'btn--active': filter.cc == 1 }]"
          >Простые вещи
          </div>
          <div
            class="btn"
            @click="filter.cc = 5"
            :class="[{ 'btn--active': filter.cc == 5 }]"
          >Артефакты
          </div>
          <div
            class="btn"
            @click="filter.cc = 7"
            :class="[{ 'btn--active': filter.cc == 7 }]"
          >Чемпионат
          </div>
          <div
            class="btn"
            v-show="(lastSlot == 0 || lastSlot == 1)"
            @click="filter.cc = 4; filter.ctw = 1;"
            :class="[{ 'btn--active': filter.cc == 4 }]"
          >Турнирое
          </div>
          <div
            class="btn"
            @click="filter.visible = !filter.visible"
          >{{ filter.visible ? 'Скрыть фильтры' : 'Показать фильтры' }}
          </div>
          <div class="btn" @click="hideClothesMenu">Закрыть меню</div>
        </div>
        <div class="row row--grow" v-show="(lastSlot == 0 || lastSlot == 1) && filter.cc != 4">
          <div
            class="btn"
            @click="filter.ctw = 1"
            :class="[{ 'btn--active': filter.ctw == 1 }]"
          >Оружие
          </div>
          <div
            class="btn"
            @click="filter.ctw = 2"
            :class="[{ 'btn--active': filter.ctw == 2 }]"
          >Огнестрельное
          </div>
          <div
            class="btn"
            @click="filter.ctw = 3"
            :class="[{ 'btn--active': filter.ctw == 3 }]"
          >Щиты
          </div>
          <div
            class="btn"
            @click="filter.ctw = 11"
            :class="[{ 'btn--active': filter.ctw == 11 }]"
          >Инструменты
          </div>
        </div>
        <NamedClothes ref="namedClothes" v-show="filter.cc == 4" @add-named="addNamed"></NamedClothes>
        <transition name="fade">
          <div v-show="filter.visible" class="clothes-filter">
            <div class="row row--center">
              <div>
                <br/>Уровни :
                <input min="0" max="20" type="number" v-model.number="filter.lmin"/>-
                <input min="0" max="20" type="number" v-model.number="filter.lmax"/>
                <br/>
                <br/>
              </div>
            </div>
            <div class="row filter-stats">
              <div>
                <label>
                  Сила:
                  <input type="checkbox" v-model="filter.str"/>
                </label>
                <br/>
                <label>
                  Скорость:
                  <input type="checkbox" v-model="filter.spd"/>
                </label>
                <br/>
                <label>
                  Контратака:
                  <input type="checkbox" v-model="filter.cnt"/>
                </label>
                <br/>
                <label>
                  Точность:
                  <input type="checkbox" v-model="filter.tch"/>
                </label>
                <br/>
                <label>
                  Мощность:
                  <input type="checkbox" v-model="filter.msh"/>
                </label>
                <br/>
                <label>
                  Живучесть:
                  <input type="checkbox" v-model="filter.zhv"/>
                </label>
                <br/>
              </div>
              <div>
                <label>
                  Кулачный бой:
                  <input type="checkbox" v-model="filter.klb"/>
                </label>
                <br/>
                <label>
                  Защита:
                  <input type="checkbox" v-model="filter.zsc"/>
                </label>
                <br/>
                <label>
                  Владение оружием:
                  <input type="checkbox" v-model="filter.vld"/>
                </label>
                <br/>
                <label>
                  Меткость:
                  <input type="checkbox" v-model="filter.mtk"/>
                </label>
                <br/>
              </div>
              <div>
                <label>
                  Антискорость:
                  <input type="checkbox" v-model="filter.aspd"/>
                </label>
                <br/>
                <label>
                  Антиконтратака:
                  <input type="checkbox" v-model="filter.acnt"/>
                </label>
                <br/>
                <label>
                  Антиточность:
                  <input type="checkbox" v-model="filter.atch"/>
                </label>
                <br/>
                <label>
                  Антимощность:
                  <input type="checkbox" v-model="filter.amsh"/>
                </label>
                <br/>
              </div>
              <div>
                <label>
                  Антискорость прот:
                  <input type="checkbox" v-model="filter.aspdp"/>
                </label>
                <br/>
                <label>
                  Антиконтратака прот:
                  <input type="checkbox" v-model="filter.acntp"/>
                </label>
                <br/>
                <label>
                  Антиточность прот:
                  <input type="checkbox" v-model="filter.atchp"/>
                </label>
                <br/>
                <label>
                  Антимощность прот:
                  <input type="checkbox" v-model="filter.amshp"/>
                </label>
                <br/>
              </div>
              <div>
                <label>
                  Кулачный бой прот:
                  <input type="checkbox" v-model="filter.klbp"/>
                </label>
                <br/>
                <label>
                  Защита прот:
                  <input type="checkbox" v-model="filter.zscp"/>
                </label>
                <br/>
                <label>
                  Владение оружием прот:
                  <input type="checkbox" v-model="filter.vldp"/>
                </label>
                <br/>
                <label>
                  Меткость прот:
                  <input type="checkbox" v-model="filter.mtkp"/>
                </label>
                <br/>
              </div>
              <div>
                <label>
                  Броня головы:
                  <input type="checkbox" v-model="filter.ha"/>
                </label>
                <br/>
                <label>
                  Броня корпуса:
                  <input type="checkbox" v-model="filter.ba"/>
                </label>
                <br/>
                <label>
                  Броня рук:
                  <input type="checkbox" v-model="filter.hna"/>
                </label>
                <br/>
                <label>
                  Броня ног:
                  <input type="checkbox" v-model="filter.fa"/>
                </label>
                <br/>
              </div>
            </div>
            <br/>
          </div>
        </transition>
        <div class="clothes-overf">
          <div class="btn-b" @click="clothesTakeOff()">
            <div>Очистить</div>
          </div>
          <div
            v-for="(cl, i) in clothesList"
            :key="i + 'cl'"
            @click="clothesDress(cl.cid)"
            @mouseenter="showClothesPopup($event, cl.cid, chemplvl)"
            @mouseleave="hideClothesPopup()"
            class="btn-b"
          >
            <div>{{cl.name}}</div>
            <img :src="getClothesSrc(cl.src)" :alt="cl.name"/>
            <div
              v-show="cl.cc === 3 || cl.cc === 4"
              class="cloth-edit"
              @click.stop="editNamed(cl)"
            >
              <font-awesome-icon icon="edit" title="Редактировать" />
            </div>
            <div
              v-show="cl.cc === 3 || cl.cc === 4"
              class="cloth-delete"
              @click.stop="deleteNamed(cl)"
            >
              <font-awesome-icon icon="trash" title="Удалить" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import NamedClothes from './NamedClothes.vue';
  import _ from 'lodash';

  import Data from '../data/data';
  import {Emit, Watch} from 'vue-property-decorator';
  import Clothes from '../core/models/clothes';
  import config from '@/config';

  @Component({
    components: {
      NamedClothes,
    },
  })
  export default class ClothesMenu extends Vue {
    public visible = false;
    public left = 0;
    public top = 0;
    public lastSlot = 0;
    public lastDoll = 0;
    public chemplvl = 0;
    public clothes = Data.clothes;

    public filter = {
      visible: false,
      cc: 1, // Clothes Class, фильтр по классу вещи
      ct: 1,
      ctw: 1, // Clothes Type Weapon, фильтр по типу вещей, отдельно для оружия
      lmin: 0,
      lmax: 20,
      str: false,
      spd: false,
      cnt: false,
      tch: false,
      msh: false,
      zhv: false,
      klb: false,
      zsc: false,
      vld: false,
      mtk: false,
      aspd: false,
      acnt: false,
      atch: false,
      amsh: false,
      aspdp: false,
      acntp: false,
      atchp: false,
      amshp: false,
      mtkp: false,
      vldp: false,
      zscp: false,
      klbp: false,
      ha: false,
      ba: false,
      hna: false,
      fa: false,
    };

    @Watch('visible')
    public onChangeVisible(vis: boolean) {
      if (vis && this.lastSlot !== 0 && this.lastSlot !== 1 && this.filter.cc === 4) {
        this.filter.cc = 1;
      }
    }

    get coord() {
      return {
        left: this.left - 700 / 2,
        top: this.top - 30,
      };
    }

    get clothesList() {
      switch (this.lastSlot) {
        case 0:
        case 1:
          this.filter.ct = this.filter.ctw;
          break;
        case 2:
          this.filter.ct = 4;
          break;
        case 3:
          this.filter.ct = 5;
          break;
        case 4:
          this.filter.ct = 6;
          break;
        case 5:
          this.filter.ct = 7;
          break;
        case 6:
          this.filter.ct = 8;
          break;
        case 7:
          this.filter.ct = 9;
          break;
        case 8:
        case 9:
        case 10:
        case 11:
          this.filter.ct = 10;
          break;
        default:
      }

      let clts = this.clothes.filter(
        (c) => ((c.ct === this.filter.ct || this.filter.cc === 4) &&
          (this.filter.cc === c.cc || (this.filter.cc === 4 && c.cc === 6))),
      );

      if (this.filter.visible) {
        clts = clts.filter(
          (c) => c.ml >= this.filter.lmin && c.ml <= this.filter.lmax,
        );

        if (this.filter.str) {
          clts = clts.filter((c) => c.str != null);
        }
        if (this.filter.spd) {
          clts = clts.filter((c) => c.spd != null);
        }
        if (this.filter.cnt) {
          clts = clts.filter((c) => c.cnt != null);
        }
        if (this.filter.tch) {
          clts = clts.filter((c) => c.tch != null);
        }
        if (this.filter.msh) {
          clts = clts.filter((c) => c.msh != null);
        }
        if (this.filter.zhv) {
          clts = clts.filter((c) => c.zhv != null);
        }
        if (this.filter.klb) {
          clts = clts.filter((c) => c.klb != null);
        }
        if (this.filter.zsc) {
          clts = clts.filter((c) => c.zsc != null);
        }
        if (this.filter.vld) {
          clts = clts.filter((c) => c.vld != null);
        }
        if (this.filter.mtk) {
          clts = clts.filter((c) => c.mtk != null);
        }
        if (this.filter.aspd) {
          clts = clts.filter((c) => c.aspd != null);
        }
        if (this.filter.acnt) {
          clts = clts.filter((c) => c.acnt != null);
        }
        if (this.filter.atch) {
          clts = clts.filter((c) => c.atch != null);
        }
        if (this.filter.amsh) {
          clts = clts.filter((c) => c.amsh != null);
        }
        if (this.filter.aspdp) {
          clts = clts.filter((c) => c.aspdp != null);
        }
        if (this.filter.acntp) {
          clts = clts.filter((c) => c.acntp != null);
        }
        if (this.filter.atchp) {
          clts = clts.filter((c) => c.atchp != null);
        }
        if (this.filter.amshp) {
          clts = clts.filter((c) => c.amshp != null);
        }
        if (this.filter.mtkp) {
          clts = clts.filter((c) => c.mtkp != null);
        }
        if (this.filter.vldp) {
          clts = clts.filter((c) => c.vldp != null);
        }
        if (this.filter.zscp) {
          clts = clts.filter((c) => c.zscp != null);
        }
        if (this.filter.klbp) {
          clts = clts.filter((c) => c.klbp != null);
        }
        if (this.filter.ha) {
          clts = clts.filter((c) => c.ha != null);
        }
        if (this.filter.ba) {
          clts = clts.filter((c) => c.ba != null);
        }
        if (this.filter.fa) {
          clts = clts.filter((c) => c.fa != null);
        }
        if (this.filter.hna) {
          clts = clts.filter((c) => c.lha != null || c.rha != null);
        }
      }

      clts = clts.sort((a, b) => (a.ml < b.ml ? -1 : 1));

      return clts;
    }

    public showClothesMenu(event: MouseEvent, lastSlot: number, lastDoll: number, chemplvl: number) {
      this.visible = true;
      this.left = event.pageX;
      this.top = event.pageY;
      this.lastSlot = lastSlot;
      this.lastDoll = lastDoll;
      this.chemplvl = chemplvl;
    }

    public hideClothesMenu() {
      this.visible = false;
    }

    public addNamed(cl: Clothes) {
      if (cl.cid === 0) {
        const minId = _.sortBy(this.clothes, (c) => c.cid)[0].cid--;
        cl.cid = minId > -1 ? -1 : minId;
        this.clothes.push(cl);
      }
    }

    public editNamed(cl: Clothes) {
      (this.$refs.namedClothes as NamedClothes).editNamed(cl);
    }

    public deleteNamed(cl: Clothes) {
      Vue.delete(this.clothes, this.clothes.findIndex((c) => c.cid === cl.cid));
      this.deleteFromDolls(cl.cid);
    }

    public getClothesSrc(src: string): string {
      return `${config.gameUrl}/Images/Clothes/${src}`;
    }

    @Watch('clothes', {deep: true})
    public onChangeClothes() {
      const named = this.clothes.filter((c) => c.cid < 0);
      Data.saveClothesToStorage(named);
    }

    @Emit('delete-from-dolls')
    public deleteFromDolls(id: number) {
    }

    @Emit('clothes-take-off')
    public clothesTakeOff() {
    }

    @Emit('clothes-dress')
    public clothesDress(id: number) {
    }

    @Emit('show-clothes-popup')
    public showClothesPopup(event: MouseEvent, id: number, chemplvl: number) {
    }

    @Emit('hide-clothes-popup')
    public hideClothesPopup() {
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .clothes-menu {
    background: var(--back);
    border: solid 1px var(--btn-border);
    border-radius: 6px;
    position: absolute;
    top: 15px;
    left: 50%;
    margin-left: -410px;
    width: 820px;
  }

  .clothes-filter {
    white-space: nowrap;
    line-height: 18px;
    border: solid 1px var(--btn-border);
    border-radius: 6px;
  }

  .filter-stats > div {
    padding: 0 0 0 5px;
    text-align: left;
  }

  .clothes-overf {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 585px;
    margin: 0;
    align-content: flex-start;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .clothes-overf > * {
    flex-basis: 127.7px;
  }

  .btn-b {
    border-radius: 6px;
    border: solid 1px var(--btn-border);
    padding: 10px 2px;
    cursor: pointer;
    border-collapse: collapse;
    white-space: pre-wrap;
    overflow-x: hidden;
    height: 110px;
    color: var(--text-color);
    outline: none !important;
    box-shadow: none;
    position: relative;
  }

  .btn-b > div {
    margin: 0 3px 0 3px;
    overflow: hidden;
    height: 50px;
  }

  .cloth-edit {
    position: absolute;
    bottom: 0px;
    left: -4px;
    width: 20px !important;
    height: 20px !important;
    line-height: 20px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    -ms-border-radius: 6px;
    border-radius: 6px;
    background: var(--btn-back);
    border: solid 1px var(--btn-border);
  }

  .cloth-delete {
    position: absolute;
    bottom: 0px;
    right: -4px;
    width: 20px !important;
    height: 20px !important;
    line-height: 20px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    -ms-border-radius: 6px;
    border-radius: 6px;
    background: var(--btn-back);
    border: solid 1px var(--btn-border);
  }

  .cloth-edit:hover,
  .cloth-delete:hover {
    background: var(--btn-border);
    border: solid 1px var(--btn-back);
  }
</style>
