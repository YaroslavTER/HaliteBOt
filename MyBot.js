const {
    Move,
} = require('./hlt');
const Networking = require('./networking');

const network = new Networking('MyJavaScriptBot');

function GenerateMove(square, loc){
    if(square.strength < square.production*5)
        return new Move(loc, 0);
    else
        return new Move(loc,
                        Math.floor(Math.random() * 5));
}

function MovToNeighbour(square, loc){
    
}

network.on('map', (gameMap, myId) => {
    const moves = [];

    for (let y = 0; y < gameMap.height; y++) {
        for (let x = 0; x < gameMap.width; x++) {
            const loc = { x, y };
            const { owner } = gameMap.getSite(loc);
            if (owner === myId) {
                moves.push(GenerateMove(gameMap.getSite(loc), loc));
            }
        }
    }

    network.sendMoves(moves)
});
