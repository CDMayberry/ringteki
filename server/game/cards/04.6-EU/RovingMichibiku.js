const DrawCard = require('../../drawcard.js');

class RovingMichibiku extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            title: 'Take a ring from opponent\'s claimed pool',
            when: {
                afterConflict: (event, context) => context.source.isParticipating() && event.conflict.winner === context.player
            },
            gameAction: ability.actions.takeRing(context => ({
                takeFate: true,
                promptForSelect: {
                    activePromptTitle: 'Choose a ring to take',
                    ringCondition: ring => ring.isClaimed(context.player.opponent),
                    message: '{0} takes {1}',
                    messageArgs: card => [context.player, card]
                }
            }))
        });
    }
}

RovingMichibiku.id = 'roving-michibiku';

module.exports = RovingMichibiku;
