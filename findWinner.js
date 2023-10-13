var playerO = 'o';
var playerX = 'x';
var empty = '_';
var outOfBounds = 'out-of-bounds';
var tie = 'tie';

var valueAt = function (board, position) {
    var x = position.x, y = position.y;
    if (x < 0 || x >= board.length) {
        return outOfBounds;
    }
    if (y < 0 || y >= board.length) {
        return outOfBounds;
    }
    return board[y][x];
};

var findWinnerInDirection = function (board, start, direction) {
    var symbolsToWin = Math.min(5, board.length);
    var currentPosition = start;
    var count = 0;
    var lastSymbol = empty;
    while (valueAt(board, currentPosition) !== outOfBounds) {
        var value = valueAt(board, currentPosition);
        if (value === outOfBounds) {
            return null;
        }
        if (value === playerO || value === playerX) {
            if (value !== lastSymbol) {
                count = 0;
            }
            count++;
            if (count === symbolsToWin) {
                return value;
            }
        }
        lastSymbol = value;
        currentPosition = {
            x: currentPosition.x + direction.x,
            y: currentPosition.y + direction.y,
        };
    }
    return null;
};
var rightDirection = { x: 1, y: 0 };
var downDirection = { x: 0, y: 1 };
var rightDownDirection = { x: 1, y: 1 };
var rightUpDirection = { x: 1, y: -1 };
var findWinner$1 = function (board) {
    for (var y = 0; y < board.length; y++) {
        var start = { x: 0, y: y };
        var winner = findWinnerInDirection(board, start, rightDirection);
        if (winner !== null) {
            return winner;
        }
    }
    for (var x = 0; x < board.length; x++) {
        var start = { x: x, y: 0 };
        var winner = findWinnerInDirection(board, start, downDirection);
        if (winner !== null) {
            return winner;
        }
    }
    for (var i = 0; i < board.length; i++) {
        var winner = [
            { x: 0, y: i },
            { x: i, y: 0 },
        ]
            .map(function (start) { return findWinnerInDirection(board, start, rightDownDirection); })
            .find(function (winner) { return winner !== null; });
        if (winner !== null && winner !== undefined) {
            return winner;
        }
    }
    for (var i = 0; i < board.length; i++) {
        var winner = [
            { x: 0, y: i },
            { x: i, y: board.length - 1 },
        ]
            .map(function (start) { return findWinnerInDirection(board, start, rightUpDirection); })
            .find(function (winner) { return winner !== null; });
        if (winner !== null && winner !== undefined) {
            return winner;
        }
    }
    var isTie = board.every(function (row, y) {
        return row.every(function (_, x) { return valueAt(board, { x: x, y: y }) !== empty; });
    });
    if (isTie) {
        return tie;
    }
    return null;
};

var adjacentDirections = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
];
var countAdjacent = function (board, position, player) {
    return adjacentDirections
        .map(function (direction) {
        var value = valueAt(board, {
            x: position.x + direction.x,
            y: position.y + direction.y,
        });
        if (value === player) {
            return 1;
        }
        else if (value === playerO || value === playerX) {
            return 0.9;
        }
        else if (value === empty) {
            return 0.3;
        }
        return 0;
    })
        .reduce(function (a, b) { return a + b; }, 0);
};
var findBestMove = function (board, player) {
    if (findWinner$1(board) !== null) {
        throw new Error('Game is already over.');
    }
    // Empty board
    if (board.every(function (row) { return row.every(function (field) { return field === empty; }); })) {
        var middle = Math.floor(board.length / 2);
        return { x: middle, y: middle };
    }
    var neighbours = board.flatMap(function (row, y) {
        return row.map(function (_, x) {
            var position = { x: x, y: y };
            var value = valueAt(board, position);
            var count = value === empty
                ? countAdjacent(board, position, player)
                : Number.NEGATIVE_INFINITY;
            return { count: count, position: position };
        });
    });
    var topCount = Math.max.apply(Math, neighbours.map(function (_a) {
        var count = _a.count;
        return count;
    }));
    var topPositions = neighbours.filter(function (_a) {
        var count = _a.count;
        return count === topCount;
    });
    return topPositions[Math.floor(Math.random() * topPositions.length)].position;
};

var validateBoard = function (board) {
    var normalizedBoard = board;
    if (!Array.isArray(normalizedBoard)) {
        throw new Error('Board is not an array.');
    }
    if (normalizedBoard.some(function (row) { return !Array.isArray(row); })) {
        var size_1 = Math.sqrt(normalizedBoard.length);
        if (!Number.isInteger(size_1)) {
            throw new Error('Board has invalid number of fields.');
        }
        normalizedBoard = new Array(size_1)
            .fill(null)
            .map(function (_, i) { return normalizedBoard.slice(i * size_1, (i + 1) * size_1); });
    }
    if (normalizedBoard.length < 3) {
        throw new Error('Board has too few columns.');
    }
    if (!normalizedBoard.every(function (row) { return Array.isArray(row); })) {
        throw new Error('Board rows must be arrays.');
    }
    if (!normalizedBoard.every(function (row) { return row.length === normalizedBoard.length; })) {
        throw new Error('Board must have same number of rows and columns.');
    }
    if (!normalizedBoard.every(function (row) {
        return row.every(function (field) {
            return field === playerO || field === playerX || field === empty;
        });
    })) {
        throw new Error('Board contains invalid field values.');
    }
    return normalizedBoard;
};

export var findWinner = function (board) {
    var validatedBoard = validateBoard(board);
    return findWinner$1(validatedBoard);
};
var suggestNextMove = function (board, player) {
    var validatedBoard = validateBoard(board);
    var timerName = 'Suggest next move took';
    console.time(timerName);
    var bestMove = findBestMove(validatedBoard, player);
    console.timeEnd(timerName);
    return bestMove;
};


//# sourceMappingURL=index.js.map