
var puzzle = [ [ 0, 0, 8, 0, 3, 0, 5, 4, 0 ],
  [ 3, 0, 0, 4, 0, 7, 9, 0, 0 ],
  [ 4, 1, 0, 0, 0, 8, 0, 0, 2 ],
  [ 0, 4, 3, 5, 0, 2, 0, 6, 0 ],
  [ 5, 0, 0, 0, 0, 0, 0, 0, 8 ],
  [ 0, 6, 0, 3, 0, 9, 4, 1, 0 ],
  [ 1, 0, 0, 8, 0, 0, 0, 2, 7 ],
  [ 0, 0, 5, 6, 0, 3, 0, 0, 4 ],
  [ 0, 2, 9, 0, 7, 0, 8, 0, 0 ] ]



function findPosition(puzzle,i){
var num = Math.floor(i/(puzzle.length));
return num;}

function getVars(puzzle){
  var puz = puzzle.flat();
  var start = 0;
  for(var i = 0; i < puz.length; i++){
    if(start > 8){start = 0};
    if(puz[i] == 0){
      puz[i] = [];
      for(var j = start; j < puz.length;j += 9){
        if(puz[j] != 0 && typeof puz[j] != "object"){
        puz[i].push(puz[j])
        }
      };
      var num = findPosition(puzzle, i);
      for(var k = 0; k < puzzle.length;k++){
        if(puzzle[num][k] != 0 ){puz[i].push(puzzle[num][k])}
      }var vars = [1,2,3,4,5,6,7,8,9].reduce(function(acc,elem,index){if(puz[i].indexOf(elem) == -1){acc.push(elem)}return acc},[]);puz[i] = [...vars];
    };start++
  };return puz;
}

//var puz = getVars(puzzle)

function splitter(arr){
  var block = [];
  for(var i = 0; block.length < 9;){
  var block1 = arr.slice(0,3).concat(arr.slice(9,12),arr.slice(18,21));
  var block2 = arr.slice(3,6).concat(arr.slice(12,15),arr.slice(21,24));
  var block3 = arr.slice(6,9).concat(arr.slice(15,18),arr.slice(24,27));
  arr.splice(0,27);
  block.push(block1);
  block.push(block2);
  block.push(block3);
  }
  return block;
}
//var blocks = splitter(puz);

function reduceBlocks(arr){
  var flag = 0;
  var block = [...arr];
  for(var i = 0; i<block.length;i++){
    var nums = [];
    for(var j = 0; j < block.length; j++){
      if(typeof block[i][j] == "number"){
        nums.push(block[i][j]);
      }
    }
    for(var k = 0; k < block.length; k++){
      if(typeof block[i][k] == "object"){
        block[i][k] = block[i][k].reduce(function(acc,elem){if(nums.indexOf(elem) == -1){acc.push(elem)}return acc},[]);
        if(block[i][k].length == 1){block[i][k] = block[i][k][0];flag++}
      }
    }
  }if(flag > 0){return reduceBlocks(block);}else{return block};
}
//Первая попытка установить кандидатов(если длина массива кондидатов после всех исключения стала равна 1 то член этого массива и становится в эту ячейку)
//var reducedBlock1 = reduceBlocks(blocks);


function expand(arr){
   arr = arr.flat();
   var block = [];
   for(var i = 0; block.length < 9;){
   var string1 = arr.slice(0,3).concat(arr.slice(9,12),arr.slice(18,21));
   var string2 = arr.slice(3,6).concat(arr.slice(12,15),arr.slice(21,24));
   var string3 = arr.slice(6,9).concat(arr.slice(15,18),arr.slice(24,27));
   arr.splice(0,27);
   block.push(string1,string2,string3);
 }return block;
}

//var expandedBlock = expand(reducedBlock1);
//console.log(expandedBlock);

function toZero(arr){
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr.length; j++){
      if(typeof arr[i][j] == "object"){arr[i][j] = 0}
    }
  }
  return arr;
}

//console.log(toZero(expandedBlock))
function solvePuzzle(puzzle){
  var newPuzzle = getVars(puzzle);
  var blocks = splitter(newPuzzle);
  var reducedBlocks = reduceBlocks(blocks);
  var expandedBlock = expand(reducedBlocks);
  var zero = toZero(expandedBlock);
  for(var i = 0; i < zero.length; i++){
    for(var j = 0; j < zero.length; j++){
      if(zero[i][j] == 0){return solvePuzzle(zero)}
    }
  }return zero;
}

console.log(solvePuzzle(puzzle));


function fl(){
  return this.reduce(function(acc,elem){if(typeof elem == "object"){acc = acc.concat(elem)}else{acc.push(elem)};return acc},[])
}

Array.prototype.flat = fl;

var tr = [1,2,3,4,[5,6],7]
console.log(tr.flat())
