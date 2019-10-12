<template>
  <div id="app" class="app app--fullscreen">
    <div class="tabs tabs--border row mt-20">
      <div>
        <button
          class="tab"
          :class="{ 'tab--active': leftDollNum === 1 }"
          @click="leftDollNum = 1"
        >1
        </button>
        <button
          class="tab"
          :class="{ 'tab--active': leftDollNum === 2 }"
          @click="leftDollNum = 2"
        >2
        </button>
        <button
          class="tab"
          :class="{ 'tab--active': leftDollNum === 3 }"
          @click="leftDollNum = 3"
        >3
        </button>
        <button
          class="tab"
          :class="{ 'tab--active': leftDollNum === 4 }"
          @click="leftDollNum = 4"
        >4
        </button>
        <button
          class="tab"
          :class="{ 'tab--active': leftDollNum === 5 }"
          @click="leftDollNum = 5"
        >5
        </button>
      </div>
      <div>
        <button
          class="tab tab--big"
          @click="tabMode = (tabMode === 1 ? 2 : 1)"
        >{{tabMode === 1 ? 'ТЕСТОВЫЙ БОЙ' : 'ПРИМЕРОЧНАЯ' }}
        </button>
      </div>
      <div>
        <button
          class="tab"
          :class="{ 'tab--active': rightDollNum === 1 }"
          @click="rightDollNum = 1"
        >1
        </button>
        <button
          class="tab"
          :class="{ 'tab--active': rightDollNum === 2 }"
          @click="rightDollNum = 2"
        >2
        </button>
        <button
          class="tab"
          :class="{ 'tab--active': rightDollNum === 3 }"
          @click="rightDollNum = 3"
        >3
        </button>
        <button
          class="tab"
          :class="{ 'tab--active': rightDollNum === 4 }"
          @click="rightDollNum = 4"
        >4
        </button>
        <button
          class="tab"
          :class="{ 'tab--active': rightDollNum === 5 }"
          @click="rightDollNum = 5"
        >5
        </button>
      </div>
    </div>
    <div v-show="tabMode === 1" class="row mt-20">
      <transition name="fade">
        <div class="row">
          <Doll
            :left="true"
            :num="1"
            v-show="leftDollNum === 1"
            @show-clothes-menu="showClothesMenu"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @show-chip-menu="showChipMenu"
            @show-chip-popup="showChipPopup"
            @hide-chip-popup="hideChipPopup"
            @clone-doll="cloneDoll"
            ref="doll1"
          ></Doll>
          <Doll
            :left="true"
            :num="2"
            v-show="leftDollNum === 2"
            @show-clothes-menu="showClothesMenu"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @show-chip-menu="showChipMenu"
            @show-chip-popup="showChipPopup"
            @hide-chip-popup="hideChipPopup"
            @clone-doll="cloneDoll"
            ref="doll2"
          ></Doll>
          <Doll
            :left="true"
            :num="3"
            v-show="leftDollNum === 3"
            @show-clothes-menu="showClothesMenu"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @show-chip-menu="showChipMenu"
            @show-chip-popup="showChipPopup"
            @hide-chip-popup="hideChipPopup"
            @clone-doll="cloneDoll"
            ref="doll3"
          ></Doll>
          <Doll
            :left="true"
            :num="4"
            v-show="leftDollNum === 4"
            @show-clothes-menu="showClothesMenu"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @show-chip-menu="showChipMenu"
            @show-chip-popup="showChipPopup"
            @hide-chip-popup="hideChipPopup"
            @clone-doll="cloneDoll"
            ref="doll4"
          ></Doll>
          <Doll
            :left="true"
            :num="5"
            v-show="leftDollNum === 5"
            @show-clothes-menu="showClothesMenu"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @show-chip-menu="showChipMenu"
            @show-chip-popup="showChipPopup"
            @hide-chip-popup="hideChipPopup"
            @clone-doll="cloneDoll"
            ref="doll5"
          ></Doll>
          <Stats></Stats>
          <Doll
            :left="false"
            :num="6"
            v-show="rightDollNum === 1"
            @show-clothes-menu="showClothesMenu"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @show-chip-menu="showChipMenu"
            @show-chip-popup="showChipPopup"
            @hide-chip-popup="hideChipPopup"
            @clone-doll="cloneDoll"
            ref="doll6"
          ></Doll>
          <Doll
            :left="false"
            :num="7"
            v-show="rightDollNum === 2"
            @show-clothes-menu="showClothesMenu"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @show-chip-menu="showChipMenu"
            @show-chip-popup="showChipPopup"
            @hide-chip-popup="hideChipPopup"
            @clone-doll="cloneDoll"
            ref="doll7"
          ></Doll>
          <Doll
            :left="false"
            :num="8"
            v-show="rightDollNum === 3"
            @show-clothes-menu="showClothesMenu"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @show-chip-menu="showChipMenu"
            @show-chip-popup="showChipPopup"
            @hide-chip-popup="hideChipPopup"
            @clone-doll="cloneDoll"
            ref="doll8"
          ></Doll>
          <Doll
            :left="false"
            :num="9"
            v-show="rightDollNum === 4"
            @show-clothes-menu="showClothesMenu"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @show-chip-menu="showChipMenu"
            @show-chip-popup="showChipPopup"
            @hide-chip-popup="hideChipPopup"
            @clone-doll="cloneDoll"
            ref="doll9"
          ></Doll>
          <Doll
            :left="false"
            :num="10"
            v-show="rightDollNum === 5"
            @show-clothes-menu="showClothesMenu"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @show-chip-menu="showChipMenu"
            @show-chip-popup="showChipPopup"
            @hide-chip-popup="hideChipPopup"
            @clone-doll="cloneDoll"
            ref="doll10"
          ></Doll>
          <ChipMenu @chip-ins="chipIns" @chip-clear="chipClear" ref="chipmenu"></ChipMenu>
          <ClothesMenu
            @clothes-dress="clothesDress"
            @clothes-take-off="clothesTakeOff"
            @show-clothes-popup="showClothesPopup"
            @hide-clothes-popup="hideClothesPopup"
            @delete-from-dolls="deleteFromDolls"
            ref="clothesmenu"
          ></ClothesMenu>
          <ChipPopup ref="chippopup"></ChipPopup>
          <ClothesPopup ref="clothespopup"></ClothesPopup>
        </div>
      </transition>
    </div>
    <div v-show="tabMode === 2">
      <transition name="fade">
        <Battle :leftPlayerNum="leftDollNum" :rightPlayerNum="rightDollNum" ref="battle"></Battle>
      </transition>
    </div>
    <div class="color-picker">
      <select v-model="theme">
        <option value="default" class="color-picker__option--default"></option>
        <option value="purple" class="color-picker__option--purple"></option>
        <option value="blue" class="color-picker__option--blue"></option>
        <option value="peach" class="color-picker__option--peach"></option>
        <option value="yankee" class="color-picker__option--yankee"></option>
        <option value="rose" class="color-picker__option--rose"></option>
        <option value="grey" class="color-picker__option--grey"></option>
        <option value="orange" class="color-picker__option--orange"></option>
        <option value="green" class="color-picker__option--green"></option>
        <option value="brown" class="color-picker__option--brown"></option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import Stats from './components/Stats.vue';
  import Doll from './components/Doll.vue';
  import ChipMenu from './components/ChipMenu.vue';
  import ChipPopup from './components/ChipPopup.vue';
  import ClothesMenu from './components/ClothesMenu.vue';
  import ClothesPopup from './components/ClothesPopup.vue';
  import Data from './data/data';
  import Battle from './components/Battle.vue';
  import Settings from './core/models/settings';

  @Component({
    components: {
      Stats,
      Doll,
      ChipMenu,
      ChipPopup,
      ClothesMenu,
      ClothesPopup,
      Battle,
    },
  })
  export default class App extends Vue {
    public leftDollNum = 1;
    public rightDollNum = 1;
    public tabMode = 1;
    public theme = 'default';

    public showChipMenu(event: MouseEvent, lastSlot: number, lastDoll: number) {
      (this.$refs.chipmenu as ChipMenu).showChipMenu(event, lastSlot, lastDoll);
    }

    public chipIns(chipId: number) {
      const chipMenu = (this.$refs.chipmenu as ChipMenu);
      (this.$refs['doll' + chipMenu.lastDoll] as Doll).chipIns(chipId, chipMenu.lastSlot);
      chipMenu.hideChipMenu();
    }

    public chipClear() {
      const chipMenu = (this.$refs.chipmenu as ChipMenu);
      (this.$refs['doll' + chipMenu.lastDoll] as Doll).clearChipSlot(chipMenu.lastSlot);
      chipMenu.hideChipMenu();
    }

    public showChipPopup(event: MouseEvent, chipId: number | null) {
      if (chipId == null) {
        return;
      }

      (this.$refs.chippopup as ChipPopup).showPopup(event, chipId);
    }

    public hideChipPopup() {
      (this.$refs.chippopup as ChipPopup).hidePopup();
    }

    public showClothesMenu(event: MouseEvent, lastSlot: number, lastDoll: number, chemplvl: number) {
      (this.$refs.clothesmenu as ClothesMenu).showClothesMenu(event, lastSlot, lastDoll, chemplvl);
    }

    public clothesDress(id: number) {
      const menu = this.$refs.clothesmenu as ClothesMenu;
      (this.$refs['doll' + menu.lastDoll] as Doll).clothesDress(menu.lastSlot, id);
      menu.hideClothesMenu();
    }

    public clothesTakeOff() {
      const menu = this.$refs.clothesmenu as ClothesMenu;
      (this.$refs['doll' + menu.lastDoll] as Doll).clothesTakeOff(menu.lastSlot);
      menu.hideClothesMenu();
    }

    public showClothesPopup(event: MouseEvent, id: number, chemplvl: number) {
      if (id == null) {
        return;
      }

      (this.$refs.clothespopup as ClothesPopup).showPopup(event, id, chemplvl);
    }

    public hideClothesPopup() {
      (this.$refs.clothespopup as ClothesPopup).hidePopup();
    }

    public cloneDoll(left: boolean) {
      const dollIndexFrom = left ? this.leftDollNum : this.rightDollNum + 5;
      const dollIndexTo = left ? this.rightDollNum + 5 : this.leftDollNum;
      const from = this.$refs['doll' + dollIndexFrom] as Doll;
      const to = this.$refs['doll' + dollIndexTo] as Doll;
      to.clearSlots();
      to.loadDollFromHash(from.getDollHash());
    }

    public deleteFromDolls(id: number) {
      for (let i = 1; i <= 10; i++) {
        (this.$refs['doll' + i] as Doll).clothesTakeOffById(id);
      }
    }

    private created() {
      Data.getSettings((settings) => {
        if (!settings) {
          settings = new Settings();
        }

        this.theme = settings.theme;
      });

      Data.getClothesFromStorage((clothes) => {
        if (clothes != null) {
          Data.clothes.push(...clothes);
        }
      });
    }

    @Watch('tabMode')
    private onTabChange() {
      (this.$refs.battle as Battle).clear();
    }

    @Watch('theme')
    private onThemeChange() {
      document.documentElement.setAttribute('theme', this.theme);
      const settings = new Settings();
      settings.theme = this.theme;
      Data.saveSettings(settings);
    }
  }
