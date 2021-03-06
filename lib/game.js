import Sprite from './sprite';
import Pipe from './pipe';
import Bird from './bird';
import Foreground from './foreground';

class Game {
  constructor() {
    this.pipes = [];
    this.bird = [];
    this.foreGround = [];
    this.topPipeLeft = 0;
    this.topPipeRight = 0;
    this.topPipeY = 0;
    this.botPipeLeft = 0;
    this.botPipeRight = 0;
    this.botPipeY = 0;
    this.score = 0;
    this.addPipes();
    this.addForeGround();
    this.over = false;
    this.updateScore = this.updateScore.bind(this);
    this.updateScore();
  }

  add(object) {
    if (object instanceof Pipe) {
      this.pipes.push(object);
    } else if (object instanceof Bird){
      this.bird.push(object);
    } else if (object instanceof Foreground){
      this.foreGround.push(object);
    }
  }

  addPipes() {
    const pipeImg = new Image();
    pipeImg.src = 'assets/pipe.png';
    const orig = this;
    window.setInterval(() => {
      // const random = Math.floor(Math.random() * 200) - 200;
      const pipeOptions = {
        image: pipeImg,
        sX: 0,
        sY: 0,
        sWidth: 26,
        sHeight: 820,
        dX: 480,
        dY: Math.floor((Math.random() * 200) - 200 ),
        dWidth: 92,
        dHeight: 1000
      };

      this.add(new Pipe(pipeOptions, this));
    }, 1500);

  }

  updateScore() {
    const orig = this;
    if (!this.over) {
    this.scoreInt = window.setInterval(() => {
        orig.score += 1;
      }, 1500);
    }

  }


  drawScore(ctx) {
    if (!this.over) {
        ctx.font = '48px "Press Start 2P"';
        ctx.fillStyle = "white";
        ctx.fillText(this.score, 240, 90);
    }
  }

  addBird() {
    const birdImage = new Image();
    birdImage.src = 'assets/frame-1.png';
    const birdOptions = {
      image: birdImage,
      sX: 5,
      sY: 0,
      sWidth: 3968 / 8,
      sHeight: 444,
      dX: 150,
      dY: 220,
      dWidth: 60,
      dHeight: 60
    };
    const bird = new Bird(birdOptions, this);
    this.add(bird);
    return bird;
  }

  addForeGround() {
    const groundImg = new Image();
    groundImg.src = 'assets/background/foreground.png';
    groundImg.height = 150;
    const groundOptions = {
      image: groundImg,
      sX: 0,
      sY: 0,
      sWidth: Game.DIM_X + 100,
      sHeight: groundImg.height * 2,
      dX: 0,
      dY: 598,
      dWidth: 1700,
      dHeight: groundImg.height * 2
    };
    const foreground = new Foreground(groundOptions, this);
    this.add(foreground);

  }

  allObjects() {
    return [].concat(this.pipes, this.bird, this.foreGround);
  }

  // isOutOfBounds(dX, dY) {
  //   return (dX < -17 || dY < 0 || dX > Game.DIM_X || dY > Game.DIM_Y);
  // }

  remove(object) {
    if (object instanceof Pipe) {
      this.pipes.splice(this.pipes.indexOf(object), 1);
    }
  }


  outOfBounds(dX) {
    return (dX < -100);
  }

  pipesGroundObjects() {
    return[].concat(this.pipes, this.foreGround);
  }

  moveObjects(delta) {
    this.pipesGroundObjects().forEach((object) => {
      object.move(delta);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollide();
  }

  checkCollide() {
    this.pipes.forEach((pipe) => {
      // if (((this.bird[0].dX + this.bird[0].dWidth) / 2) > pipe.dX) {
      //   this.score += 1;
      // }
      this.bird[0].collideWith(pipe);
    });
  }


  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
    this.drawScore(ctx);
  }


  // wrapped (coord, max) {
  //   if (coord < -17) {
  //     return max - (coord % max);
  //   } else if (coord > max) {
  //     return coord % max;
  //   } else {
  //     return coord;
  //   }
  // }

  // wrap(dX) {
  //   return(
  //     this.wrapped(dX, Game.DIM_X)
  //   );
  // }
}

Game.DIM_X = 480;
Game.DIM_Y = 640;
Game.NUM_PIPES = 100;

export default Game;
