const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;

class ListenForInput {
	constructor(game) {
		this.game = game;
		this.firstTime = true;

		this.bindEvent();
	}

	bindEvent() {
		const self = this;

		// document.onkeydown = null;
		document.onkeydown = function (event) {
			self.changeDirection(event)
		}
	}

	changeDirection(event) {
		if (this.firstTime) {
			this.game.addDirection(DIRECTION.UP);
			this.firstTime = false;
		} else if (!this.game.exceededMaxDirections()) {
			if (event.keyCode == LEFT_ARROW && this.movingVertically()) {
				this.game.addDirection(DIRECTION.LEFT);
			}
			else if (event.keyCode == RIGHT_ARROW && this.movingVertically()) {
				this.game.addDirection(DIRECTION.RIGHT);
			}
			else if (event.keyCode == UP_ARROW && this.movingHorizontally()) {
				this.game.addDirection(DIRECTION.UP);
			}
			else if (event.keyCode == DOWN_ARROW && this.movingHorizontally()) {
				this.game.addDirection(DIRECTION.DOWN);
			}
		}
	}

	// Prevent the player from building up a queue of redundant directions
	movingVertically() {
		return [DIRECTION.UP, DIRECTION.DOWN].includes(this.game.getFirstDirection());
	};

	movingHorizontally() {
		return [DIRECTION.LEFT, DIRECTION.RIGHT].includes(this.game.getFirstDirection());
	};
}
