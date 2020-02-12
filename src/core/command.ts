const commandList:Array<Object> = [];

const position:Array<number> = [0, 0];
const direction:Array<number> = [1, 0];

function rotate(deg:number) {
  const rad = deg * Math.PI / 180,
    c = Math.cos(rad),
    s = Math.sin(rad);

  // [c, s, -s, c]

  const [x, y] = direction;

  direction[0] = x * c + y * -s;
  direction[1] = x * s + y * c;
}

export function _vertices(...verticesArray:Array<number>) {
  for(let i = 0; i < verticesArray.length; i += 2) {
    const x = verticesArray[i];
    const y = verticesArray[i + 1];
    commandList.push({
      command: i === 0 ? 'put' : 'forward',
      args: {x, y},
    });
  }
}

let penWidth:number = 0;
export function pen(lineWidth:number, color:string = 'black', mode:string = 'line-strip') {
  lineWidth = lineWidth || 0;
  commandList.push({
    command: 'pen',
    args: {color, lineWidth, mode},
  });
  penWidth = lineWidth;
  put(position[0], position[1]);
}

export function put(x:number, y:number) {
  position[0] = x;
  position[1] = y;
  commandList.push({
    command: 'put',
    args: {x, y},
  });
}


export function left(deg:number) {
  rotate(deg);
}

export function right(deg:number) {
  rotate(-deg);
}

export function forward(length:number) {
  position[0] += length * direction[0];
  position[1] += length * direction[1];

  if(penWidth > 0) {
    commandList.push({
      command: 'forward',
      args: {
        x: position[0],
        y: position[1],
      },
    });
  }
}

export function render(parser:Function) {
  parser([...commandList]);
  commandList.length = 0;
}