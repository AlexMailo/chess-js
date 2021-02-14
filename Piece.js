class Piece {
  constructor(r, c, color, type) {
    this.r = r;
    this.c = c;
    this.color = color;
    this.type = type;
    this.abreviation = this.color[0] + this.type[0];
    this.image_id = this.abreviation + this.c;
    this.position = [r, c];

    if (type == "Knight") {
      this.abreviation = this.color[0] + "N";
    }
    this.el = this.getImage(this.image_id);
  }

  getImage(id) {
    const img = document.createElement("img");
    img.classList.add("piece__image");
    img.setAttribute("id", id);
    img.setAttribute("draggable", "true");
    img.addEventListener("dragstart", dragstart, false);

    img.piece = this;
    img.src = `https://lichess1.org/assets/_lvBD32/piece/merida/${this.abreviation}.svg`;
    return img;
  }

  getPosition() {
    return this.position;
  }

  updatePosition(r, c) {
    this.position = [r, c];
    this.r = r;
    this.c = c;
  }
}

class Pawn extends Piece {
  constructor(r, c, color) {
    super(r, c, color, "Pawn");
  }

  getPosibleMoves() {
    const possibleMoves = [];

    if (this.color == "white") {
      // ! non captures
      if (!board.getSquare(this.r - 1, this.c).hasPiece) {
        if (isInRange([this.r - 1, this.c]))
          possibleMoves.push([this.r - 1, this.c]);
        if (this.r == 6 && !board.getSquare(this.r - 2, this.c).hasPiece) {
          possibleMoves.push([this.r - 2, this.c]);
        }
      }
      // captures
      if (isInRange([this.r - 1, this.c - 1])) {
        let square = board.getSquare(this.r - 1, this.c - 1);
        if (square.hasPiece && square.pieceOnSquare.color != this.color) {
          possibleMoves.push([this.r - 1, this.c - 1]);
        }
      }
      if (isInRange([this.r - 1, this.c + 1])) {
        let square = board.getSquare(this.r - 1, this.c + 1);
        if (square.hasPiece && square.pieceOnSquare.color != this.color) {
          possibleMoves.push([this.r - 1, this.c + 1]);
        }
      }

      return possibleMoves;
    }

    if (isInRange([this.r + 1, this.c])) {
      if (!board.getSquare(this.r + 1, this.c).hasPiece) {
        possibleMoves.push([this.r + 1, this.c]);
      }
    }

    if (this.r == 1 && !board.getSquare(this.r + 2, this.c).hasPiece)
      possibleMoves.push([this.r + 2, this.c]);

    if (isInRange([this.r + 1, this.c - 1])) {
      let square = board.getSquare(this.r + 1, this.c - 1);
      if (square.hasPiece && square.pieceOnSquare.color != this.color) {
        possibleMoves.push([this.r + 1, this.c - 1]);
      }
    }
    if (isInRange([this.r + 1, this.c + 1])) {
      let square = board.getSquare(this.r + 1, this.c + 1);
      if (square.hasPiece && square.pieceOnSquare.color != this.color)
        possibleMoves.push([this.r + 1, this.c + 1]);
    }

    return possibleMoves;
  }
}

class Rook extends Piece {
  constructor(r, c, color) {
    super(r, c, color, "Rook");
  }

  getPosibleMoves() {
    const possibleMoves = [];

    let colLeft = [this.r, this.c - 1];
    let colRight = [this.r, this.c + 1];

    let rowUp = [this.r - 1, this.c];
    let rowDown = [this.r + 1, this.c];

    checkVector(possibleMoves, colLeft, 0, -1);
    checkVector(possibleMoves, colRight, 0, 1);
    checkVector(possibleMoves, rowUp, -1, 0);
    checkVector(possibleMoves, rowDown, 1, 0);

    return possibleMoves;
  }
}
class Bishop extends Piece {
  constructor(r, c, color) {
    super(r, c, color, "Bishop");
  }

  getPosibleMoves() {
    let possibleMoves = [];
    let leftUp = [this.r - 1, this.c - 1];
    let leftDown = [this.r + 1, this.c - 1];
    let rightUp = [this.r - 1, this.c + 1];
    let rightDown = [this.r + 1, this.c + 1];

    checkVector(possibleMoves, leftUp, -1, -1);
    checkVector(possibleMoves, leftDown, 1, -1);
    checkVector(possibleMoves, rightUp, -1, 1);
    checkVector(possibleMoves, rightDown, 1, 1);

    return possibleMoves;
  }
}
class Knight extends Piece {
  constructor(r, c, color) {
    super(r, c, color, "Knight");
  }

