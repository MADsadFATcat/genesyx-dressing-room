<template>
  <div
    class="clothes-popup"
    v-show="visible"
    v-if="cl != null"
    :style="{ top: coord.top , left: coord.left , right: coord.right , bottom: coord.bottom  }"
  >
    <b>{{cl.name}}</b>
    <br/>
    <span v-if="cl.prc > 0">
      Цена:
      <span :class="{ 'gold-price': cl.ing }">{{(getPrice(cl)).toFixed(2)}}</span>
      <br/>
    </span>
    <span v-if="cl.cc !== 3 && cl.cc !== 4">
      Требуемый уровень:
      <span>{{cl.ml}}</span>
      <br/>
      <br/>
    </span>
    <span v-if="cl.ith">
      <span>Двуручное</span>
      <br/>
    </span>
    <span v-if="cl.ac">
      <span>Чужая вещь</span>
      <br/>
    </span>
    <span v-if="cl.miu || cl.mau">
      Урон:
      <span>{{calcHalf(cl.miu)}}-{{calcHalf(cl.mau)}}</span>
      <br/>
    </span>
    <span v-if="cl.str">
      Сила:
      <span>{{calcHalf(cl.str)}}</span>
      <br/>
    </span>
    <span v-if="cl.spd">
      Скорость:
      <span>{{calcHalf(cl.spd)}}</span>
      <br/>
    </span>
    <span v-if="cl.cnt">
      Контратака:
      <span>{{calcHalf(cl.cnt)}}</span>
      <br/>
    </span>
    <span v-if="cl.tch">
      Точность:
      <span>{{calcHalf(cl.tch)}}</span>
      <br/>
    </span>
    <span v-if="cl.msh">
      Мощность:
      <span>{{calcHalf(cl.msh)}}</span>
      <br/>
    </span>
    <span v-if="cl.zhv">
      Живучесть:
      <span>{{calcHalf(cl.zhv)}}</span>
      <br/>
    </span>
    <span v-if="cl.eng">
      Энергия:
      <span>{{calcHalf(cl.eng)}}</span>
      <br/>
    </span>

    <span v-if="cl.klb">
      Кулачный бой:
      <span>{{calcHalf(cl.klb)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.zsc">
      Защита:
      <span>{{calcHalf(cl.zsc)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.vld">
      Владение оружием:
      <span>{{calcHalf(cl.vld)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.mtk">
      Меткость:
      <span>{{calcHalf(cl.mtk)*5}}%</span>
      <br/>
    </span>

    <span v-if="cl.aspd">
      Антискорость:
      <span>{{calcHalf(cl.aspd)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.acnt">
      Антиконтратака:
      <span>{{calcHalf(cl.acnt)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.atch">
      Антиточность:
      <span>{{calcHalf(cl.atch)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.amsh">
      Антимощность:
      <span>{{calcHalf(cl.amsh)*5}}%</span>
      <br/>
    </span>

    <span v-if="cl.ha">
      Броня головы:
      <span>{{calcHalf(cl.ha)}}</span>
      <br/>
    </span>
    <span v-if="cl.ba">
      Броня корпуса:
      <span>{{calcHalf(cl.ba)}}</span>
      <br/>
    </span>
    <span v-if="cl.lha">
      Броня левой руки:
      <span>{{calcHalf(cl.lha)}}</span>
      <br/>
    </span>
    <span v-if="cl.rha">
      Броня правой руки:
      <span>{{calcHalf(cl.rha)}}</span>
      <br/>
    </span>
    <span v-if="cl.fa">
      Броня ног:
      <span>{{calcHalf(cl.fa)}}</span>
      <br/>
    </span>

    <span v-if="cl.aspdp">
      Антискорость прот.:
      <span>-{{calcHalf(cl.aspdp)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.acntp">
      Антиконтратака прот.:
      <span>-{{calcHalf(cl.acntp)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.atchp">
      Антиточность прот.:
      <span>-{{calcHalf(cl.atchp)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.amshp">
      Антимощность прот.:
      <span>-{{calcHalf(cl.amshp)*5}}%</span>
      <br/>
    </span>

    <span v-if="cl.klbp">
      Кулачный бой прот.:
      <span>-{{calcHalf(cl.klbp)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.zscp">
      Защита прот.:
      <span>-{{calcHalf(cl.zscp)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.vldp">
      Владение оружием прот.:
      <span>-{{calcHalf(cl.vldp)*5}}%</span>
      <br/>
    </span>
    <span v-if="cl.mtkp">
      Меткость прот.:
      <span>-{{calcHalf(cl.mtkp)*5}}%</span>
      <br/>
    </span>

    <span v-if="cl.exp">
      Опыт:
      <span>+{{calcHalf(cl.exp)}}%</span>
      <br/>
    </span>
    <span v-if="cl.tb">
      Действие триггера:
      <span>+{{calcHalf(cl.tb)}}%</span>
      <br/>
    </span>
    <span v-if="cl.ms">
      Патронов:
      <span>{{cl.ms}}</span>
      <br/>
    </span>
    <span v-if="cl.rds > 1">
      Радиус поражения:
      <span>{{cl.rds}}</span>
      <br/>
    </span>
    <span v-if="cl.fe">
      Влияние силы:
      <span>{{calcHalf(cl.fe)}}%</span>
      <br/>
    </span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Clothes from '../core/models/clothes';
  import Data from '../data/data';

  @Component({})
  export default class ClothesPopup extends Vue {
    public left = 0;
    public top = 0;
    public visible = false;
    public cl: Clothes | null = null;
    public chemplvl = 0;

    get coord() {
      const isLeft = this.left < window.innerWidth / 2;
      const isTop = this.top < window.innerHeight / 2;
      return {
        left: isLeft ? (this.left + 30) + 'px' : 'auto',
        right: !isLeft ? (window.innerWidth - this.left + 30) + 'px' : 'auto',
        top: isTop ? (this.top + 30) + 'px' : 'auto',
        bottom: !isTop ? (window.innerHeight - this.top + 30) + 'px' : 'auto',
      };
    }

    public showPopup(event: MouseEvent, id: number, chemplvl: number) {
      this.visible = true;
      this.left = event.pageX;
      this.top = event.pageY;
      this.cl = Data.clothes.find((cl) => cl.cid === id) || null;
      this.chemplvl = chemplvl;
    }

    public hidePopup() {
      this.visible = false;
    }

    public calcHalf(stat: number) {
      if (this.cl != null && this.cl.ac) {
        return Math.floor(stat / 2);
      }

      return stat;
    }

    public getPrice(cl: Clothes): number {
      return this.chemplvl === 0 || cl.ing ? cl.prc : (cl.prc * (1 - (11 - this.chemplvl) * 0.01));
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .clothes-popup {
    position: absolute;
    background: var(--back);
    border: solid 1px var(--btn-border);
    border-radius: 6px;
    text-align: left;
    padding: 10px;
  }

  .clothes-popup > span > span {
    color: var(--item-border);
  }
</style>