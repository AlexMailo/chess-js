


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

  addPieces(fenNotation = "r2qkb1r/pp2nppp/3p4/2pNN1B1/2BnP3/3P4/PPP2PPP/R2bK2R") {
    this.fenNotation = fenNotation;
    let fen = this.fenToArray(fenNotation)
    
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        let piece = fen[r][c]
        if (piece != 'nothing') {
          this.board[r][c].el.appendChild(piece.el)
          this.board[r][c].setPieceOnSquare(piece)
        }
      }

    }
  }
  getSquare(r, c) {
    return this.board[r][c]
  }

  fenToArray(fen) {
    function getPiece(el, r, c) {
      switch (el) {
        case "P":
          return new Pawn(r, c, 'white')
        case "p":
          return new Pawn(r, c, 'black')
        case "N":
          return new Knight(r, c, 'white')
        case "n":
          return new Knight(r, c, 'black')
        case "B":
          return new Bishop(r, c, 'white')
        case "b":
          return new Bishop(r, c, 'black')
        case "Q":
          return new Queen(r, c, 'white')
        case "q":
          return new Queen(r, c, 'black')
        case "K":
          return new King(r, c, 'white')
        case "k":
          return new King(r, c, 'black')
        case 'R':
          return new Rook(r, c, 'white')
        case 'r':
          return new Rook(r, c, 'black')
        default:
          return "nothing"


      }
    }
    const grid = []

    let arr = fen.split('/')


    arr.forEach((row, r) => {
      let temp = []
      row.split('').forEach((el, c) => {
        if (!isNaN(el)) {
          for (let i = 0; i < parseInt(el); i++) {
            temp.push('nothing')
          }
        }
        else {
          temp.push(getPiece(el, r, c))
        }
      })
      grid.push(temp)

    });

    return grid
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
