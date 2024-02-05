let h1Element 
let respone
function getsubject(subject) {
   var DivID = document.getElementById(subject.id);
   var divclass = document.getElementsByClassName(subject.className)
   h1Element = DivID.querySelector('h1'); 
   if(h1Element){
     let h1text = h1Element.textContent || h1Element.innerText;
      response = confirm("Do you want to start the " +h1text+ " Quiz");
     if(response){
        window.location= "/challenge.html?elementID="+subject.id+"&elementText="+ encodeURIComponent(h1text); 
        // alert("Good luck for you "+ h1text+" Test");
     }else{
        console.log("May be next time!")
     }
   }else{
    alert("No H1 element found");
   }
   return h1Element;
}

const urlParams = new URLSearchParams(window.location.search);
const elementID = urlParams.get('elementID');
let elementText = decodeURIComponent(urlParams.get('elementText'));

let clickcount=0
function getOption(option){
    var opth1 = option.textContent.trim();
    result.length = 0;
    result.push(opth1);
}

const clickableDivs  = document.querySelectorAll('.image')

clickableDivs.forEach(div =>{
    div.addEventListener('click',function(){
        clickableDivs.forEach(d =>{
            d.style.backgroundColor ='';
        })
        this.style.backgroundColor = '#B7E5B4'
    });
});

function resetDivColors(){
    clickableDivs.forEach(div=> {
        div.style.backgroundColor = '';
    })
}

let result = []
let question = document.getElementById("question");
let choices = document.querySelectorAll('h1');
let idsofh1 = Array.from(choices).map(h1 => h1.id);
var options = idsofh1.filter(item => item.startsWith('option'));
let nextbtn = document.getElementById('nbtn');
let prvbtn = document.getElementById('pbtn')
let finalAnswer; 
let nextval=0
function fetchDataAndUpdate(){
fetch('/data.json')
    .then((res) => res.json())
    .then((data) => {  
        question.textContent = nextval+1+")"+data.Subjects[elementText][nextval].question;
        const optionsHtml = data.Subjects[elementText][nextval].options; 
        finalAnswer = data.Subjects[elementText][nextval].correct_answer; 
        options.forEach((id,index)=>{
             let data = document.getElementById(id);
             data.textContent = optionsHtml[index].slice(3,100);
        });
    })
    .catch((error) => {
        console.error('Error fetching or parsing data:', error);
    });
}


fetchDataAndUpdate()
var submitbtn = document.getElementById('submitBtn');
let score =0
let displayscore = document.getElementById('score')
submitbtn.addEventListener('click',function(){
    let userAnswer = result[0]
    let correctAnswer = finalAnswer.slice(3,100)
    if(userAnswer === correctAnswer) {
        nextval++; 
        fetchDataAndUpdate()
        score++
        if(nextval>9) {
            // displayscore.className = 'settop'
            // submitbtn.style.display='none'
             window.location='/result.html?Score='+score;
        }
        // fetchDataAndUpdate()
    }
    else if(userAnswer !== correctAnswer){
        nextval++; 
        if(nextval>9) {
            // // alert(score)
            // displayscore.className = 'settop'
            // submitbtn.style.display='none'
            // clickableDivs.style.display='none';    
            window.location='/result.html?Score='+score; 
        }
        else{
            fetchDataAndUpdate()
        }
    }
    resetDivColors()
})




// nextbtn.addEventListener('click', function() {
//     nextval++; 
//     fetchDataAndUpdate()
//     if(nextval>8) {
//         nextbtn.style.display = 'none';
//     }
// });

// prvbtn.addEventListener('click', function() {
//     nextval--; // Decrement nextval by 1
//     fetchDataAndUpdate()
// })

const getdivID = document.getElementById('getdiv');
 