</script>
<style lang="scss">
  @import "styles/variables";

  body,
  html {
    margin: 0;
    padding: 0;
  }

  body,
  button,
  select,
  input {
    font-family: verdana, arial, helvetica, serif;
    font-size: 11px;
  }

  button {
    outline: none !important;
    box-shadow: none !important;
    cursor: pointer !important;
  }

  body {
    text-align: center;
    background: var(--back);
    color: var(--text-color);
  }

  input {
    border: 2px;
    padding: 1px;
    height: 15px;
    width: 45px;
    vertical-align: middle;

    &[type="checkbox"] {
      height: 13px;
      width: 13px;
    }
  }

  select {
    height: 17px;
  }

  .app {
    &--fullscreen {
      margin: 0 auto;
      width: fit-content;
      padding: 0;
    }
  }

  .tabs {
    &--border {
      border-bottom: 1px solid var(--btn-border);
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;

    &--wrap {
      flex-wrap: wrap !important;
    }

    &--grow > * {
      flex-grow: 1 !important;
    }

    &--center {
      justify-content: center !important;
    }

    &--back {
      flex-direction: row-reverse !important;
    }

    &--left {
      justify-content: start !important;
    }
  }

  .mt-20 {
    margin-top: 20px;
  }

  .ml-20 {
    margin-left: 20px;
  }

  .mr-3 {
    margin-right: 3px;
  }

  .tab {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    padding: 7px 10px;
    background: var(--btn-back);
    border: solid 1px var(--btn-border);
    border-bottom: none;
    text-align: center;
    vertical-align: middle;
    color: var(--text-color);
    transition: background-color 0.3s linear;

    &:hover,
    &--active {
      background: var(--btn-border);
    }

    &--big {
      width: 250px;
    }
  }

  .btn {
    border-radius: 6px;
    padding: 10px;
    background: var(--btn-back);
    border: solid 1px var(--btn-border);
    transition: background-color 0.3s linear;
    text-align: center;
    vertical-align: middle;
    color: var(--text-color);
    cursor: pointer !important;

    &:hover,
    &--active {
      background: var(--btn-border);
      border: solid 1px var(--btn-back);
    }

    &--small {
      height: 18px;
      width: 43px;
      padding: 0 !important;
    }

    &--full {
      height: 20px;
      padding: 0 !important;
    }
  }

  .color-picker {
    position: fixed;
    right: 20px;
    top: 20px;

    select {
      width: 20px;
      background-color: var(--border);
    }

    &__option {
      &--default {
        background-color: var(--theme-default);
      }

      &--purple {
        background-color: var(--theme-purple);
      }

      &--blue {
        background-color: var(--theme-blue);
      }

      &--peach {
        background-color: var(--theme-peach);
      }

      &--yankee {
        background-color: var(--theme-yankee);
      }

      &--rose {
        background-color: var(--theme-rose);
      }

      &--grey {
        background-color: var(--theme-grey);
      }

      &--orange {
        background-color: var(--theme-orange);
      }

      &--green {
        background-color: var(--theme-green);
      }

      &--brown {
        background-color: var(--theme-brown);
      }
    }
  }
</style>
