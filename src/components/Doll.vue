<template>
  <div class="row player" :class="{ 'row--back': left, 'row--back': !left }">
    <div
      class="player__doll"
      :class="{ 'player__doll--left': left, 'player__doll--right': !left }"
    >
      <div class="player__slots" :style="`background-image: url('${getSlotsSrc()}');`">
        <img
          v-for="(cs, i) in clothesSlots"
          :key="i + 'cs'"
          :src="vm.clothes[i] ? getClothesSrc(vm.clothes[i]) : require('../assets/img/i.gif')"
          :alt="cs.title"
          :title="!vm.clothes[i] ? cs.title : ''"
          :class="cs.class"
          @click="showClothesMenu($event, i, num, vm.chemplvl)"
          @mouseenter="showClothesPopup($event, vm.clothes[i], vm.chemplvl)"
          @mouseleave="hideClothesPopup()"
        />
        <img
          v-for="(cs, i) in chipSlots"
          :key="i + 'chs'"
          :src="vm.chips[i] ? require('../assets/img/chip.png') : require('../assets/img/i.gif')"
          :alt="cs.title"
          :title="!vm.chips[i] ? cs.title : ''"
          :class="cs.class"
          @click="showChipMenu($event, i, num)"
          @mouseenter="showChipPopup($event, vm.chips[i])"
          @mouseleave="hideChipPopup()"
        />
        <img
          src="../assets/img/i.gif"
          alt="Мастер-чип"
          title="Мастер-чип, выставляет все чипы"
          class="chipslot chipslot--master-chip"
          @click="showChipMenu($event, -1, num)"
        />
        <img
          v-for="(cs, i) in vm.superchips"
          :key="i + 'schs'"
          :src="cs ? require('../assets/img/chip.png') : require('../assets/img/i.gif')"
          :alt="superChipSlots[i].title"
          :title="!cs ? superChipSlots[i].title : ''"
          :class="superChipSlots[i].class"
          @click="showChipMenu($event, - 2 - i, num)"
          @mouseenter="showChipPopup($event, cs)"
          @mouseleave="hideChipPopup()"
        />
        <div class="player__armor-slots">
          <div title="Броня головы" class="player__armor-slot">{{pl.ha}}</div>
          <div class="row">
            <div title="Броня левой руки" class="player__armor-slot">{{pl.lha}}</div>
            <div title="Броня корпуса" class="player__armor-slot">{{pl.ba}}</div>
            <div title="Броня правой руки" class="player__armor-slot">{{pl.rha}}</div>
          </div>
          <div title="Броня ног" class="player__armor-slot">{{pl.fa}}</div>
        </div>
        <div class="player__l-dmg" title="Урон левой рукой">
          <span>{{pl.ldmg}}</span>
          <br/>
          <span class="player__crit">{{pl.ldmgc}}</span>
        </div>
        <div class="player__r-dmg" title="Урон правой рукой">
          <span>{{pl.rdmg}}</span>
          <br/>
          <span class="player__crit">{{pl.rdmgc}}</span>
        </div>
        <div title="Рейтинг" class="player__rate">{{pl.rate.toFixed(1)}}</div>
        <div title="Здоровье" class="player__hp">{{pl.zhv*5}}</div>
        <div title="Энергия" class="player__energy">{{pl.eng*5}}</div>
      </div>
      <div class="player__info">
        <div>
          <label>
            КПК:
            <select v-model.number="vm.pdalvl">
              <option selected="selected" value="0">нет</option>
              <option value="1">X2</option>
              <option value="2">X3</option>
              <option value="3">X4</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Место клана в чемпионате:
            <select v-model.number="vm.chemplvl">
              <option selected="selected" value="0">нет</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </label>
          <br/>
          <br/>
        </div>
        <div>
          Стоимость комплекта:
          <span class="price">{{pl.prc.toFixed(2)}} кр.</span>
          <span class="gold-price" v-show="pl.prcg > 0">&nbsp;{{pl.prcg.toFixed(2)}} кр.</span>
        </div>
        <div>
          Стоимость инъекций:
          <span class="price">{{pl.injPrc.toFixed(2)}} кр.</span>
          <span class="gold-price" v-show="pl.injPrcg > 0">&nbsp;{{pl.injPrcg.toFixed(2)}} кр.</span>
        </div>
      </div>
      <div class="player__buttons mt-20">
        <button class="btn" @click="clearSlots">СНЯТЬ ВСЁ</button>
        <button class="btn" @click="clearAll">СБРОСИТЬ ВСЁ</button>
        <button class="btn" @click="showInjections = !showInjections">ИНЪЕКЦИИ</button>
        <button class="btn" @click="resetInjections">СБРОСИТЬ ИНЪЕКЦИИ</button>
        <button class="btn" @click="showShare = !showShare">ПОДЕЛИТЬСЯ</button>
        <button
          class="btn"
          @click="cloneDoll(left)"
        >{{left?'КЛОНИРОВАТЬ &gt;&gt;':'&lt;&lt; КЛОНИРОВАТЬ'}}
        </button>
      </div>
      <transition name="fade">
        <div class="player__injections-info mt-20" v-show="showInjections">
          Бонус от приватной комнаты
          <br/>
          <label>
            Супружеский уровень:
            <select v-model.number="vm.privatelvl">
              <option selected="selected" value="0">нет</option>
              <option value="1">1 (+30/+150%/-150%)</option>
              <option value="2">2 (+40/+200%/-200%)</option>
              <option value="3">3 (+50/+250%/-250%)</option>
              <option value="4">4 (+60/+300%/-300%)</option>
              <option value="5">5 (+70/+350%/-350%)</option>
            </select>
          </label>
          <br/>
          <label>
            Параметр:
            <select v-model="vm.privatestat">
              <option selected="selected" value="str">Сила</option>
              <option value="spd">Скорость</option>
              <option value="cnt">Контратака</option>
              <option value="tch">Точность</option>
              <option value="msh">Мощность</option>
              <option value="zhv">Живучесть</option>
              <option value="klb">Кулачный бой</option>
              <option value="zsc">Защита</option>
              <option value="vld">Владение оружием</option>
              <option value="mtk">Меткость</option>
              <option value="aspd">Антискорость</option>
              <option value="acnt">Антиконтратака</option>
              <option value="atch">Антиточность</option>
              <option value="amsh">Антимощность</option>
              <option value="aspdp">Антискорость прот.</option>
              <option value="acntp">Антиконтратака прот.</option>
              <option value="atchp">Антиточность прот.</option>
              <option value="amshp">Антимощность прот.</option>
            </select>
          </label>
        </div>
      </transition>
      <transition name="fade">
        <div class="mt-20" v-show="showShare">
          <div
            class="btn"
            @click="saveToCode"
            v-tooltip="{
              content: 'Код скопирован!',
              show: saveToCodeTooltip,
              trigger: 'manual',
              placement: 'top',
            }"
          >ПОЛУЧИТЬ КОД
          </div>
          <br/>
          <label>
            Код:
            <input type="text" class="player__save-code--large" v-model="saveCode"/>
          </label>
          <br/>
          <div
            class="btn"
            @click="loadFromCode"
            v-tooltip="{
              content: 'Не найдено!',
              show: codeNotFoundTooltip,
              trigger: 'manual',
              placement: 'top',
            }"
          >ЗАГРУЗИТЬ
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div
        class="player__injections"
        :class="{ 'player__injections--left': left, 'player__injections--right': !left }"
        v-show="showInjections"
      >
        <div class="player__injections-empty-top"></div>
        <div
          class="player__injections-list"
          :class="{ 'player__injections-list--left': left, 'player__injections-list--right': !left }"
        >
          <div>
            <div class="price">
              <span>{{pl.injUsed}}/{{200}}</span>
            </div>
            <div class="gold-price">
              <span>{{pl.injgUsed}}/{{200}}</span>
            </div>
          </div>
          <InjectionInput
            :commonCount.sync="vm.inj.str"
            :goldCount.sync="vm.injg.str"
            :src="getInjectionSrc('ISila.png')"
            :name="'Инъекция силы'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.spd"
            :goldCount.sync="vm.injg.spd"
            :src="getInjectionSrc('ISkorost.png')"
            :name="'Инъекция скорости'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.cnt"
            :goldCount.sync="vm.injg.cnt"
            :src="getInjectionSrc('ICounterPunch.png')"
            :name="'Инъекция контратаки'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.tch"
            :goldCount.sync="vm.injg.tch"
            :src="getInjectionSrc('ITochnost.png')"
            :name="'Инъекция точности'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.msh"
            :goldCount.sync="vm.injg.msh"
            :src="getInjectionSrc('IMoshnost.png')"
            :name="'Инъекция мощности'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.zhv"
            :goldCount.sync="vm.injg.zhv"
            :src="getInjectionSrc('IZhivuchest.png')"
            :name="'Инъекция живучести'"
          ></InjectionInput>
          <div></div>
          <div></div>
          <InjectionInput
            :commonCount.sync="vm.inj.klb"
            :goldCount.sync="vm.injg.klb"
            :src="getInjectionSrc('IKulBoy.png')"
            :name="'Инъекция кулачного боя'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.zsc"
            :goldCount.sync="vm.injg.zsc"
            :src="getInjectionSrc('IZaschita.png')"
            :name="'Инъекция защиты'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.vld"
            :goldCount.sync="vm.injg.vld"
            :src="getInjectionSrc('IVlOruzhiem.png')"
            :name="'Инъекция владения оружием'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.mtk"
            :goldCount.sync="vm.injg.mtk"
            :src="getInjectionSrc('IMetkost.png')"
            :name="'Инъекция меткости'"
          ></InjectionInput>
          <div></div>
          <InjectionInput
            :commonCount.sync="vm.inj.aspd"
            :goldCount.sync="vm.injg.aspd"
            :src="getInjectionSrc('IAntiSkorost.png')"
            :name="'Инъекция антискорости'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.acnt"
            :goldCount.sync="vm.injg.acnt"
            :src="getInjectionSrc('IAntiCounterPunch.png')"
            :name="'Инъекция антиконтратаки'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.atch"
            :goldCount.sync="vm.injg.atch"
            :src="getInjectionSrc('IAntiTochnost.png')"
            :name="'Инъекция антиточности'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.amsh"
            :goldCount.sync="vm.injg.amsh"
            :src="getInjectionSrc('IAntiMoshnost.png')"
            :name="'Инъекция антимощности'"
          ></InjectionInput>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <InjectionInput
            :commonCount.sync="vm.inj.aspdp"
            :goldCount.sync="vm.injg.aspdp"
            :src="getInjectionSrc('IAntiSkorostProt.png')"
            :name="'Инъекция антискорости противника'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.acntp"
            :goldCount.sync="vm.injg.acntp"
            :src="getInjectionSrc('IAntiCounterPunchProt.png')"
            :name="'Инъекция антиконтратаки противника'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.atchp"
            :goldCount.sync="vm.injg.atchp"
            :src="getInjectionSrc('IAntiTochnostProt.png')"
            :name="'Инъекция антиточности противника'"
          ></InjectionInput>
          <InjectionInput
            :commonCount.sync="vm.inj.amshp"
            :goldCount.sync="vm.injg.amshp"
            :src="getInjectionSrc('IAntiMoshnostProt.png')"
            :name="'Инъекция антимощности противника'"
          ></InjectionInput>
          <div></div>
          <div></div>
          <div></div>
          <InjectionInput
            :commonCount.sync="vm.inj.proch"
            :goldCount.sync="vm.injg.proch"
            :src="getInjectionSrc('IProchnost.png')"
            :name="'Инъекция прочности'"
          ></InjectionInput>
          <div>
            <img
              class="player__inj player__inj--besh"
              :src="getInjectionSrc('IBesh.png')"
              alt="Инъекция бешенства"
              title="Инъекция бешенства"
            />
            <input type="checkbox" v-model="vm.besh" class="player__inj-checkbox--besh"/>
          </div>
        </div>
      </div>
    </transition>
    <div
      class="player__stats"
      :class="{ 'player__stats--left': left, 'player__stats--right': !left }"
    >
      <div>
        <div>
          <select v-model.number="vm.prof" class="input--large">
            <option value="1">Пехотинец</option>
            <option value="2">Инженер</option>
            <option value="3">Спецназ</option>
            <option value="4">Пилот</option>
          </select>
        </div>
      </div>
      <div>
        <div>
          <input v-model.number="lvl" type="number" min="0" max="20"/>
        </div>
      </div>
      <div>
        <div>
          <input v-model.number="exp" type="number" min="0" step="100" class="input--large"/>
        </div>
      </div>
      <div>
        <div>
          <span>{{vm.st.str+vm.st.spd+vm.st.cnt+vm.st.tch+vm.st.msh+vm.st.zhv+vm.st.eng}}/{{pl.ds}}</span>
        </div>
      </div>
      <div>
        <div>
          <input v-model.number="vm.st.str" type="number" min="0"/>
        </div>
        <div>
          <span>{{pl.str}}</span>
        </div>
      </div>
      <div>
        <div>
          <input v-model.number="vm.st.spd" type="number" min="0"/>
        </div>
        <div>
          <span>{{pl.spd}}</span>
        </div>
      </div>
      <div>
        <div>
          <input v-model.number="vm.st.cnt" type="number" min="0"/>
        </div>
        <div>
          <span>{{pl.cnt}}</span>
        </div>
      </div>
      <div>
        <div>
          <input v-model.number="vm.st.tch" type="number" min="0"/>
        </div>
        <div>
          <span>{{pl.tch}}</span>
        </div>
      </div>
      <div>
        <div>
          <input v-model.number="vm.st.msh" type="number" min="0"/>
        </div>
        <div>
          <span>{{pl.msh}}</span>
        </div>
      </div>
      <div>
        <div>
          <input v-model.number="vm.st.zhv" type="number" min="0"/>
        </div>
        <div>
          <span>{{pl.zhv}}</span>
        </div>
      </div>
      <div>
        <div>
          <input v-model.number="vm.st.eng" type="number" min="0"/>
        </div>
        <div>
          <span>{{pl.eng}}</span>
        </div>
      </div>
      <div>
        <div>
          <span>{{vm.st.aspd+vm.st.acnt+vm.st.atch+vm.st.amsh+vm.st.mtk+vm.st.vld+vm.st.zsc+vm.st.klb}}/{{pl.dmst}}</span>
        </div>
      </div>
      <div>
        <div>
          <input
            :value="vm.st.klb * 5"
            @input="vm.st.klb = $event.target.value / 5"
            type="number"
            min="0"
            step="5"
          />
        </div>
        <div>
          <span>{{pl.klb*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <input
            :value="vm.st.zsc * 5"
            @input="vm.st.zsc = $event.target.value / 5"
            type="number"
            min="0"
            step="5"
          />
        </div>
        <div>
          <span>{{pl.zsc*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <input
            :value="vm.st.vld * 5"
            @input="vm.st.vld = $event.target.value / 5"
            type="number"
            min="0"
            step="5"
          />
        </div>
        <div>
          <span>{{pl.vld*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <input
            :value="vm.st.mtk * 5"
            @input="vm.st.mtk = $event.target.value / 5"
            type="number"
            min="0"
            step="5"
          />
        </div>
        <div>
          <span>{{pl.mtk*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <span>{{vm.st.aspd+vm.st.acnt+vm.st.atch+vm.st.amsh+vm.st.mtk+vm.st.vld+vm.st.zsc+vm.st.klb}}/{{pl.dmst}}</span>
        </div>
      </div>
      <div>
        <div>
          <input
            :value="vm.st.aspd * 5"
            @input="vm.st.aspd = $event.target.value / 5"
            type="number"
            min="0"
            step="5"
          />
        </div>
        <div>
          <span>{{pl.aspd*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <input
            :value="vm.st.acnt * 5"
            @input="vm.st.acnt = $event.target.value / 5"
            type="number"
            min="0"
            step="5"
          />
        </div>
        <div>
          <span>{{pl.acnt*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <input
            :value="vm.st.atch * 5"
            @input="vm.st.atch = $event.target.value / 5"
            type="number"
            min="0"
            step="5"
          />
        </div>
        <div>
          <span>{{pl.atch*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <input
            :value="vm.st.amsh * 5"
            @input="vm.st.amsh = $event.target.value / 5"
            type="number"
            min="0"
            step="5"
          />
        </div>
        <div>
          <span>{{pl.amsh*5}}%</span>
        </div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div>
          <span>-{{pl.klbp*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <span>-{{pl.zscp*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <span>-{{pl.vldp*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <span>-{{pl.mtkp*5}}%</span>
        </div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div>
          <span>-{{pl.aspdp*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <span>-{{pl.acntp*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <span>-{{pl.atchp*5}}%</span>
        </div>
      </div>
      <div>
        <div>
          <span>-{{pl.amshp*5}}%</span>
        </div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div>
          <span>+{{pl.exp}}%</span>
        </div>
      </div>
      <div>
        <div>
          <span>+{{pl.tb}}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Prop, Emit, Watch} from 'vue-property-decorator';

  import InjectionInput from './InjectionInput.vue';

  import _ from 'lodash';
  import axios from 'axios';
  import uuid from 'uuid';

  import DollVM from '../core/models/doll-vm';
  import Player from '../core/models/player';
  import StartStats from '../core/models/start-stats';
  import DollVMInjections from '../core/models/doll-vm-injections';
  import Stats from '../core/models/stats';
  import Slot from '../core/models/slot';

  import Data from '../data/data';
  import config from '../config';

  @Component({
    components: {
      InjectionInput,
    },
  })
  export default class Doll extends Vue {
    @Prop()
    public left!: boolean;
    @Prop()
    public num!: number;
    public vm = new DollVM();

    public showInjections = false;
    public showShare = false;
    public saveCode = '';
    public saveToCodeTooltip = false;
    public codeNotFoundTooltip = false;

    public clothesSlots: Slot[] = [
      {title: 'Правая рука', class: 'slot slot--righthand'},
      {title: 'Левая рука', class: 'slot slot--lefthand'},
      {title: 'Корпус', class: 'slot slot--armor'},
      {title: 'Реактор', class: 'slot slot--helmet'},
      {title: 'Усилитель рук', class: 'slot slot--gloves'},
      {title: 'Экзоскелет', class: 'slot slot--boots'},
      {title: 'Резервуар', class: 'slot slot--belt'},
      {title: 'Процессор', class: 'slot slot--amulet'},
      {title: 'Мутаген', class: 'slot slot--ring1'},
      {title: 'Мутаген', class: 'slot slot--ring2'},
      {title: 'Мутаген', class: 'slot slot--ring3'},
      {title: 'Мутаген', class: 'slot slot--ring4'},
    ];
    public chipSlots: Slot[] = [
      {title: 'Чип правой руки', class: 'chipslot slot--righthand'},
      {title: 'Чип левой руки', class: 'chipslot slot--lefthand'},
      {title: 'Чип корпуса', class: 'chipslot slot--armor'},
      {title: 'Чип реактора', class: 'chipslot slot--helmet'},
      {title: 'Чип усилителя рук', class: 'chipslot slot--gloves'},
      {title: 'Чип экзоскелета', class: 'chipslot slot--boots'},
      {title: 'Чип резервуара', class: 'chipslot slot--belt'},
      {title: 'Чип процессора', class: 'chipslot slot--amulet'},
      {title: 'Чип мутагена', class: 'chipslot slot--ring1'},
      {title: 'Чип мутагена', class: 'chipslot slot--ring2'},
      {title: 'Чип мутагена', class: 'chipslot slot--ring3'},
      {title: 'Чип мутагена', class: 'chipslot slot--ring4'},
    ];
    public superChipSlots: Slot[] = [
      {title: 'Суперчип', class: 'chipslot slot--super-chip2'},
      {title: 'Суперчип', class: 'chipslot slot--super-chip3'},
      {title: 'Суперчип', class: 'chipslot slot--super-chip1'},
      {title: 'Суперчип', class: 'chipslot slot--super-chip4'},
    ];

    get exp(): number {
      return this.vm.exp;
    }

    set exp(val) {
      const recs = Data.expTable.filter((r) => val >= r.exp).reverse();
      if (recs.length === 0) {
        this.vm.lvl = 0;
      } else {
        this.vm.lvl = recs[0].lvl;
      }

      this.vm.exp = val;
    }

    get lvl() {
      return this.vm.lvl;
    }

    set lvl(val) {
      const ind = Data.expTable.findIndex((r) => val === r.lvl && r.st === 3);
      if (ind === -1) {
        this.vm.exp = 0;
      } else {
        const recs = Data.expTable.filter((a, i) => i <= ind).reverse();
        this.vm.exp = recs[0].exp;
      }

      this.vm.lvl = val;
    }

    get pl(): Player {
      const pl = new Player();
      const stats = new Stats();
      pl.prof = this.vm.prof;

      // стартовые статы
      const startStats = new StartStats(this.lvl, this.vm.prof);
      _.forOwn(startStats, (v, k) => {
        _.set(pl, k, _.get(pl, k) + v);
      });

      // вкинутые статы
      _.forOwn(this.vm.st, (v, k) => {
        _.set(pl, k, _.get(pl, k) + v);
      });

      // суперчипы
      if (this.vm.pdalvl > 1) {
        _.each(this.vm.superchips, (s) => {
          if (s == null) {
            return;
          }

          const chip = Data.chips.find((ch) => ch.id === s);
          _.forOwn(stats, (v, k) => {
            _.set(pl, k, _.get(pl, k) + _.get(chip, k) * this.vm.pdalvl);
          });
        });
      }

      // одетые вещи
      _.forOwn(this.vm.clothes, (c, s) => {
        if (c == null) {
          _.set(pl.clothes, s, null);
          return;
        }

        const clothes = Data.clothes.find((cl) => cl.cid === c);
        if (!clothes) {
          _.set(pl.clothes, s, null);
          return;
        }

        _.set(pl.clothes, s, clothes);

        _.forOwn(stats, (v, k) => {
          _.set(pl, k, _.get(pl, k) + _.get(clothes, k));
        });

        // цена вещей
        if (clothes.ing) {
          pl.prcg += clothes.prc;
        } else {
          pl.prc += clothes.prc;
        }
      });

      // одетые чипы
      _.each(this.vm.chips, (c) => {
        if (c == null) {
          return;
        }

        const chip = Data.chips.find((ch) => ch.id === c);
        _.forOwn(stats, (v, k) => {
          _.set(pl, k, _.get(pl, k) + _.get(chip, k));
        });
      });

      // бешенка
      if (this.vm.besh) {
        _.forOwn(stats, (v, k) => {
          _.set(pl, k, _.round(_.get(pl, k) * 1.5));
        });
      }

      // прочности
      pl.ha += this.vm.inj.proch * 10;
      pl.ba += this.vm.inj.proch * 10;
      pl.fa += this.vm.inj.proch * 10;
      pl.lha += this.vm.inj.proch * 10;
      pl.rha += this.vm.inj.proch * 10;

      // прочности
      pl.ha += this.vm.injg.proch * 10;
      pl.ba += this.vm.injg.proch * 10;
      pl.fa += this.vm.injg.proch * 10;
      pl.lha += this.vm.injg.proch * 10;
      pl.rha += this.vm.injg.proch * 10;

      // инъекции
      _.forOwn(this.vm.inj, (v, k) => {
        if (_.has(pl, k)) {
          _.set(pl, k, _.get(pl, k) + v * 10);
        }
      });
      _.forOwn(this.vm.inj, (v) => {
        pl.injUsed += v;
      });

      // инъекции золотые
      _.forOwn(this.vm.injg, (v, k) => {
        if (_.has(pl, k)) {
          _.set(pl, k, _.get(pl, k) + v * 10);
        }
      });
      _.forOwn(this.vm.injg, (v) => {
        pl.injgUsed += v;
      });

      // бонус от приватной комнаты
      if (this.vm.privatelvl > 0) {
        _.set(pl, this.vm.privatestat, _.get(pl, this.vm.privatestat) + 20 + this.vm.privatelvl * 10);
      }

      // лимиты по статам
      const recs = Data.expTable.filter((r) => this.vm.exp >= r.exp).reverse();
      if (recs.length !== 0) {
        pl.ds = recs.reduce((a, c) => a + c.st, 0);
        pl.dmst = recs.reduce((a, c) => a + c.mst, 0);
      }

      // урон оружия
      const leftWeap = this.vm.clothes[1] ? Data.clothes.find((cl) => cl.cid === this.vm.clothes[1]) : null;
      const rightWeap = this.vm.clothes[0] ? Data.clothes.find((cl) => cl.cid === this.vm.clothes[0]) : null;

      let lmiu = (leftWeap && (leftWeap.ac ? Math.floor(leftWeap.miu / 2) : leftWeap.miu)) || 0;
      let lmau = (leftWeap && (leftWeap.ac ? Math.floor(leftWeap.mau / 2) : leftWeap.mau)) || 0;
      let rmiu = (rightWeap && (rightWeap.ac ? Math.floor(rightWeap.miu / 2) : rightWeap.miu)) || 0;
      let rmau = (rightWeap && (rightWeap.ac ? Math.floor(rightWeap.mau / 2) : rightWeap.mau)) || 0;

      lmiu += leftWeap && leftWeap.fe ? Math.floor((pl.str * (leftWeap.fe || 0)) / 100) : pl.str;
      lmau += leftWeap && leftWeap.fe ? Math.floor((pl.str * (leftWeap.fe || 0)) / 100) : pl.str;
      rmiu += rightWeap && rightWeap.fe ? Math.floor((pl.str * (rightWeap.fe || 0)) / 100) : pl.str;
      rmau += rightWeap && rightWeap.fe ? Math.floor((pl.str * (rightWeap.fe || 0)) / 100) : pl.str;

      pl.ldmg = lmiu + '-' + lmau;
      pl.rdmg = rmiu + '-' + rmau;
      pl.ldmgc = Math.floor(lmiu * 1.5) + '-' + Math.floor(lmau * 1.5);
      pl.rdmgc = Math.floor(rmiu * 1.5) + '-' + Math.floor(rmau * 1.5);

      // урон оружия для рейта, всегда полный
      const plusStats = Math.floor(
        (((leftWeap && leftWeap.miu) || 0) +
          ((leftWeap && leftWeap.mau) || 0) +
          ((rightWeap && rightWeap.miu) || 0) +
          ((rightWeap && rightWeap.mau) || 0))
        / 4);

      // рейтинг
      let statSum = plusStats;
      _.forOwn(stats, (v, k) => {
        if (k === 'ha' || k === 'ba' || k === 'fa') {
          statSum += _.get(pl, k) / 5;
        } else if (k === 'rha' || k === 'lha') {
          statSum += _.get(pl, k) / 10;
        } else {
          statSum += _.get(pl, k);
        }
      });
      pl.rate = (statSum * (0.215 * this.vm.lvl + 1.422)) / 10;

      // стоимость инъекций
      _.each(['str', 'spd', 'cnt', 'tch', 'msh', 'zhv'], (k) => {
        pl.injPrc += _.get(this.vm.inj, k) * 5;
      });
      _.each(['klb', 'zsc', 'vld', 'mtk'], (k) => {
        pl.injPrc += _.get(this.vm.inj, k) * 15;
      });
      _.each(['aspd', 'acnt', 'atch', 'amsh'], (k) => {
        pl.injPrc += _.get(this.vm.inj, k) * 10;
      });
      _.each(['aspdp', 'acntp', 'atchp', 'amshp'], (k) => {
        pl.injPrc += _.get(this.vm.inj, k) * 10;
      });
      pl.injPrc += this.vm.inj.proch * 10;

      // бонус кланового чемпионата
      if (this.vm.chemplvl > 0) {
        pl.injPrc = pl.injPrc * (1 - (11 - this.vm.chemplvl) * 0.01);
      }

      // стоимость золотых инъекций
      _.each(['str', 'spd', 'cnt', 'tch', 'msh', 'zhv'], (k) => {
        pl.injPrcg += _.get(this.vm.injg, k) * 2;
      });
      _.each(['klb', 'zsc', 'vld', 'mtk'], (k) => {
        pl.injPrcg += _.get(this.vm.injg, k) * 5;
      });
      _.each(['aspd', 'acnt', 'atch', 'amsh'], (k) => {
        pl.injPrcg += _.get(this.vm.injg, k) * 4;
      });
      _.each(['aspdp', 'acntp', 'atchp', 'amshp'], (k) => {
        pl.injPrcg += _.get(this.vm.injg, k) * 4;
      });
      pl.injPrcg += this.vm.injg.proch * 5;
      pl.injPrcg += this.vm.besh ? 100 : 0;

      // бонус кланового чемпионата
      if (this.vm.chemplvl > 0) {
        pl.prc = pl.prc * (1 - (11 - this.vm.chemplvl) * 0.01);
      }


      return pl;
    }

    public clearSlots() {
      this.vm.clothes = [null, null, null, null, null, null, null, null, null, null, null, null];
      this.vm.chips = [null, null, null, null, null, null, null, null, null, null, null, null];
    }

    public clearAll() {
      this.vm = new DollVM();
    }

    public resetInjections() {
      this.vm.inj = new DollVMInjections();
      this.vm.injg = new DollVMInjections();
      this.vm.besh = false;
    }

    public clearChipSlot(slot: number) {
      if (slot === -1) {
        _.each(this.vm.chips, (v, k) => {
          Vue.set(this.vm.chips, k, null);
        });
      } else if (slot <= -2) {
        Vue.set(this.vm.superchips, -slot - 2, null);
      } else {
        Vue.set(this.vm.chips, slot, null);
      }
    }

    public chipIns(chipId: number, slot: number) {
      if (slot === -1) {
        _.each(this.vm.chips, (v, k) => {
          Vue.set(this.vm.chips, k, chipId);
        });
      } else if (slot <= -2) {
        Vue.set(this.vm.superchips, -slot - 2, chipId);
      } else {
        Vue.set(this.vm.chips, slot, chipId);
      }
    }

    public clothesDress(lastSlot: number, id: number) {
      const cloth = Data.clothes.find((c) => c.cid === id);
      if (!cloth) {
        return;
      }
      if (cloth.ith) {
        if (lastSlot === 0) {
          this.clothesTakeOff(1);
          this.clearChipSlot(1);
        } else {
          this.clothesTakeOff(0);
          this.clearChipSlot(0);
        }
      }
      Vue.set(this.vm.clothes, lastSlot, id);
    }

    public clothesTakeOff(lastSlot: number) {
      Vue.set(this.vm.clothes, lastSlot, null);
    }

    public clothesTakeOffById(id: number) {
      const ind = this.vm.clothes.findIndex((cl) => cl === id);
      if (ind !== -1) {
        Vue.set(this.vm.clothes, ind, null);
      }
    }

    public getClothesSrc(id: number): string {
      const cloth = Data.clothes.find((c) => c.cid === id);
      return cloth ? `${config.gameUrl}/Images/Clothes/${cloth.src}` : require('../assets/img/i.gif');
    }

    public getInjectionSrc(src: string): string {
      return `${config.gameUrl}/Images/Clothes/${src}`;
    }

    public getDollHash(): string {
      return btoa(JSON.stringify(this.vm));
    }

    public loadDollFromHash(hash: string) {
      try {
        this.vm = JSON.parse(atob(hash));
      } catch (e) {
        console.error('cant load doll from hash', hash);
      }
    }

    public saveToCode() {
      const hash = uuid.v4().replace(/-/g, '');
      const doll = this.vm;
      const named = Data.getNamedClothes();
      const data = btoa(encodeURIComponent(JSON.stringify({doll, named})));
      this.copyToClipboard(hash);
      axios
        .post(`${config.helperUrl}/api/minimize/min`, {data, hash})
        .then(() => {
          this.saveToCodeTooltip = true;
          setTimeout(() => this.saveToCodeTooltip = false, 3000);
        })
        .catch((e) => console.error(e));
    }

    public loadFromCode() {
      axios
        .get(`${config.helperUrl}/api/minimize/get?hash=${this.saveCode}`)
        .then((r) => {
          if (!r.data) {
            this.codeNotFoundTooltip = true;
            setTimeout(() => this.codeNotFoundTooltip = false, 3000);
            return;
          }

          const data = JSON.parse(decodeURIComponent(atob(r.data)));
          this.vm = data.doll;
          const changes: any[] = [];

          _.each(data.named, (n) => {
            const hash = JSON.stringify(n);
            const exists = Data.clothes.find((cl) => JSON.stringify(cl) === hash);
            if (exists != null) {
              changes.push({before: n.cid, after: exists.cid});
            } else {
              Data.clothes.push(n);
            }
          });

          _.each(changes, (c) => {
            const ind = this.vm.clothes.findIndex((cl) => cl != null && cl === c.before);
            this.vm.clothes[ind] = c.after;
          });
        })
        .catch((e) => console.error(e));
    }

    public copyToClipboard(str: string) {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }

    @Emit('clone-doll')
    public cloneDoll(left: boolean) {
    }

    @Emit('show-clothes-menu')
    public showClothesMenu(event: MouseEvent, slot: number, doll: number, chemplvl: number) {
    }

    @Emit('show-clothes-popup')
    public showClothesPopup(event: MouseEvent, clothesId: number, chemplvl: number) {
    }

    @Emit('hide-clothes-popup')
    public hideClothesPopup() {
    }

    @Emit('show-chip-menu')
    public showChipMenu(event: MouseEvent, slot: number, doll: number) {
    }

    @Emit('show-chip-popup')
    public showChipPopup(event: MouseEvent, chipId: number) {
    }

    @Emit('hide-chip-popup')
    public hideChipPopup() {
    }

    @Watch('vm.pdalvl')
    private onPdaChanged(lvl: number) {
      switch (lvl) {
        case 0:
        case 1:
          this.vm.superchips.length = 0;
          break;
        case 2:
          this.vm.superchips.length = 2;
          break;
        case 3:
          this.vm.superchips.length = 4;
          break;
      }
    }

    private created() {
      Data.getDollFromStorage(this.num, (vm) => {
        if (vm != null) {
          this.vm = vm;
        }
      });
    }

    private getSlotsSrc(): string {
      return `${config.gameUrl}/Images/slots_new.png`;
    }

    @Watch('vm', {deep: true})
    private onDollChanged(doll: DollVM) {
      Data.saveDollToStorage(doll, this.num);
    }

  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .player {
    &__doll {
      width: 315px;
      flex-basis: 315px;
      flex-grow: 0;
      flex-shrink: 0;
    }

    &__doll--left {
      margin-right: 20px;
    }

    &__doll--right {
      margin-left: 20px;
    }

    &__slots {
      position: relative;
      height: 400px;
    }

    &__buttons {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    &__buttons > * {
      flex-basis: 50%;
    }
  }

  .slot {
    position: absolute;
    width: 55px;
    height: 55px;
    border: 1px solid var(--border);
  }

  .chipslot {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 1px solid var(--border);
  }

  .slot--righthand {
    left: 218px;
    top: 132px;
  }

  .slot--lefthand {
    left: 41px;
    top: 132px;
  }

  .slot--armor {
    left: 41px;
    top: 76px;
  }

  .slot--helmet {
    left: 190px;
    top: 16px;
  }

  .slot--gloves {
    left: 218px;
    top: 76px;
  }

  .slot--boots {
    left: 203px;
    top: 312px;
  }

  .slot--belt {
    left: 56px;
    top: 312px;
  }

  .slot--amulet {
    left: 69px;
    top: 16px;
  }

  .slot--ring1 {
    left: 50px;
    top: 194px;
  }

  .slot--ring2 {
    left: 209px;
    top: 194px;
  }

  .slot--ring3 {
    left: 50px;
    top: 250px;
  }

  .slot--ring4 {
    left: 209px;
    top: 250px;
  }

  .slot--super-chip1 {
    width: 12px;
    height: 12px;
    top: 354px;
    left: 121px;
  }

  .slot--super-chip2 {
    width: 12px;
    height: 12px;
    top: 354px;
    left: 141px;
  }

  .slot--super-chip3 {
    width: 12px;
    height: 12px;
    top: 354px;
    left: 161px;
  }

  .slot--super-chip4 {
    width: 12px;
    height: 12px;
    top: 354px;
    left: 181px;
  }

  .chipslot--master-chip {
    left: 25px;
    top: 25px;
    background-color: var(--dark-back);
  }

  .player__armor-slots {
    position: absolute;
    left: 109px;
    top: 132px;
    width: 100px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }

  .player__armor-slot {
    background-color: var(--btn-border);
    border: solid 1px var(--border);
    width: 30px;
    margin: 1px;
  }

  .player__l-dmg {
    position: absolute;
    left: -9px;
    top: 192px;
    text-align: right;
    width: 56px;
    font-size: 10px;
  }

  .player__r-dmg {
    position: absolute;
    right: -9px;
    top: 192px;
    text-align: left;
    width: 56px;
    font-size: 10px;
  }

  .player__crit {
    color: $hp;
  }

  .player__rate {
    position: absolute;
    left: 274px;
    top: 32px;
  }

  .player__hp {
    position: absolute;
    left: 274px;
    top: 370px;
    color: $hp;
  }

  .player__energy {
    position: absolute;
    left: 22px;
    top: 370px;
    color: $gold;
  }

  .player__info select,
  .player__injections-info select {
    margin-left: 5px;
  }

  .price {
    color: $price;
  }

  .gold-price {
    color: $gold !important;
  }

  .player__save-code--large {
    width: 250px;
    margin-bottom: 4px;
  }

  .player__stats {
    flex-basis: 90px;
    flex-grow: 0;
    flex-shrink: 0;

    &--left > div {
      flex-direction: row;
    }

    &--right > div {
      flex-direction: row-reverse;
    }

    > div {
      width: 90px;
      height: 24px;
      display: flex;
      flex-wrap: nowrap;

      > div {
        flex-basis: 50%;
      }

      .input--large {
        width: 80px;
      }
    }
  }

  .player__injections {
    width: 130px;
    flex-basis: 130px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .player__injections--left {
    margin-right: 20px;
  }

  .player__injections--right {
    margin-left: 20px;
  }

  .player__injections-empty-top {
    height: 72px;
  }

  .player__inj--besh {
    width: 18px;
    height: 18px;
    margin: 1px 5px;
    border: 1px solid var(--border);
    margin-left: 56px !important;
  }

  .player__inj-checkbox--besh {
    margin-right: 10px;
  }

  .player__injections-list > div {
    width: 130px;
    height: 24px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
</style>
