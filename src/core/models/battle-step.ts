
// Удар
export default class BattleStep {
    public stepType = 0;
    public time = '';
    public puncher = '';
    public target = '';
    public isAvoided = false;
    public isTochny = false;
    public isMoshny = false;
    public isCounter = false;
    public isBlocked = false;
    public point = '';
    public puncherHpBefore = 0;
    public puncherHpAfter = 0;
    public targetHpAfter = 0;
    public targetHpBefore = 0;
    public uron = 0;
    public counter = 0;
    public puncherILS = false;
    public targetILS = false;
}
