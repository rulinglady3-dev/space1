const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const text = "I love you";

let mode = "rain";

let showYu = false;

let words = [];

let heartPoints = [];

let centerX;
let centerY;



function createHeart(){

    heartPoints=[];

    centerX = canvas.width/2;
    centerY = canvas.height/2;


    for(let t=0;t<Math.PI*2;t+=0.12){

        let x = 16*Math.pow(Math.sin(t),3);

        let y =
        -(13*Math.cos(t)
        -5*Math.cos(2*t)
        -2*Math.cos(3*t)
        -Math.cos(4*t));


        heartPoints.push({

            x:centerX+x*15,

            y:centerY+y*15

        });

    }

}



class Word{


    constructor(x,y){


        this.x=x;

        this.y=y;


        this.speed=4+Math.random()*5;


        this.target=null;


        this.angle=Math.random()*Math.PI*2;


        this.radius=230+Math.random()*80;


    }



    update(){


        if(mode==="rain"){


            this.y+=this.speed;


            if(this.y>canvas.height+40){

                this.y=-40;

            }

        }



        else if(mode==="forming"){


            if(this.target){


                this.x +=
                (this.target.x-this.x)*0.035;


                this.y +=
                (this.target.y-this.y)*0.035;


            }


        }



        else if(mode==="orbit"){


            this.angle+=0.01;


            this.x =
            centerX+
            Math.cos(this.angle)*this.radius;


            this.y =
            centerY+
            Math.sin(this.angle)*this.radius;


        }


    }




    draw(){


        ctx.font="bold 22px Arial";

        ctx.fillStyle="#ff69b4";


        ctx.fillText(
            text,
            this.x,
            this.y
        );


    }


}





function createWords(){


    words=[];


    for(let x=0;x<canvas.width;x+=140){


        for(let y=0;y<canvas.height;y+=60){


            words.push(
                new Word(x,y)
            );


        }


    }


}





createHeart();

createWords();





function animate(){


    ctx.fillStyle="black";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    words.forEach((word,index)=>{


        if(mode==="forming"){


            word.target =
            heartPoints[index % heartPoints.length];


        }


        word.update();

        word.draw();


    });



    if(showYu){


        ctx.fillStyle="white";

        ctx.font="bold 70px Arial";

        ctx.textAlign="center";


        ctx.fillText(
            "Yu",
            centerX,
            centerY+25
        );


        ctx.textAlign="left";


    }



    requestAnimationFrame(animate);


}


animate();





// 7 saniye sonra kalp oluşumu

setTimeout(()=>{


    mode="forming";


},7000);





// kalp oluştuktan sonra dönüş

setTimeout(()=>{


    mode="orbit";


},12000);





// Yu yazısı

setTimeout(()=>{


    showYu=true;


},16000);






window.addEventListener("resize",()=>{


    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;


    createHeart();

});
