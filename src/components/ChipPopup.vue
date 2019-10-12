<template>
  <div
    class="chip-popup"
    v-show="visible"
    v-if="chip != null"
    :style="{ top: coord.top + 'px', left: coord.left + 'px' }"
  >
    <span v-if="chip.str">
      Сила:
      <span>+{{chip.str}}</span>
      <br/>
    </span>
    <span v-if="chip.spd">
      Скорость:
      <span>+{{chip.spd}}</span>
      <br/>
    </span>
    <span v-if="chip.cnt">
      Контратака:
      <span>+{{chip.cnt}}</span>
      <br/>
    </span>
    <span v-if="chip.tch">
      Точность:
      <span>+{{chip.tch}}</span>
      <br/>
    </span>
    <span v-if="chip.msh">
      Мощность:
      <span>+{{chip.msh}}</span>
      <br/>
    </span>
    <span v-if="chip.zhv">
      Живучесть:
      <span>+{{chip.zhv}}</span>
      <br/>
    </span>

    <span v-if="chip.klb">
      Кулачный бой:
      <span>+{{chip.klb*5}}%</span>
      <br/>
    </span>
    <span v-if="chip.zsc">
      Защита:
      <span>+{{chip.zsc*5}}%</span>
      <br/>
    </span>
    <span v-if="chip.vld">
      Владение оружием:
      <span>+{{chip.vld*5}}%</span>
      <br/>
    </span>
    <span v-if="chip.mtk">
      Меткость:
      <span>+{{chip.mtk*5}}%</span>
      <br/>
    </span>

    <span v-if="chip.aspd">
      Антискорость:
      <span>+{{chip.aspd*5}}%</span>
      <br/>
    </span>
    <span v-if="chip.acnt">
      Антиконтратака:
      <span>+{{chip.acnt*5}}%</span>
      <br/>
    </span>
    <span v-if="chip.atch">
      Антиточность:
      <span>+{{chip.atch*5}}%</span>
      <br/>
    </span>
    <span v-if="chip.amsh">
      Антимощность:
      <span>+{{chip.amsh*5}}%</span>
      <br/>
    </span>

    <span v-if="chip.aspdp">
      Антискорость прот.:
      <span>-{{chip.aspdp*5}}%</span>
      <br/>
    </span>
    <span v-if="chip.acntp">
      Антиконтратака прот.:
      <span>-{{chip.acntp*5}}%</span>
      <br/>
    </span>
    <span v-if="chip.atchp">
      Антиточность прот.:
      <span>-{{chip.atchp*5}}%</span>
      <br/>
    </span>
    <span v-if="chip.amshp">
      Антимощность прот.:
      <span>-{{chip.amshp*5}}%</span>
      <br/>
    </span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Data from '../data/data';
  import Chip from '../core/models/chip';

  @Component({})
  export default class ChipPopup extends Vue {

    public left = 0;
    public top = 0;
    public visible = false;
    public chip: Chip | null = null;

    get coord() {
      return {
        left: this.left - 30,
        top: this.top + 30,
      };
    }

    public showPopup(event: MouseEvent, chipId: number) {
      this.visible = true;
      this.left = event.pageX;
      this.top = event.pageY;
      this.chip = Data.chips.find((ch) => ch.id === chipId) || null;
    }

    public hidePopup() {
      this.visible = false;
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .chip-popup {
    position: absolute;
    background: var(--back);
    border: solid 1px var(--btn-border);
    border-radius: 6px;
    text-align: left;
    padding: 10px;
  }

  .chip-popup > span > span {
    color: var(--item-border);
  }
</style>