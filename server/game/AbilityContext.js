const BaseAbility = require('./baseability.js');
const EffectSource = require('./EffectSource.js');
const { Stages } = require('./Constants.js');

class AbilityContext {
    constructor(properties) {
        this.game = properties.game;
        this.source = properties.source || new EffectSource(this.game);
        this.player = properties.player;
        this.ability = properties.ability || new BaseAbility({});
        this.costs = properties.costs || {};
        this.targets = properties.targets || {};
        this.rings = properties.rings || {};
        this.selects = properties.selects || {};
        this.stage = properties.stage || Stages.Effect;
        this.target = null;
        this.select = null;
        this.ring = null;
        this.provincesToRefill = [];
    }

    copy(newProps) {
        let copy = new AbilityContext(Object.assign({}, this.getProps(), newProps));
        copy.target = this.target;
        copy.select = this.select;
        copy.ring = this.ring;
        return copy;
    }

    refillProvince(player, location) {
        this.provincesToRefill.push({ player, location });
    }

    refill() {
        for(let player of this.game.getPlayersInFirstPlayerOrder()) {
            for(let refill of this.provincesToRefill.filter(refill => refill.player === player)) {
                this.game.queueSimpleStep(() => {
                    player.replaceDynastyCard(refill.location);
                    return true;
                });
            }
        }
    }

    getProps() {
        return {
            game: this.game,
            source: this.source,
            player: this.player,
            ability: this.ability,
            costs: Object.assign({}, this.costs),
            targets: Object.assign({}, this.targets),
            rings: Object.assign({}, this.rings),
            selects: Object.assign({}, this.selects),
            stage: this.stage,
            provincesToRefill: this.provincesToRefill
        };
    }
}

module.exports = AbilityContext;
