<template>
  <div class="injection-input">
    <div>
      <input
        v-model.number="_commonCount"
        type="number"
        min="0"
        class="injection-input__common-injection-input"
      />
    </div>
    <div>
      <img class="injection-input__icon" :src="src" :alt="name" :title="name"/>
    </div>
    <div>
      <input
        v-model.number="_goldCount"
        type="number"
        min="0"
        class="injection-input__gold-injection-input"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Prop, Emit, Watch} from 'vue-property-decorator';

  @Component({})
  export default class InjectionInput extends Vue {

    @Prop()
    public commonCount!: number;

    get _commonCount() {
      return this.commonCount;
    }

    set _commonCount(d) {
      this.$emit('update:commonCount', d);
    }

    @Prop()
    public goldCount!: number;

    get _goldCount() {
      return this.goldCount;
    }

    set _goldCount(d) {
      this.$emit('update:goldCount', d);
    }

    @Prop()
    public src!: string;
    @Prop()
    public name!: string;
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .injection-input {
    &__common-injection-input {
      border: 2px solid $price;
    }

    &__gold-injection-input {
      border: 2px solid $gold;
    }

    &__icon {
      width: 18px;
      height: 18px;
      margin: 1px 5px;
      border: 1px solid var(--border);
    }
  }
</style>