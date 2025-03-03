var board = null;
var game = new Chess();

function onDragStart(source, piece, position, orientation) {
    if (game.game_over() || (game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onDrop(source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback';

    updateStatus();
}

function updateStatus() {
    var status = '';
    if (game.in_checkmate()) {
        status = 'Checkmate! ' + (game.turn() === 'w' ? 'Black' : 'White') + ' wins!';
    } else if (game.in_draw()) {
        status = 'Draw!';
    } else {
        status = (game.turn() === 'w' ? "White's turn" : "Black's turn");
    }
    document.getElementById('status').textContent = status;
}

board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop
});

updateStatus();
