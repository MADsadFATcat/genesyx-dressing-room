import Chip from '../core/models/chip';
import StatNames from '../core/models/stat-names';
const fs = require('fs');
import _ from 'lodash';

const chipStats: string[] = [
    'str',
    'spd',
    'cnt',
    'tch',
    'msh',
    'zhv',
    'klb',
    'zsc',
    'vld',
    'mtk',
    'aspd',
    'acnt',
    'atch',
    'amsh',
    'aspdp',
    'acntp',
    'atchp',
    'amshp',
];

let id = 0;
const chips = new Array<Chip>();
_.each(chipStats, (k) => {
    for (let i = 5; i <= 21; i += 2) {
        const chip = new Chip();
        chip.id = ++id;
        chip.val = i;
        chip.statTitle = (StatNames as any)[k];
        (chip as any)[k] = i;
        chips.push(chip);
    }

    console.log(k);
});

fs.writeFile(`chips.json`, JSON.stringify(chips), (err: any) => {
    if (err) { console.log(err); }

    console.log(`Successfully create chips.json.`);
});

