const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const text = "I love you";

const fontSize = 24;

const columnSpace = 140;

const rowSpace = 60;



let streams = [];



class Stream {


    constructor(x){


        this.x = x;


        this.y = Math.random() * -canvas.height;


        // belirgin hız farkı
        this.speed = 5 + Math.random() * 12;


        this.gap = rowSpace;


    }



    update(){


        this.y += this.speed;



        if(this.y > canvas.height + 200){

            this.y = -300;

            this.speed = 5 + Math.random()*12;

        }


    }



    draw(){


        ctx.font = `bold ${fontSize}px Arial`;

        ctx.fillStyle = "pink";



        for(let i=0;i<25;i++){


            let y = this.y - i*this.gap;


            ctx.fillText(
                text,
                this.x,
                y
            );


        }


    }


}





function create(){


    streams=[];


    let count = Math.ceil(
        canvas.width / columnSpace
    );


    for(let i=0;i<count;i++){


        streams.push(
            new Stream(i*columnSpace)
        );


    }


}



create();





function animate(){


    ctx.fillStyle="rgba(0,0,0,0.18)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    streams.forEach(stream=>{

        stream.update();

        stream.draw();

    });



    requestAnimationFrame(animate);


}





animate();





window.addEventListener("resize",()=>{


    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;


    create();


});
