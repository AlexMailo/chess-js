class Board {
  constructor() {
    this.el = document.createElement("div");
    this.el.id = "chess-board";
    this.board = [];
    this.pieces = [];
    this.draw()

  }

  draw() {
    for (let r = 0; r < 8; r++) {
      let arr = [];
      for (let c = 0; c < 8; c++) {
        let square = new Square(
          r,
          c,
          (r + c) % 2 == 0 ? "square__light" : "square__dark"
        );
        this.el.appendChild(square.el);
        arr.push(square);
      }
      this.board.push(arr);
    }
  }

  addPieces(fenNotation) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i == 1) {
          const piece = new Pawn(i, j, "black");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }

        if ((i == 0 && j == 0) || (i == 0 && j == 7)) {
          const piece = new Rook(i, j, "black");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }

        if ((i == 0 && j == 1) || (i == 0 && j == 6)) {
          const piece = new Knight(i, j, "black");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }

        if ((i == 0 && j == 2) || (i == 0 && j == 5)) {
          const piece = new Bishop(i, j, "black");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }

        if (i == 0 && j == 3) {
          const piece = new Queen(i, j, "black");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }
        if (i == 0 && j == 4) {
          const piece = new King(i, j, "black");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }

        if (i == 6) {
          const piece = new Pawn(i, j, "white");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }

        if ((i == 7 && j == 0) || (i == 7 && j == 7)) {
          const piece = new Rook(i, j, "white");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }

        if ((i == 7 && j == 1) || (i == 7 && j == 6)) {
          const piece = new Knight(i, j, "white");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }

        if ((i == 7 && j == 2) || (i == 7 && j == 5)) {
          const piece = new Bishop(i, j, "white");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }

        if (i == 7 && j == 3) {
          const piece = new Queen(i, j, "white");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }
        if (i == 7 && j == 4) {
          const piece = new King(i, j, "white");
          this.pieces.push({
            pos: piece.getPosition(),
            type: piece.type,
            color: piece.color,
          });
          this.board[i][j].el.appendChild(piece.el);
          this.board[i][j].setPieceOnSquare(piece);
        }
      }
    }
  }
  getSquare(r,c){
    return this.board[r][c]
  }

  fenToArray(fen){
      
  }
}

class Square {
  constructor(r, c, square_color) {
    this.r = r;
    this.c = c;
    this.el = document.createElement("div");
    this.el.classList.add("square");
    this.el.classList.add(square_color);
    this.el.addEventListener("dragover", onHover);
    this.el.addEventListener("drop", onDrop);
    this.el.square = this;
    this.hasPiece = false;
    this.pos = [this.r, this.c];
    this.el.setAttribute("pos", this.pos);
  }

  setPieceOnSquare(val) {
    if (val) {
      this.hasPiece = true;
      this.pieceOnSquare = val;
      return;
    }
    this.hasPiece = false;
    this.pieceOnSquare = null;
  }
}

const board = new Board();
board.addPieces();

document.body.querySelector("main").appendChild(board.el);
