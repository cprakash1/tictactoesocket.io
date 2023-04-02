const socket=io('http://127.0.0.1:8000')
// const name=prompt("Name please:")
// socket.emit('new-user-joined',name);

const arr=[1,2,3,4,5,6,7,8,9]
const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');
const a4 = document.getElementById('a4');
const a5 = document.getElementById('a5');
const a6 = document.getElementById('a6');
const a7 = document.getElementById('a7');
const a8 = document.getElementById('a8');
const a9 = document.getElementById('a9');
const box = document.getElementById('box')
const reset = document.getElementById('reset');
const submit = document.getElementById('submit');
const display = document.querySelector('.display')
const tile = document.querySelectorAll('.cell')
const p1=document.getElementById('p1')
const p2=document.getElementById('p2')
console.log(tile)

let player1 = [];
let player2 = [];

let winner = -1;
let newchange=-1;
const exit = (c) => {
    socket.emit('won',newchange);
    for(let t of tile){
        t.disabled=true;
    }
    if (c) {
        box.innerText = "Player 1 Won"
    } else {
        box.innerText = "Player 2 Won"
    }
    player1 = []
    player2 = []
}

let a = 0//player turn

tile.forEach((t,i) => {
    t.addEventListener('click', () => {
        newchange=i;
        if (a == 0) {
            t.innerText = "X";
            a = 1;
            player1.push(i)
            if (checker(player1)) {
                exit(1)
            }
            t.disabled = true;
            submit.disabled=false;
        } else {
            alert("Opponent choice")
        }
    });
    i++;
})

reset.addEventListener('click', () => {
    submit.disabled=false;
    a = 0;
    for(let t of tile){
        t.innerText="";
        t.disabled=false;
    }
    box.innerText = "";
});
let success = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
];
const eachCheck = (val, playerval) => {
    for (let i of playerval) {
        if (i == val) return 1;
    }
    return 0;
}
const checker = (playerval) => {
    console.log(playerval)
    for (let i of success) {
        if (eachCheck(i[0], playerval) && eachCheck(i[1], playerval) && eachCheck(i[2], playerval)) {
            return 1;
        }
    }
    return 0;
}
// console.log(checker(player1))
// for (let tx of tile) {
//     tx.addEventListener('click', () => {
//         if (a) {
//             display.innerText = 1
//         } else {
//             display.innerText = 2
//         }
//     })
// }

submit.addEventListener('click',()=>{
    if(newchange!=-1){
        socket.emit('submitted',{newchange});
        p2.classList.remove('btn-secondary')
        p2.classList.add('btn-success')
        p1.classList.add('btn-secondary')
        p1.classList.remove('btn-success')
    }
    else
    alert("First make choice")
    newchange=-1;
})
// socket.on('user-join',name=>{
//     display.innerText=name;
// })

socket.on('submit',(z)=>{
    const {name,newchang}=z;
    tile[parseInt(newchang.newchange)-1].innerText="0";
    tile[parseInt(newchang.newchange)-1].disabled=true;
    player2.push(newchang.newchange);
    a=0;
    p1.classList.remove('btn-secondary')
    p1.classList.add('btn-success')
    p2.classList.add('btn-secondary')
    p2.classList.remove('btn-success')
    submit.disabled=true;
})
socket.on('winned',(z)=>{
    console.log(z)
    tile[parseInt(z.newchange)-1].innerText="0";
    tile[parseInt(z.newchange)-1].disabled=true;
    player2.push(z.newchange);
    a=0;
    for(let t of tile){
        t.disabled=true;
    }
    if (c) {
        box.innerText = "Player 1 Won"
    } else {
        box.innerText = "Player 2 Won"
    }
    player1 = []
    player2 = []
    submit.disabled=true;
})
