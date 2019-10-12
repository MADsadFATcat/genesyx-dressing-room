<template>
  <div>
    <div>
      <div class="btn" @click="showEdit">{{ edit ? 'Закрыть' : 'Создать' }}</div>
    </div>
    <transition name="fade">
      <div class="namedweapon" v-show="edit">
        <div class="row row--left">
          <div>
            <img alt="Образ" :src="getClothesSrc(cl.src)"/>
          </div>
          <div class="ml-20">
            <div>
              <b>{{cl.name}}</b>
              <b>
                Статов:
                <span>{{statsum}} ({{ lvl * 130 }})</span>
              </b>
            </div>
            <div>
              <label>
                Уровень:
                <select v-model.number="lvl">
                  <option selected="selected">1</option>
                  <option>2</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div class="row row--grow">
          <div>
            <label>
              Сила:
              <input type="number" v-model.number="cl.str" min="0"/>
            </label>
            <label>
              Скорость:
              <input type="number" v-model.number="cl.spd" min="0"/>
            </label>
            <label>
              Контратака:
              <input type="number" v-model.number="cl.cnt" min="0"/>
            </label>
            <label>
              Точность:
              <input type="number" v-model.number="cl.tch" min="0"/>
            </label>
            <label>
              Мощность:
              <input type="number" v-model.number="cl.msh" min="0"/>
            </label>
            <label>
              Живучесть:
              <input type="number" v-model.number="cl.zhv" min="0"/>
            </label>
          </div>
          <div>
            <label>
              Кулачный бой:
              <input
                type="number"
                :value="cl.klb * 5"
                @input="cl.klb = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Защита:
              <input
                type="number"
                :value="cl.zsc * 5"
                @input="cl.zsc = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Владение оружием:
              <input
                type="number"
                :value="cl.vld * 5"
                @input="cl.vld = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Меткость:
              <input
                type="number"
                :value="cl.mtk * 5"
                @input="cl.mtk = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Кулачный бой прот:
              <input
                type="number"
                :value="cl.klbp * 5"
                @input="cl.klbp = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Защита прот:
              <input
                type="number"
                :value="cl.zscp * 5"
                @input="cl.zscp = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Владение оружием прот:
              <input
                type="number"
                :value="cl.vldp * 5"
                @input="cl.vldp = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Меткость прот:
              <input
                type="number"
                :value="cl.mtkp * 5"
                @input="cl.mtkp = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
          </div>
          <div>
            <label>
              Антискорость:
              <input
                type="number"
                :value="cl.aspd * 5"
                @input="cl.aspd = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Антиконтратака:
              <input
                type="number"
                :value="cl.acnt * 5"
                @input="cl.acnt = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Антиточность:
              <input
                type="number"
                :value="cl.atch * 5"
                @input="cl.atch = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Антимощность:
              <input
                type="number"
                :value="cl.amsh * 5"
                @input="cl.amsh = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Антискорость прот:
              <input
                type="number"
                :value="cl.aspdp * 5"
                @input="cl.aspdp = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Антиконтратака прот:
              <input
                type="number"
                :value="cl.acntp * 5"
                @input="cl.acntp = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Антиточность прот:
              <input
                type="number"
                :value="cl.atchp * 5"
                @input="cl.atchp = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Антимощность прот:
              <input
                type="number"
                :value="cl.amshp * 5"
                @input="cl.amshp = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
          </div>
          <div>
            <label>
              Броня головы:
              <input
                type="number"
                :value="cl.ha * 5"
                @input="cl.ha = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Броня корпуса:
              <input
                type="number"
                :value="cl.ba * 5"
                @input="cl.ba = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Броня рук:
              <input
                type="number"
                :value="cl.lha * 5"
                @input="cl.lha = $event.target.value / 5; cl.rha = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Броня ног:
              <input
                type="number"
                :value="cl.fa * 5"
                @input="cl.fa = $event.target.value / 5"
                min="0"
                step="5"
              />
            </label>
            <label>
              Мин. урон:
              <input type="number" v-model.number="cl.miu" min="0" step="5"/>
            </label>
            <label>
              Макс. урон:
              <input type="number" v-model.number="cl.mau" min="0" step="5"/>
            </label>
          </div>
        </div>
        <div class="mt-20">
          <div class="btn" @click="Save(cl); edit = false;">Сохранить</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import _ from 'lodash';

  import Clothes from '../core/models/clothes';
  import Stats from '../core/models/stats';
  import {Emit} from 'vue-property-decorator';
  import config from '@/config';

  @Component({})
  export default class NamedClothes extends Vue {

    public edit = false;
    public lvl = 1;
    public cl = new Clothes();

    public showEdit() {
      this.edit = !this.edit;
      this.lvl = 1;

      const cl = new Clothes();
      cl.name = 'Оружие победителя турнира';
      cl.cc = 4;
      cl.ac = false;
      cl.ing = false;
      cl.prc = 0;
      cl.rds = 1;
      cl.src = 'TournWeapon.png';
      this.cl = cl;
    }

    public editNamed(cl: Clothes) {
      this.cl = cl;
      this.edit = true;
    }

    get statsum(): number {
      const stats = new Stats();
      let sum = 0;
      _.forOwn(stats, (v, k) => {
        sum += _.get(this.cl, k);
      });
      sum += this.cl.miu / 5;
      sum += this.cl.mau / 5;
      return sum;
    }

    public getClothesSrc(src: string): string {
      return `${config.gameUrl}/Images/Clothes/${src}`;
    }

    @Emit('add-named')
    public Save(cl: Clothes) {
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .namedweapon {
    text-align: left;
    border: solid 1px var(--btn-border);
    border-radius: 6px;
    padding: 6px;
    vertical-align: middle;
    line-height: 20px;

    label {
      width: 100%;
      display: block;
    }

    input {
      float: right;
      margin-right: 5px;
    }
  }
</style>