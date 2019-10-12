<template>
  <div class="battle-stats">
    <span>
      Сила:
      <span class="battle-stats__value">{{pl.str}}</span>
      <br/>
    </span>
    <span>
      Скорость:
      <span class="battle-stats__value">{{pl.spd}}</span>
      <br/>
    </span>
    <span>
      Контратака:
      <span class="battle-stats__value">{{pl.cnt}}</span>
      <br/>
    </span>
    <span>
      Точность:
      <span class="battle-stats__value">{{pl.tch}}</span>
      <br/>
    </span>
    <span>
      Мощность:
      <span class="battle-stats__value">{{pl.msh}}</span>
      <br/>
    </span>
    <span>
      Живучесть:
      <span class="battle-stats__value">{{pl.zhv}}</span>
      <br/>
    </span>
    <span>
      Энергия:
      <span class="battle-stats__value">{{pl.eng}}</span>
      <br/>
    </span>

    <span>
      Кулачный бой:
      <span class="battle-stats__value">{{pl.klb*5}}%</span>
      <br/>
    </span>
    <span>
      Защита:
      <span class="battle-stats__value">{{pl.zsc*5}}%</span>
      <br/>
    </span>
    <span>
      Владение оружием:
      <span class="battle-stats__value">{{pl.vld*5}}%</span>
      <br/>
    </span>
    <span>
      Меткость:
      <span class="battle-stats__value">{{pl.mtk*5}}%</span>
      <br/>
    </span>

    <span>
      Антискорость:
      <span class="battle-stats__value">{{pl.aspd*5}}%</span>
      <br/>
    </span>
    <span>
      Антиконтратака:
      <span class="battle-stats__value">{{pl.acnt*5}}%</span>
      <br/>
    </span>
    <span>
      Антиточность:
      <span class="battle-stats__value">{{pl.atch*5}}%</span>
      <br/>
    </span>
    <span>
      Антимощность:
      <span class="battle-stats__value">{{pl.amsh*5}}%</span>
      <br/>
    </span>

    <span v-show="pl.aspdp">
      Антискорость прот.:
      <span class="battle-stats__value">-{{pl.aspdp*5}}%</span>
      <br/>
    </span>
    <span v-show="pl.acntp">
      Антиконтратака прот.:
      <span class="battle-stats__value">-{{pl.acntp*5}}%</span>
      <br/>
    </span>
    <span v-show="pl.atchp">
      Антиточность прот.:
      <span class="battle-stats__value">-{{pl.atchp*5}}%</span>
      <br/>
    </span>
    <span v-show="pl.amshp">
      Антимощность прот.:
      <span class="battle-stats__value">-{{pl.amshp*5}}%</span>
      <br/>
    </span>

    <span v-show="pl.klbp > 0">
      Кулачный бой прот.:
      <span class="battle-stats__value">-{{pl.klbp*5}}%</span>
      <br/>
    </span>
    <span v-show="pl.zscp > 0">
      Защита прот.:
      <span class="battle-stats__value">-{{pl.zscp*5}}%</span>
      <br/>
    </span>
    <span v-show="pl.vldp > 0">
      Владение оружием прот.:
      <span class="battle-stats__value">-{{pl.vldp*5}}%</span>
      <br/>
    </span>
    <span v-show="pl.mtkp > 0">
      Меткость прот.:
      <span class="battle-stats__value">-{{pl.mtkp*5}}%</span>
      <br/>
    </span>
    <br/>
    <div>
      <div class="battle-stats__armor-slots">
        <div title="Броня головы" class="battle-stats__armor-slot">{{pl.ha}}</div>
        <div class="row">
          <div title="Броня левой руки" class="battle-stats__armor-slot">{{pl.lha}}</div>
          <div title="Броня корпуса" class="battle-stats__armor-slot">{{pl.ba}}</div>
          <div title="Броня правой руки" class="battle-stats__armor-slot">{{pl.rha}}</div>
        </div>
        <div title="Броня ног" class="battle-stats__armor-slot">{{pl.fa}}</div>
      </div>
      <div>
        <div class="battle-stats__l-dmg" title="Урон левой рукой">
          <span>{{pl.ldmg}}</span>
          <br/>
          <span class="battle-stats__crit">{{pl.ldmgc}}</span>
        </div>
        <div class="battle-stats__r-dmg" title="Урон правой рукой">
          <span>{{pl.rdmg}}</span>
          <br/>
          <span class="battle-stats__crit">{{pl.rdmgc}}</span>
        </div>
        <div title="Рейтинг" class="battle-stats__rate">{{pl.rate.toFixed(1)}}</div>
        <div title="Здоровье" class="battle-stats__hp">{{hp}}</div>
        <div title="Энергия" class="battle-stats__energy">{{pl.eng*5}}</div>
      </div>
    </div>
    <div class="battle-stats__hp-bar">
      <div
        class="battle-stats__hp-bar-inner"
        :style="{ width: ((hp <= 0 ? 0 : hp) * 100 / (pl.zhv * 5)) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Player from '../core/models/player';
  import {Prop} from 'vue-property-decorator';

  @Component({})
  export default class BattleStats extends Vue {

    @Prop()
    public pl!: Player;

    @Prop()
    public hp!: number;
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .battle-stats {
    text-align: left;
    width: fit-content;
    border: solid 1px var(--btn-border);
    padding: 10px;
    position: relative;
    margin: 20px auto;

    &__value {
      color: var(--item-border);
    }

    &__armor-slots {
      margin: 0 auto;
      width: 100px;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      text-align: center;
    }

    &__armor-slot {
      background-color: var(--btn-border);
      border: solid 1px var(--border);
      width: 30px;
      margin: 1px;
      line-height: 13px;
    }

    &__l-dmg {
      position: absolute;
      left: -60px;
      top: 192px;
      text-align: right;
      width: 56px;
      font-size: 10px;
    }

    &__r-dmg {
      position: absolute;
      right: -60px;
      top: 192px;
      text-align: left;
      width: 56px;
      font-size: 10px;
    }

    &__crit {
      color: $crit;
    }

    &__rate {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    &__hp {
      position: absolute;
      right: 5px;
      bottom: 5px;
      color: $hp;
    }

    &__energy {
      position: absolute;
      left: 5px;
      bottom: 5px;
      color: $gold;
    }

    &__hp-bar {
      border: solid 1px var(--btn-border);
      position: absolute;
      bottom: -15px;
      width: 100%;
      left: -1px;
    }

    &__hp-bar-inner {
      background-color: $hp;
      height: 1px;
    }
  }
</style>