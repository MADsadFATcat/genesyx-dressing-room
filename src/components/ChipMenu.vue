<template>
  <div
    class="chip-menu"
    v-show="visible"
    :style="{ top: coord.top + 'px', left: coord.left + 'px' }"
    @mouseleave="hideChipMenu"
  >
    <table>
      <tr>
        <td :colspan="10">
          <div class="btn btn--full" @click="chipClear()">Демонтаж чипа</div>
        </td>
      </tr>
      <tr v-for="(cst, i) in chipsGrouped" :key="i + 'cs'">
        <td>{{cst.title}}</td>
        <td v-for="ch in cst.chips" :key="ch.id + 'csc'">
          <div
            class="btn btn--small"
            @click="insertChip(ch.id)"
          >{{ i > 13 ? '-' + ch.val*5 + '%' : (i > 5 ? '+' + ch.val*5 + '%' : '+' + ch.val) }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import _ from 'lodash';

  import Data from '../data/data';
  import StatNames from '../core/models/stat-names';
  import Chip from '../core/models/chip';
  import {Emit} from 'vue-property-decorator';

  @Component({})
  export default class ChipMenu extends Vue {

    public visible = false;
    public top = 0;
    public left = 0;
    public lastSlot = 1;
    public lastDoll = 1;

    public chipsGrouped = Data.chipGrouped;

    get coord() {
      return {
        left: this.left - 535 / 2,
        top: this.top - 30,
      };
    }

    public showChipMenu(event: MouseEvent, lastSlot: number, lastDoll: number) {
      this.visible = true;
      this.left = event.pageX;
      this.top = event.pageY;
      this.lastSlot = lastSlot;
      this.lastDoll = lastDoll;
    }

    public hideChipMenu() {
      this.visible = false;
    }

    @Emit('chip-clear')
    public chipClear() {
    }

    @Emit('chip-ins')
    public insertChip(id: number) {
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .chip-menu {
    position: absolute;
    background: var(--back);
    border: solid 1px var(--btn-border);
    border-radius: 6px;
    text-align: center;
    line-height: 20px;

    td {
      padding: 0;
    }

    tr:nth-child(2n) .btn {
      background-color: var(--btn-back2);
      border: solid 1px var(--btn-border2);
    }
  }
</style>