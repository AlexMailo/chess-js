let state = { whiteTurn: true,whiteKingMoved:false,blackKingMoved:false};

function dragstart(event) {
  Object.assign(state, { piece: event.currentTarget.piece });
}

function onDrop(event) {
  Object.assign(state, { dest_square: event.currentTarget.square });
  movePiece(state);
}
function onHover(event) {
  event.preventDefault();
}

function movePiece(state) {
  const { dest_square, piece, whiteTurn } = state;
  
  

  if (canMove(piece.getPosibleMoves(), dest_square.pos)) {
    if (piece.color == "white" && !whiteTurn ||piece.color == "black" && whiteTurn)
      return;

      if(piece.type == "King" ){
        if(piece.color =="white")
          state.whiteKingMoved = true
        else 
          state.blackKingMoved = true
      }

    if (dest_square.hasPiece) {
      board.board[piece.r][piece.c].setPieceOnSquare();
      dest_square.el.replaceChild(piece.el, dest_square.pieceOnSquare.el);
      new Audio('././finish-him.mp3').play()
      
    }else{
      board.board[piece.r][piece.c].setPieceOnSquare();
      dest_square.el.appendChild(piece.el);
      new Audio('./move.mp3').play()
     
      
    }
    state.whiteTurn = !state.whiteTurn
    piece.updatePosition(dest_square.r, dest_square.c);
    dest_square.setPieceOnSquare(piece);

  }

}

function range(n, a, b) {
  return n <= b && n >= a;
}

function canMove(possibles, destination_square) {
  destination_square = JSON.stringify(destination_square);
  return possibles.some((item) => JSON.stringify(item) == destination_square);
}


function isInRange(arr,a=0,b=7){
 for(let el of arr){
   if(!range(el,a,b)) return false
 }
 return true
  
}