  getPosibleMoves() {
    let legal_moves = [
      [this.r - 2, this.c - 1],
      [this.r - 2, this.c + 1],

      [this.r + 2, this.c - 1],
      [this.r + 2, this.c + 1],

      [this.r - 1, this.c + 2],
      [this.r - 1, this.c - 2],

      [this.r + 1, this.c - 2],
      [this.r + 1, this.c + 2],
    ];

    legal_moves = legal_moves.filter((arr) => isInRange(arr, 0, 7));

    legal_moves = legal_moves.filter((item) => {
      
      let square = board.getSquare(item[0], item[1]);
      if (square.hasPiece) {
        if (square.pieceOnSquare.color != this.color) {
          return true;
        }
        return false;
      }
      return true;
    });

    return legal_moves;
  }
}
class Queen extends Piece {
  constructor(r, c, color) {
    super(r, c, color, "Queen");
  }

  getPosibleMoves() {
    let possibleMoves = [];
    let colLeft = [this.r, this.c - 1];
    let colRight = [this.r, this.c + 1];

    let rowUp = [this.r - 1, this.c];
    let rowDown = [this.r + 1, this.c];

    checkVector(possibleMoves, colLeft, 0, -1);
    checkVector(possibleMoves, colRight, 0, 1);
    checkVector(possibleMoves, rowUp, -1, 0);
    checkVector(possibleMoves, rowDown, 1, 0);

    let leftUp = [this.r - 1, this.c - 1];
    let leftDown = [this.r + 1, this.c - 1];
    let rightUp = [this.r - 1, this.c + 1];
    let rightDown = [this.r + 1, this.c + 1];

    checkVector(possibleMoves, leftUp, -1, -1);
    checkVector(possibleMoves, leftDown, 1, -1);
    checkVector(possibleMoves, rightUp, -1, 1);
    checkVector(possibleMoves, rightDown, 1, 1);
    return possibleMoves;
  }
}
class King extends Piece {
  constructor(r, c, color) {
    super(r, c, color, "King");
  }

  getPosibleMoves() {
    let legal_moves = [
      [this.r - 1, this.c],
      [this.r - 1, this.c - 1],
      [this.r - 1, this.c + 1],

      [this.r + 1, this.c],
      [this.r + 1, this.c - 1],
      [this.r + 1, this.c + 1],

      [this.r, this.c + 1],
      [this.r, this.c - 1],
    ];

    legal_moves = legal_moves.filter((arr) => isInRange(arr, 0, 7));

    legal_moves = legal_moves.filter((item) => {
      let square = board.getSquare(item[0], item[1]);
      if (square.hasPiece) {
        if (square.pieceOnSquare.color != this.color) {
          return true;
        }
        return false;
      }
      return true;
    });
    if (this.canShortCastle()) {
      if (this.color == "white") {
        legal_moves.push([this.r, this.c + 2]);
       
      } else {
      
        legal_moves.push([this.r,this.c+2])
      }
    }

    return legal_moves;
  }

  canShortCastle() {
    if (this.kingHasntMoved()) {
      if (this.color == "white") {
        if (
          !board.getSquare(7, 5).hasPiece &&
          !board.getSquare(7, 6).hasPiece
        ) {
          return true;
        }
      } else {
        if (
          !board.getSquare(0, 5).hasPiece &&
          !board.getSquare(0, 6).hasPiece
        ) {
          return true;
        }
      }
    }
    return false;
  }

  kingHasntMoved() {
    if (this.color == "white") return !state.whiteKingMoved;
    return !state.blackKingMoved;
  }
}

function checkVector(possibleMoves, vector, const1, const2) {
  while (isInRange(vector, 0, 7)) {
    //get the next square following the vector
    let square = board.getSquare(vector[0], vector[1]);
    if (square.hasPiece) {
      if (square.pieceOnSquare.color != this.color) {
        possibleMoves.push(vector);
        break;
      }
      break;
    } else {
      possibleMoves.push(vector);
    }
    vector = [vector[0] + const1, vector[1] + const2];
  }
}
