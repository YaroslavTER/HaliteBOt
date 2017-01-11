const {
    Move,
    STILL,
    CARDINALS,
    NORTH,
    EAST,
} = require('./hlt');
const Networking = require('./networking');

const network = new Networking('MyJavaScriptBot');
const MAX_STRENGTH = 255

function GenerateMove(square, loc, gameMap, counter){//first stage
    var moveDirection = STILL;
    for(var direction of CARDINALS){
        neighbour = gameMap.getSite(loc, direction);
        if((square.strength > neighbour.strength &&
                  neighbour.owner != square.owner) ||
           (square.strength < neighbour.strength &&
            neighbour.owner == square.owner && square.strength > 2)){
                      moveDirection = direction;
        }
        if(square.strength == MAX_STRENGTH)
            return new Move(loc, EAST);
        else if(square.strength >= 100)
            return new Move(loc, NORTH);
    }
    return new Move(loc, moveDirection);
}

function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

network.on('map', (gameMap, myId) => {
    const moves = [];
    var counter = 1
    for (let y = 0; y < gameMap.height; y++) {
        for (let x = 0; x < gameMap.width; x++) {
            const loc = { x, y };
            const { owner } = gameMap.getSite(loc);
            if (owner === myId) {
                moves.push(GenerateMove(gameMap.getSite(loc),
                                               loc, gameMap, counter++));
            }
        }
    }

    network.sendMoves(moves)
});
