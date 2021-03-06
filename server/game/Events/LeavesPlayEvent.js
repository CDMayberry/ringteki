const Event = require('./Event.js');
const MoveFateEvent = require('./MoveFateEvent.js');
const { Locations, EventNames } = require('../Constants');

class LeavesPlayEvent extends Event {
    constructor(params, card, gameAction) {
        super(EventNames.OnCardLeavesPlay, params);
        this.handler = this.leavesPlay;
        this.gameAction = gameAction;
        this.card = card;
        this.options = params.options || {};

        if(!this.destination) {
            this.destination = this.card.isDynasty ? Locations.DynastyDiscardPile : Locations.ConflictDiscardPile;
        }
    }

    createContingentEvents() {
        let contingentEvents = [];
        // Add an imminent triggering condition for all attachments leaving play
        if(this.card.attachments) {
            this.card.attachments.each(attachment => {
                // we only need to add events for attachments that are in play.
                if(attachment.location === Locations.PlayArea) {
                    contingentEvents.push(new LeavesPlayEvent({
                        order: this.order - 1,
                        destination: attachment.isDynasty ? Locations.DynastyDiscardPile : Locations.ConflictDiscardPile,
                        condition: () => attachment.parent === this.card,
                        isContingent: true
                    }, attachment));
                }
            });
        }
        // Add an imminent triggering condition for removing fate
        if(this.card.fate > 0) {
            contingentEvents.push(new MoveFateEvent({ order: this.order - 1, isContingent: true }, this.card.fate, this.card));
        }
        return contingentEvents;
    }

    preResolutionEffect() {
        this.cardStateWhenLeftPlay = this.card.createSnapshot();
        if(this.card.isAncestral() && this.isContingent) {
            this.destination = Locations.Hand;
            this.card.game.addMessage('{0} returns to {1}\'s hand due to its Ancestral keyword', this.card, this.card.owner);
        }
    }

    leavesPlay() {
        if([Locations.ProvinceOne, Locations.ProvinceTwo, Locations.ProvinceThree, Locations.ProvinceFour].includes(this.card.location)) {
            this.context.refillProvince(this.context.player, this.card.location);
        }
        if(!this.card.owner.isLegalLocationForCard(this.card, this.destination)) {
            this.card.game.addMessage('{0} is not a legal location for {1} and it is discarded', this.destination, this.card);
            this.destination = this.card.isDynasty ? 'dynasty discard pile' : 'conflict discard pile';
        }
        this.card.owner.moveCard(this.card, this.destination, this.options);
        if(this.options.shuffle) {
            if(this.destination === Locations.DynastyDeck) {
                this.card.owner.shuffleDynastyDeck();
            } else if(this.destination === Locations.ConflictDeck) {
                this.card.owner.shuffleConflictDeck();
            }
        }
    }
}


module.exports = LeavesPlayEvent;
