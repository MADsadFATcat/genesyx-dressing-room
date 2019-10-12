<template>
  <div class="battle-triggers">
    <label>
      Тактика:
      <select v-model.number="vm.tactic">
        <option value="0">Стандартная</option>
        <option value="1">Атакующая</option>
        <option value="2">Защитная</option>
        <option value="3">Полузащитная</option>
      </select>
    </label>
    <br/>
    <label>
      Триггер первого уровня:
      <select v-model.number="vm.trigger1">
        <option value="0">Нет</option>
        <option value="1">Ярости</option>
        <option value="2">Вампиризма</option>
        <option value="3">Спокойствия</option>
        <option value="4">Смеха</option>
      </select>
    </label>
    <br/>
    <label>
      Триггер второго уровня:
      <select v-model.number="vm.trigger2">
        <option value="0">Нет</option>
        <option value="1">Боли</option>
        <option value="2">Поглощения</option>
        <option value="3">Эха</option>
      </select>
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Prop, Watch} from 'vue-property-decorator';

  import BattleTriggers from '@/core/models/battle-triggers';
  import Data from '@/data/data';

  @Component({})
  export default class BattleTrigger extends Vue {

    public vm = new BattleTriggers();

    @Prop()
    public num!: number;

    private created() {
      Data.getTriggersFromStorage(this.num, (cb) => {
        if (!!cb) {
          this.vm = cb;
        }
      });
    }

    @Watch('vm', {deep: true})
    private onVmChanged() {
      Data.saveTriggersToStorage(this.vm, this.num);
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .battle-triggers {
    text-align: left;

    select {
      float: right;
      width: 100px;
    }
  }
</style>