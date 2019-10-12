<template>
  <div class="stats">
    <div>
      <div>Профессия</div>
    </div>
    <div>
      <div>Уровень</div>
    </div>
    <div>
      <div>Опыт</div>
    </div>
    <div>
      <div class="stats__headline">Статы</div>
    </div>
    <div>
      <div title="Величина наносимого урона">Сила</div>
    </div>
    <div>
      <div title="Вероятность уворота от удара/выстрела">Скорость</div>
    </div>
    <div>
      <div title="Вероятность нанесения ответного удара">Контратака</div>
    </div>
    <div>
      <div title="Вероятность точного попадания (урон увеличивается в 1.5 раза)">Точность</div>
    </div>
    <div>
      <div title="Вероятность пробивания блока">Мощность</div>
    </div>
    <div>
      <div title="Количество жизни">Живучесть</div>
    </div>
    <div>
      <div title="Количество биоэнергии">Энергия</div>
    </div>
    <div>
      <div class="stats__headline">Мастерства</div>
    </div>
    <div>
      <div title="Вероятность нанесения максимального урона силой">Кулачный бой</div>
    </div>
    <div>
      <div title="Вероятность срабатывания брони">Защита</div>
    </div>
    <div>
      <div title="Вероятность нанесения максимального урона оружием">Владение оружием</div>
    </div>
    <div>
      <div title="Вероятность попадания из огнестрельного оружия">Меткость</div>
    </div>
    <div>
      <div class="stats__headline">Обереги</div>
    </div>
    <div>
      <div title="Вероятность попадания по быстрому противнику">Антискорость</div>
    </div>
    <div>
      <div title="Вероятность избегания ответного удара">Антиконтратака</div>
    </div>
    <div>
      <div title="Вероятность избегания точного удара">Антиточность</div>
    </div>
    <div>
      <div title="Вероятность избегания мощного удара">Антимощность</div>
    </div>
    <div>
      <div class="stats__headline">Антимастерства</div>
    </div>
    <div>
      <div
        title="Понижение вероятности нанесения максимального урона силой противником"
      >Кулачный бой прот.
      </div>
    </div>
    <div>
      <div title="Понижение вероятности срабатывания брони противника">Защита прот.</div>
    </div>
    <div>
      <div
        title="Понижение вероятности нанесения максимального урона оружием противником"
      >Владение оружием прот.
      </div>
    </div>
    <div>
      <div
        title="Понижение вероятности попадания из огнестрельного оружия противником"
      >Меткость прот.
      </div>
    </div>
    <div>
      <div class="stats__headline">Антиобереги</div>
    </div>
    <div>
      <div title="Вероятность попадания по быстрому противнику">Антискорость прот.</div>
    </div>
    <div>
      <div title="Вероятность избегания ответного удара">Антиконтратака прот.</div>
    </div>
    <div>
      <div title="Вероятность избегания точного удара">Антиточность прот.</div>
    </div>
    <div>
      <div title="Вероятность избегания мощного удара">Антимощность прот.</div>
    </div>
    <div>
      <div class="stats__headline">Бонусы</div>
    </div>
    <div>
      <div title="Бонус опыта">Бонус опыта</div>
    </div>
    <div>
      <div title="Бонус действия триггера">Бонус действия триггера</div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({})
  export default class Stats extends Vue {
  }
</script>

<style lang="scss">
  @import "../styles/variables";

  .stats > div {
    height: 24px;
  }

  .stats__headline {
    color: var(--border);
    font-weight: bold;
    font-size: 11pt;
  }
</style>