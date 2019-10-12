<template>
  <div class="battle row mt-20">
    <div>
      Персонаж {{leftPlayerNum}}
      <BattleTrigger class="mt-20" ref="battleTrigger1" v-show="leftPlayerNum === 1" :num="1"></BattleTrigger>
      <BattleTrigger class="mt-20" ref="battleTrigger2" v-show="leftPlayerNum === 2" :num="2"></BattleTrigger>
      <BattleTrigger class="mt-20" ref="battleTrigger3" v-show="leftPlayerNum === 3" :num="3"></BattleTrigger>
      <BattleTrigger class="mt-20" ref="battleTrigger4" v-show="leftPlayerNum === 4" :num="4"></BattleTrigger>
      <BattleTrigger class="mt-20" ref="battleTrigger5" v-show="leftPlayerNum === 5" :num="5"></BattleTrigger>
      <BattleStats class="mt-20" :pl="leftPlayer" :hp="hpLeft"></BattleStats>
    </div>
    <div class="battle__mid">
      <img src="../assets/img/map.png" alt="Карта боя" class="battle__map"/>
      <div>
        <div class="battle_buttons mt-20">
          <button class="btn" @click="round">РАУНД</button>
          <button class="btn" @click="clear">СБРОСИТь</button>
        </div>
        <div class="battle__log mt-20" v-show="rounds.length > 0">
          <div v-for="round in rounds.slice().reverse()" :key="round.num">
            <b>Раунд {{round.num}}</b>
            <br/>
            <div v-for="step in round.steps.slice().reverse()" :key="step.num">
              <template v-if="step.stepType === 1">
                <div>
                  <span class="battle-step__part--time mr-3">{{time()}}</span>
                  <span>Бой окончен.</span>
                </div>
                <div v-if="hpLeft <= 0">
                  <span class="battle-step__part--time mr-3">{{time()}}</span>
                  <span class="battle-step__part--player1 mr-3">Персонаж {{leftPlayerNum}}</span>
                  <span>убит.</span>
                </div>
                <div v-if="hpRight <= 0">
                  <span class="battle-step__part--time mr-3">{{time()}}</span>
                  <span class="battle-step__part--player2 mr-3">Персонаж {{rightPlayerNum}}</span>
                  <span>убит.</span>
                </div>
              </template>
              <template v-if="step.stepType === 2">
                <span class="battle-step__part--time mr-3">{{step.time}}</span>
                <span
                  class="mr-3"
                  :class="{ 'battle-step__part--player2': !step.puncherILS, 'battle-step__part--player1': step.puncherILS }"
                >{{step.puncher}}</span>
                <b class="mr-3">({{step.puncherHpBefore}}->{{step.puncherHpAfter}})</b>
                <span class="mr-3">получил {{step.uron}} жизни.</span>
              </template>
              <template v-if="step.stepType === 3">
                <span class="battle-step__part--time mr-3">{{step.time}}</span>
                <span
                  class="mr-3"
                  :class="{ 'battle-step__part--player2': !step.puncherILS, 'battle-step__part--player1': step.puncherILS }"
                >{{step.puncher}}</span>
                <span class="mr-3">нанес урон</span>
                <span
                  class="mr-3"
                  :class="{ 'battle-step__part--player2': !step.targetILS, 'battle-step__part--player1': step.targetILS }"
                >{{step.target}}</span>
                <b class="mr-3">({{step.targetHpBefore}}->{{step.targetHpAfter}})</b>
                <span>на {{step.uron}}.</span>
              </template>
              <template v-if="step.isAvoided && step.stepType === 0">
                <span class="battle-step__part--time mr-3">{{step.time}}</span>
                <span
                  class="mr-3"
                  :class="{ 'battle-step__part--player2': !step.targetILS, 'battle-step__part--player1': step.targetILS }"
                >{{step.target}}</span>
                <b class="mr-3">({{step.targetHpBefore}}->{{step.targetHpAfter}})</b>
                <span class="battle-step__part--evade mr-3">отпрыгнул в сторону</span>
                <span class="mr-3">от удара</span>
                <span
                  class="mr-3"
                  :class="{ 'battle-step__part--player2': !step.puncherILS, 'battle-step__part--player1': step.puncherILS }"
                >{{step.puncher}}</span>
                <b class="mr-3">({{step.puncherHpBefore}}->{{step.puncherHpAfter}})</b>
                <span>{{step.point}}.</span>
                <br/>
              </template>
              <template v-if="step.isBlocked && step.stepType === 0">
                <span class="battle-step__part--time mr-3">{{step.time}}</span>
                <span
                  class="mr-3"
                  :class="{ 'battle-step__part--player2': !step.targetILS, 'battle-step__part--player1': step.targetILS }"
                >{{step.target}}</span>
                <b class="mr-3">({{step.targetHpBefore}}->{{step.targetHpAfter}})</b>
                <span class="mr-3">заблокировал удар</span>
                <span
                  class="mr-3"
                  :class="{ 'battle-step__part--player2': !step.puncherILS, 'battle-step__part--player1': step.puncherILS }"
                >{{step.puncher}}</span>
                <b class="mr-3">({{step.puncherHpBefore}}->{{step.puncherHpAfter}})</b>
                <span>{{step.point}}</span>
                <template v-if="step.isCounter">
                  <span class="mr-3">
                    и
                    <span class="battle-step__part--counter">контратаковал</span> на
                  </span>
                  <span>на {{step.counter}}</span>
                </template>
                <span>.</span>
                <br/>
              </template>
              <template v-if="!step.isAvoided && !step.isBlocked && step.stepType === 0">
                <span class="battle-step__part--time mr-3">{{step.time}}</span>
                <span
                  class="mr-3"
                  :class="{ 'battle-step__part--player2': !step.puncherILS, 'battle-step__part--player1': step.puncherILS }"
                >{{step.puncher}}</span>
                <b class="mr-3">({{step.puncherHpBefore}}->{{step.puncherHpAfter}})</b>
                <span class="mr-3">нанес</span>
                <span class="battle-step__part--crit mr-3" v-if="step.isTochny">точный</span>
                <span class="battle-step__part--mosh mr-3" v-if="step.isMoshny">мощный</span>
                <span class="mr-3">удар</span>
                <span
                  class="mr-3"
                  :class="{ 'battle-step__part--player2': !step.targetILS, 'battle-step__part--player1': step.targetILS }"
                >{{step.target}}</span>
                <b class="mr-3">({{step.targetHpBefore}}->{{step.targetHpAfter}})</b>
                <span>{{step.point}} на {{step.uron}}</span>
                <template v-if="step.isCounter">
                  <span class="mr-3">, но</span>
                  <span class="battle-step__part--counter mr-3">получил в ответ</span>
                  <span>на {{step.counter}}</span>
                </template>
                <span>.</span>
                <br/>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      Персонаж {{rightPlayerNum}}
      <BattleTrigger class="mt-20" ref="battleTrigger6" v-show="rightPlayerNum === 1" :num="6"></BattleTrigger>
      <BattleTrigger class="mt-20" ref="battleTrigger7" v-show="rightPlayerNum === 2" :num="7"></BattleTrigger>
      <BattleTrigger class="mt-20" ref="battleTrigger8" v-show="rightPlayerNum === 3" :num="8"></BattleTrigger>
      <BattleTrigger class="mt-20" ref="battleTrigger9" v-show="rightPlayerNum === 4" :num="9"></BattleTrigger>
      <BattleTrigger class="mt-20" ref="battleTrigger10" v-show="rightPlayerNum === 5" :num="10"></BattleTrigger>
      <BattleStats class="mt-20" :pl="rightPlayer" :hp="hpRight"></BattleStats>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import BattleRound from '../core/models/battle-round';
  import {Prop, Watch} from 'vue-property-decorator';
  import _ from 'lodash';
  import moment from 'moment';
  import Player from '@/core/models/player';
  import Doll from './Doll.vue';
  import BattleStats from './BattleStats.vue';
  import BattleTrigger from './BattleTrigger.vue';
  import BattleStep from '../core/models/battle-step';

  @Component({
    components: {
      BattleStats,
      BattleTrigger,
    },
  })
  export default class Battle extends Vue {
    public rounds: BattleRound[] = [];
    @Prop()
    public leftPlayerNum!: number;
    @Prop()
    public rightPlayerNum!: number;
    private lastRoundNum = 1;
    private hpLeft = this.leftPlayer.zhv * 5;
    private hpRight = this.rightPlayer.zhv * 5;
    private battleEnded = false;

    private points = [
      '',
      'по голове',
      'по корпусу',
      'по ногам',
      'по левой руке',
      'по правой руке',
    ];


    get leftPlayer() {
      const doll = (this.$parent.$refs['doll' + this.leftPlayerNum] as Doll);
      return doll != null ? doll.pl : new Player();
    }

    get leftBattleTriggers() {
      return (this.$refs['battleTrigger' + this.leftPlayerNum] as BattleTrigger);
    }

    get rightPlayer() {
      const doll = (this.$parent.$refs['doll' + (this.rightPlayerNum + 5)] as Doll);
      return doll != null ? doll.pl : new Player();
    }

    get rightBattleTriggers() {
      return (this.$refs['battleTrigger' + (this.rightPlayerNum + 5)] as BattleTrigger);
    }

    public round() {
      if (this.battleEnded) {
        return;
      }

      const r = new BattleRound();
      r.num = this.lastRoundNum++;

      const leftPunchesAndBlocks = this.getPunchesAndBlocksCount(this.leftBattleTriggers.vm.tactic, this.leftPlayer);
      const rightPunchesAndBlocks = this.getPunchesAndBlocksCount(this.rightBattleTriggers.vm.tactic, this.rightPlayer);

      const leftPunches = this.getPunchPoints(leftPunchesAndBlocks[0]);
      const leftBlocks = this.getBlockPoints(leftPunchesAndBlocks[1]);

      const rightPunches = this.getPunchPoints(rightPunchesAndBlocks[0]);
      const rightBlocks = this.getBlockPoints(rightPunchesAndBlocks[1]);

      const steps: BattleStep[] = [];
      _.each(leftPunches, (p, i) => {
        steps.push(...this.punch(
          p,
          rightBlocks,
          this.leftPlayer,
          this.rightPlayer,
          this.leftPlayerNum,
          this.rightPlayerNum,
          true,
          (leftPunches.length === 1 ? _.random(0, 1) : i) === 0));
      });

      _.each(rightPunches, (p, i) => {
        steps.push(...this.punch(
          p,
          leftBlocks,
          this.rightPlayer,
          this.leftPlayer,
          this.rightPlayerNum,
          this.leftPlayerNum,
          false,
          (rightPunches.length === 1 ? _.random(0, 1) : i) === 0));
      });
      r.steps = steps;

      if (this.hpLeft <= 0 || this.hpRight <= 0) {
        this.battleEnded = true;
        const endStep: BattleStep = new BattleStep();
        endStep.stepType = 1;
        r.steps.push(endStep);
      }

      this.rounds.push(r);
    }

    public clear() {
      this.rounds = [];
      this.lastRoundNum = 1;
      this.battleEnded = false;
      this.hpLeft = this.leftPlayer.zhv * 5;
      this.hpRight = this.rightPlayer.zhv * 5;
    }

    private punch(
      p: number,
      targetBlocks: number[],
      puncher: Player,
      target: Player,
      puncherNum: number,
      targetNum: number,
      leftPlayer: boolean,
      leftHand: boolean)
      : BattleStep[] {

      const step = new BattleStep();
      step.time = moment().format('HH:mm');
      step.puncher = `Персонаж ${puncherNum}`;
      step.target = `Персонаж ${targetNum}`;
      step.point = this.points[p];
      step.puncherHpBefore = leftPlayer ? this.hpLeft : this.hpRight;
      step.puncherHpAfter = leftPlayer ? this.hpLeft : this.hpRight;
      step.targetHpBefore = !leftPlayer ? this.hpLeft : this.hpRight;
      step.targetHpAfter = !leftPlayer ? this.hpLeft : this.hpRight;
      step.puncherILS = leftPlayer;
      step.targetILS = !leftPlayer;

      let minUron = 0;
      let maxUron = 0;
      const rightWeapon = puncher.clothes[0];
      const leftWeapon = puncher.clothes[1];
      let currentWeapon = leftHand ? leftWeapon : rightWeapon;
      if (leftHand && !!rightWeapon && rightWeapon.ith) {
        currentWeapon = rightWeapon;
      }
      if (!leftHand && !!leftWeapon && leftWeapon.ith) {
        currentWeapon = leftWeapon;
      }

      if (!!currentWeapon) {
        minUron = currentWeapon.miu;
        maxUron = currentWeapon.mau;
      }

      let isAvoided = this.isProbil(this.getPercent(
        puncher.spd,
        target.spd,
        puncher.aspd,
        target.aspdp,
        puncher.aspdp,
        false,
        puncher.spd));

      if (isAvoided && _.random(1, 100) === 1) {
        isAvoided = false;
      }

      const targetZaschita = target.zsc;
      let zaschitaProt = puncher.zscp;
      if (zaschitaProt > 0 && _.random(1, 100) === 1) {
        zaschitaProt = 0;
      }

      const kulBoy = puncher.klb;
      let targetKulBoyProt = target.klbp;
      if (targetKulBoyProt > 0 && _.random(1, 100) === 1) {
        targetKulBoyProt = 0;
      }

      const vladenieOruzhiem = puncher.vld;
      let targetVladenieOruzhiemProt = target.vldp;
      if (targetVladenieOruzhiemProt > 0 && _.random(1, 100) === 1) {
        targetVladenieOruzhiemProt = 0;
      }

      const metkost = puncher.mtk;
      let targetMetkostProt = target.mtkp;
      if (targetMetkostProt > 0 && _.random(1, 100) === 1) {
        targetMetkostProt = 0;
      }

      const isTochny = this.isProbil(this.getPercent(
        puncher.tch,
        target.tch,
        puncher.atchp,
        target.atch,
        target.atchp,
        true,
        target.spd));

      const isMoshny = this.isProbil(this.getPercent(
        puncher.msh,
        target.msh,
        puncher.amshp,
        target.amsh,
        target.amshp,
        true,
        target.spd));

      let isPopal = false;
      const isShot = !!currentWeapon && !!currentWeapon.ms;
      if (isShot) {
        if (metkost - targetMetkostProt < 0) {
          isPopal = false;
        } else {
          isPopal = this.isProbil(metkost * 5 - targetMetkostProt * 5);
        }
      }

      if ((isAvoided && !isTochny && !isMoshny) || (isShot && !isPopal)) {
        step.isAvoided = true;
        return [step];
      }

      let uron = 0;
      if ((vladenieOruzhiem - targetVladenieOruzhiemProt) < 0) {
        uron = minUron;
      } else {
        uron = this.GetRandomValue(minUron, maxUron, vladenieOruzhiem * 5 - targetVladenieOruzhiemProt * 5);
      }

      if (!isShot) {
        if ((kulBoy - targetKulBoyProt) >= 0) {
          uron += this.GetRandomValue(0, puncher.str, kulBoy * 5 - targetKulBoyProt * 5);
        }
      } else {
        if (isTochny || isMoshny) {
          uron += puncher.str * ((!!currentWeapon && currentWeapon.fe || 0) / 100);
        } else {
          uron += this.GetRandomValue(0, puncher.str * ((!!currentWeapon && currentWeapon.fe || 0) / 100), 0);
        }
      }

      const isCounter =
        !isShot &&
        ((target.lvl >= 10 && (puncher.lvl - target.lvl < 6)) || (puncher.lvl - target.lvl < 3)) &&
        this.isProbil(this.getPercent(
          target.cnt,
          puncher.cnt,
          target.acntp,
          puncher.acnt,
          puncher.acntp,
          true,
          0));

      const isBlocking = targetBlocks.lastIndexOf(p) !== -1;
      let zaschitaInitialValue = 0;
      switch (p) {
        case 1:
          zaschitaInitialValue = target.ha;
          break;
        case 2:
          zaschitaInitialValue = target.ba;
          break;
        case 3:
          zaschitaInitialValue = target.fa;
          break;
        case 4:
          zaschitaInitialValue = target.lha;
          break;
        case 5:
          zaschitaInitialValue = target.rha;
          break;
      }

      if ((targetZaschita - zaschitaProt) < 0) {
        zaschitaInitialValue = 0;
      }
      let zaschitaProbability = targetZaschita * 5 - zaschitaProt * 5;
      if (zaschitaProbability > 0 && _.random(1, 100) === 1) {
        zaschitaProbability = 0;
      }
      const zaschitaCalculatedValue = this.GetRandomValue(0, zaschitaInitialValue, zaschitaProbability);
      if (isTochny) {
        uron *= 1.5;
      }
      if (uron === 0 && zaschitaInitialValue === 0) {
        uron = 1;
      }

      const attackerTriggerBonus = puncher.tb / 100;
      const targetTriggerBonus = target.tb / 100;

      const puncherTriggers = leftPlayer ? this.leftBattleTriggers.vm : this.rightBattleTriggers.vm;
      const targetTriggers = !leftPlayer ? this.leftBattleTriggers.vm : this.rightBattleTriggers.vm;

      if (puncherTriggers.trigger1 === 1) {
        uron *= (1.25 + attackerTriggerBonus);
      }
      if (targetTriggers.trigger1 === 3) {
        uron *= (1 - (0.25 + targetTriggerBonus));
      }

      uron = _.round(uron);
      const initialUron = uron;

      uron -= zaschitaCalculatedValue;

      if (uron < 0) {
        uron = 0;
      }

      let isBlocked = false;
      if (isBlocking && !isBlocked) {
        isBlocked = !isMoshny;
      }

      if (targetTriggers.trigger2 === 2) {
        uron *= (1 - (0.25 + targetTriggerBonus));
      }

      uron = _.round(uron);

      let counterPunchValueDouble = 0;
      if (isCounter) {
        if (isBlocked) {
          if (targetTriggers.trigger1 === 1) {
            counterPunchValueDouble = (initialUron / 2) * (1.25 * targetTriggerBonus);
          } else {
            counterPunchValueDouble = (initialUron / 2);
          }
        } else {
          if (targetTriggers.trigger1 === 1) {
            counterPunchValueDouble = (uron / 2) * (1.25 * targetTriggerBonus);
          } else {
            counterPunchValueDouble = (uron / 2);
          }
        }
      }

      if (puncherTriggers.trigger1 === 3) {
        counterPunchValueDouble *= (1 - (0.25 + attackerTriggerBonus));
      }

      if (puncherTriggers.trigger2 === 2) {
        counterPunchValueDouble *= (1 - (0.25 + attackerTriggerBonus));
      }

      counterPunchValueDouble = _.round(counterPunchValueDouble);

      step.isTochny = isTochny;
      step.isMoshny = isMoshny;
      step.isCounter = isCounter;
      step.isBlocked = isBlocked;

      const targetHp = () => !leftPlayer ? this.hpLeft : this.hpRight;
      const puncherHp = () => leftPlayer ? this.hpLeft : this.hpRight;

      step.puncherHpBefore = puncherHp();
      step.targetHpBefore = targetHp();

      if (leftPlayer) {
        this.hpLeft -= counterPunchValueDouble;
        if (!isBlocked) {
          this.hpRight -= uron;
        }
      } else {
        this.hpRight -= counterPunchValueDouble;
        if (!isBlocked) {
          this.hpLeft -= uron;
        }
      }

      step.puncherHpAfter = puncherHp();
      step.targetHpAfter = targetHp();
      step.uron = uron;
      step.counter = counterPunchValueDouble;
      const steps = [step];

      if (targetTriggers.trigger1 === 4 && isBlocked && counterPunchValueDouble > 0) {
        let addHP = counterPunchValueDouble * (0.25 + targetTriggerBonus) * 2;
        const tHp = targetHp() < 0 ? 0 : targetHp();
        if (addHP > 0) {
          if (addHP + tHp > target.zhv * 5) {
            addHP = target.zhv * 5 - tHp;
          }

          addHP = _.round(addHP);

          const vampStep = new BattleStep();
          vampStep.stepType = 2;
          vampStep.puncherHpBefore = targetHp();
          if (!leftPlayer) {
            this.hpLeft += addHP;
          } else {
            this.hpRight += addHP;
          }
          vampStep.puncherHpAfter = targetHp();
          vampStep.time = moment().format('HH:mm');
          vampStep.puncher = `Персонаж ${puncherNum}`;
          vampStep.puncherILS = !leftPlayer;
          vampStep.uron = addHP;
          steps.push(vampStep);
        }
      }

      if (puncherTriggers.trigger1 === 2) {

        let addHP = 0;
        if (targetHp() >= uron) {
          addHP = uron * (0.25 + attackerTriggerBonus);
        } else if (targetHp() > 0) {
          addHP = targetHp() * (0.25 + attackerTriggerBonus);
        } else {
          addHP = 0;
        }

        if (addHP > 0) {
          if (addHP + puncherHp() > puncher.zhv * 5) {
            addHP = puncher.zhv * 5 - puncherHp();
          }

          addHP = _.round(addHP);

          const vampStep = new BattleStep();
          vampStep.stepType = 2;
          vampStep.puncherHpBefore = puncherHp();
          if (leftPlayer) {
            this.hpLeft += addHP;
          } else {
            this.hpRight += addHP;
          }
          vampStep.puncherHpAfter = puncherHp();
          vampStep.time = moment().format('HH:mm');
          vampStep.puncher = `Персонаж ${puncherNum}`;
          vampStep.puncherILS = leftPlayer;
          vampStep.uron = addHP;
          steps.push(vampStep);
        }
      }

      if (puncherTriggers.trigger2 === 3 && uron > 0 && !isBlocked) {
        let trgDmg = uron * (0.25 + attackerTriggerBonus);
        trgDmg = _.round(trgDmg);

        const trgStep = new BattleStep();
        trgStep.stepType = 3;
        trgStep.targetHpBefore = targetHp();
        if (!leftPlayer) {
          this.hpLeft -= trgDmg;
        } else {
          this.hpRight -= trgDmg;
        }
        trgStep.targetHpAfter = targetHp();
        trgStep.time = moment().format('HH:mm');
        trgStep.puncher = `Персонаж ${puncherNum}`;
        trgStep.target = `Персонаж ${targetNum}`;
        trgStep.puncherILS = leftPlayer;
        trgStep.targetILS = !leftPlayer;
        trgStep.uron = trgDmg;
        steps.push(trgStep);
      }

      if (targetTriggers.trigger2 === 1 && uron > 0 && !isBlocked) {
        let trgDmg = uron * (0.25 + targetTriggerBonus);
        trgDmg = _.round(trgDmg);

        const trgStep = new BattleStep();
        trgStep.stepType = 3;
        trgStep.targetHpBefore = puncherHp();
        if (leftPlayer) {
          this.hpLeft -= trgDmg;
        } else {
          this.hpRight -= trgDmg;
        }
        trgStep.targetHpAfter = puncherHp();
        trgStep.time = moment().format('HH:mm');
        trgStep.puncher = `Персонаж ${targetNum}`;
        trgStep.target = `Персонаж ${puncherNum}`;
        trgStep.puncherILS = !leftPlayer;
        trgStep.targetILS = leftPlayer;
        trgStep.uron = trgDmg;
        steps.push(trgStep);
      }

      return steps;
    }

    private time() {
      return moment().format('HH:mm');
    }

    private getPunchesAndBlocksCount(tactic: number, puncher: Player): [number, number] {
      let punchesCount = 0;
      let blocksCount = 0;
      const equipedTwoHand = !!puncher.clothes.find((cl) => cl && cl.ith);
      const maxPunches = equipedTwoHand ? 1 : 2;
      const maxBlocks = equipedTwoHand ? 2 : 4;

      if (tactic === 2 && _.inRange(_.random(0, 100), 0, 1)) {
        tactic = 0;
      }

      switch (tactic) {
        case 0:
          punchesCount = _.random(0, maxPunches);
          blocksCount = maxBlocks - punchesCount * maxPunches;
          break;
        case 1:
          punchesCount = maxPunches;
          blocksCount = 0;
          break;
        case 2:
          punchesCount = 0;
          blocksCount = maxBlocks;
          break;
        case 3:
          punchesCount = maxPunches / 2;
          blocksCount = maxBlocks / 2;
          break;
      }

      return [punchesCount, blocksCount];
    }

    private getPunchPoints(count: number): number[] {
      const res = [];
      for (let i = 0; i < count; i++) {
        res.push(_.random(1, 5));
      }
      return res;
    }

    private getBlockPoints(count: number): any {
      const res = [1, 2, 3, 4, 5];
      for (let i = 0; i < 5 - count; i++) {
        res.splice(_.random(0, res.length - 1), 1);
      }
      return res;
    }

    private getPercent(
      stat: number,
      minusStat: number,
      probability: number,
      minusProbability: number,
      targetProbability: number,
      isUron: boolean,
      skorost: number): number {

      let ret = 0;
      if (isUron) {
        const calcStat = stat - minusStat;
        const calcProbability = (probability - minusProbability) * 5 - skorost * 0.75;

        if (calcStat >= 0) {
          if (calcProbability >= 0) {
            ret = 20 + calcStat * 4.5;
          } else {
            if ((calcStat * 4.5 + calcProbability * 1.8) >= 0) {
              ret = 20 + (calcStat * 4.5 + calcProbability * 1.8);
            } else {
              ret = 20 + (calcStat * 4.5 + calcProbability * 1.8) / 9;
            }
          }
        } else {
          if (calcProbability >= 0) {
            ret = 20 + (calcStat / 2);
          } else {
            ret = 20 + (calcStat / 2 + calcProbability / 5);
          }
        }
      } else {
        const statUvorota = minusStat - stat;
        const minusUvorota = (minusProbability - probability) * 5;

        if (statUvorota <= 0) {
          if (minusUvorota <= 0) {
            ret = 20 + (statUvorota / 2.5 + minusUvorota / 5);
          } else {

            ret = 20 + (statUvorota / 2.5);
          }
        } else {
          if (minusUvorota <= 0) {

            if (statUvorota * 3.6 + minusUvorota * 1.8 >= 0) {
              ret = 20 + (statUvorota * 3.6 + minusUvorota * 1.8);
            } else {
              ret = 20 + (statUvorota * 3.6 + minusUvorota * 1.8) / 9;
            }
          } else {
            ret = 20 + statUvorota * 3.6;
          }
        }
      }

      return _.round(ret);
    }

    private isProbil(probability: number) {
      if (probability < 0) {
        return false;
      }
      if (probability >= 200) {
        return true;
      }

      return _.random(0, 199) < probability;
    }

    private GetRandomValue(minValue: number, maxValue: number, probability: number): number {
      if (probability <= 0) {
        return _.random(minValue, maxValue);
      } else {
        probability = probability / 2;
      }

      const randomInt = _.random(minValue, maxValue);
      const extra = maxValue * probability / 100;
      const res = randomInt + extra;

      if (res > maxValue) {
        return maxValue;
      }

      return res;
    }

    @Watch('leftPlayerNum')
    @Watch('rightPlayerNum')
    private onChangePlayerNum() {
      this.clear();
    }
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .battle {
    width: 1450px;
    line-height: 19px;

    &__mid {
      width: 900px;
    }

    &__map {
      border: 1px solid var(--btn-border);
      padding: 0;
    }

    &__buttons {
      width: 400px;
      margin: 0 auto;
    }

    &__log {
      border: solid 2px var(--btn-border);
      text-align: left;
      padding: 5px;
      font-family: Verdana;
      font-size: 12px;
      color: $log-color;
      background-color: $log-back;
      width: 100%;
      max-height: 700px;
      overflow-y: auto;
    }
  }

  .battle-step {
    &__part {
      &--time {
        color: $log-time;
        text-decoration: none;
      }

      &--player1 {
        color: $log-player1;
        font-weight: bold;
        text-decoration: none;
      }

      &--player2 {
        color: $log-player2;
        font-weight: bold;
        text-decoration: none;
      }

      &--evade {
        color: $log-evade;;
        font-weight: bold;
        text-decoration: none;
      }

      &--counter {
        color: $log-counter;
        font-weight: bold;
        text-decoration: none;
      }

      &--mosh {
        color: $log-mosh;
        font-weight: bold;
        text-decoration: none;
      }

      &--crit {
        color: $log-crit;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
</style>