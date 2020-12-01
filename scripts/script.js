window.addEventListener('load', function() {
    console.log("ready. content, scripts, assets loaded");


    const cardsArr = [
        {
            name: "ball", 
            img: './images/ball.JPG'
        },
        {
            name: "ball", 
            img: './images/ball.JPG'
        },
        {
            name: "banana", 
            img: './images/banana.JPG'
        },
        {
            name: "banana", 
            img: './images/banana.JPG'
        },
        {
            name: "bucket", 
            img: './images/bucket.JPG'
        },
        {
            name: "bucket", 
            img: './images/bucket.JPG'
        },
        {
            name: "pennyfarthing", 
            img: './images/pennyfarthing.JPG'
        },
        {
            name: "pennyfarthing", 
            img: './images/pennyfarthing.JPG'
        },
        {
            name: "rocket", 
            img: './images/rocket.JPG'
        },
        {
            name: "rocket", 
            img: './images/rocket.JPG'
        },
        {
            name: "soap", 
            img: './images/soap.JPG'
        },
        {
            name: "soap", 
            img: './images/soap.JPG'
        },
        {
            name: "sun", 
            img: './images/sun.JPG'
        },
        {
            name: "sun", 
            img: './images/sun.JPG'
        },
        {
            name: "tomato", 
            img: './images/tomato.JPG'
        },
        {
            name: "tomato", 
            img: './images/tomato.JPG'
        },
    
    ]
    const successMessages=["Noice!", "Good on ya!", "Oooh, clever", "Mind like a steel trap!"];
    const failMessages = ["Bugger!", "Nahp", "Sigh ... no", "Are you trying?", "My grandma can do better"]
    // DOM elements
    const grid = document.getElementById("memory-grid");
    const message = document.getElementById("message");
    const triesDom = document.getElementById("tries");
    const cards = document.querySelectorAll("img");

    // arrays for comparison. emptied after two cards picked
    let pickedCards = [];
    let pickedCardsId=[];

    // vars to keep track of game 
    let cardsPlayed = [];
    let tries = 0;
    function getRandoIdx(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }
    // Fisher yates /   Durstenfeld shuffle
    function shuffleArr(arr){
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    
    }
    shuffleArr(cardsArr);
    function handleMessages(res){
        message.textContent = getRandoIdx(res === "success" ? successMessages : failMessages)
        setTimeout(()=>{
            message.textContent = ""
        }, 1000);
    }

    function compareCards(){
        // get the images, so i can replace srcs
        const cards = document.querySelectorAll('img');
        const cardOne = pickedCardsId[0];
        const cardTwo = pickedCardsId[1];
        if(pickedCards[0] === pickedCards[1]){
            handleMessages('success')
            cardsPlayed.push(pickedCards)
            // use a blank card to hold the space:
            cards[cardOne].setAttribute('src', './images/blank-card.JPG');
            cards[cardTwo].setAttribute('src', './images/blank-card.JPG');

        }else{
            handleMessages('fail')
            cards[cardOne].setAttribute('src', './images/question-mark.JPG');
            cards[cardTwo].setAttribute('src', './images/question-mark.JPG');
        }
        pickedCards = []
        pickedCardsId = []
        score.textContent = cardsPlayed.length;
        if(cardsArr.length/2 === cardsPlayed.length){
            message.textContent = "Congrats, fancy pants."
        }
    }
    var el = document.querySelectorAll('#site-nav__link-id');

    
    function pickCard(){
        const cardId = this.getAttribute('data-id');
        // alert(cardId)
        // save card name to compare. === is match
        pickedCards.push(cardsArr[cardId].name);
        // save card data-id so i can then get their spots replaced with a placeholder square
        pickedCardsId.push(cardId);
        // "flip" card over by switching src
        this.setAttribute('src', cardsArr[cardId].img);
        if(pickedCards.length === 2){
            setTimeout(()=>compareCards(), 500);
            
        }
    }

    function createGame(){
        triesDom.textContent = tries;
        cardsArr.forEach((el, i)=>{
            const card = document.createElement('img');
            card.setAttribute('src', './images/question-mark.JPG');
            card.setAttribute('data-id', i);
            card.addEventListener('click', pickCard)
            grid.appendChild(card);
        })
    }
    createGame();
})

