const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult(){
    var result = select.indexOf(Math.max(...select));
    return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;
  
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.jpeg';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
  
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)
    })
    setResult();
}

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    
    a.appendChild(answer);
    answer.innerHTML = answerText;
    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++){
                select[target[i]] += 1;
            }
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}

function imageNext(qIdx, idx){
    let leftImage =  document.querySelector('.leftImage');
    let rightImage = document.querySelector('.rightImage');

    leftImage.disabled = true;
    leftImage.style.WebkitAnimation = "fadeOut 0.5s";
    leftImage.style.animation = "fadeOut 0.5s";      
    
    rightImage.disabled = true;
    rightImage.style.WebkitAnimation = "fadeOut 0.5s";
    rightImage.style.animation = "fadeOut 0.5s";  

    setTimeout(() => {
        var target = qnaList[qIdx].a[idx].type;
        for(let i = 0; i < target.length; i++){
            select[target[i]] += 1;
        }
        imageAnswer.style.display = 'none';
        qna.style.display = 'block';
        goNext(++qIdx);
    }, 450)
}

function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }
    
    if(qIdx == 7){
        qna.style.display = 'none';
        imageAnswer.style.display = "block";
        var q = document.querySelector('.imageQBox');
        q.innerHTML = qnaList[7].q;
        var status = document.querySelector('.imageStatusBar');
        status.style.width = (100/endPoint) * 8 + '%';

        let leftImage =  document.querySelector('.leftImage');
        let rightImage = document.querySelector('.rightImage');

        let qnaURL = './img/';
        let leftURL = qnaURL + 'J_wallpaper.png';
        let rightURL = qnaURL + 'P_wallpaper.png';

        leftImage.src = leftURL;
        rightImage.src = rightURL;

        leftImage.style.display = 'block';
        rightImage.style.display = 'block';

        leftImage.addEventListener("click", function(){
            imageNext(qIdx, 0);
        }, false);

        rightImage.addEventListener("click", function(){
            imageNext(qIdx, 1);
        }, false);
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;

    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx + 1) + '%';

    if(qIdx != 7)
    {
        for(let i in qnaList[qIdx].a){
            addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
        }
    }
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}