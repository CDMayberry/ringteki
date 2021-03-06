const DrawCard = require('../../drawcard.js');
const { Locations, Players } = require('../../Constants');

class AncestralArmory extends DrawCard {
    setupCardAbilities(ability) { // eslint-disable-line no-unused-vars
        this.action({
            title: 'Return a weapon attachment in your conflict discard pile to your hand',
            cost: ability.costs.sacrificeSelf(),
            target: {
                activePromptTitle: 'Choose a weapon attachment from your conflict discard pile',
                cardCondition: card => card.hasTrait('weapon'),
                location: [Locations.ConflictDiscardPile],
                controller: Players.Self,
                gameAction: ability.actions.returnToHand({ location: Locations.ConflictDiscardPile }) // revisit implementation once returnToHand game action is rewritten.
            }
        });
    }
}

AncestralArmory.id = 'ancestral-armory';

module.exports = AncestralArmory;
