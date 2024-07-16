
var countdown
const buttons = document.querySelectorAll("button")
var initialTime = 0
var remainingTime = 0
var isCalled = false
var btn
var isEnabled = true
buttons[1].addEventListener("click",function (){
    
    const hours = parseInt(document.getElementById("hours").value) || 0
    const minutes = parseInt(document.getElementById("minutes").value) || 0
    const seconds = parseInt(document.getElementById("seconds").value) || 0

    if (hours === 0 && minutes === 0 && seconds === 0){
        popUp("Please set up time")
        return
    }
   
    isClicked(buttons[1])
  
    const timeLeft = (hours * 3600) + (minutes * 60) + seconds
    if(!initialTime){
        initialTime = timeLeft
    }
    remainingTime = timeLeft
    
    if (timeLeft <= 0){
        popUp("Please enter a valid time")
        return
    }

    if (minutes > 59 || seconds > 59){
        popUp("Invalid. Please choose a number between 0 to 59.")
        return
    }
  
    

    const todayTime = Date.now()
    const futureTime = todayTime + timeLeft * 1000
    displayTimeLeft(timeLeft)

   
    clearInterval(countdown)

    countdown = setInterval(() =>{
        const secondsLeft = Math.round((futureTime - Date.now()) / 1000)
        if(secondsLeft <= 0){
            clearInterval(countdown)
            displayTimeLeft(0)
            popUp("Time's up!")
            console.log(isEnabled)
            if(isEnabled){
                const sound = new Audio("./times-up.wav")
                sound.play()
            }
        }
        displayTimeLeft(secondsLeft)
    }, 1000)


}  )

function displayTimeLeft(seconds){
    const displayHours = Math.floor(seconds / 3600)
    const displayMinutes = Math.floor((seconds % 3600)/60)
    const displaySeconds = Math.floor(seconds % 60)
    
    document.getElementById("hours").value = displayHours < 10 ? '0' + displayHours : '' + displayHours
    document.getElementById("minutes").value = displayMinutes < 10 ? '0' +displayMinutes : '' + displayMinutes
    document.getElementById("seconds").value = displaySeconds< 10 ? '0' + displaySeconds : ''  + displaySeconds


}


buttons[0].addEventListener("click", function(){
    if (initialTime === 0 && remainingTime === 0){
        popUp("Please set up time")
        return
    }
    isClicked(buttons[0])
    clearInterval(countdown)
    
})

buttons[2].addEventListener("click",function(){
    if (initialTime === 0 && remainingTime === 0){
        popUp("Please set up time")
        return
    }

    isClicked(buttons[2])
    clearInterval(countdown)
    displayTimeLeft(initialTime)
    remainingTime = initialTime

})

buttons[3].addEventListener("click", function(){
    if (initialTime === 0 && remainingTime === 0){
        popUp("Please set up time")
        return
    }
    isClicked(buttons[3])
    clearInterval(countdown)
    displayTimeLeft(0)
    remainingTime = 0
    initialTime = 0
})

function isClicked(param){
    if (isCalled === true){
        btn.classList.remove("active-btn-1")
    }
    else{
        isCalled = true
    }
    btn = param
    param.classList.add("active-btn-1")

}

function popUp(msg){
    const instruction = document.createElement("h2")
    instruction.innerHTML = msg
  
    const confirmButton = document.createElement("button")
    confirmButton.innerHTML = "Ok"

    const aside = document.createElement("aside")

    const newDiv = document.createElement("div")
    aside.appendChild(instruction)
    aside.appendChild(confirmButton)
    newDiv.appendChild(aside)
    document.body.appendChild(newDiv)
    
    newDiv.classList.add("customized-pop-up")
    confirmButton.classList.add("customized-button")
  
    confirmButton.addEventListener("click", function(){
        newDiv.remove()
    })
}

buttons[4].addEventListener("click", function toggle(){
    isEnabled = !isEnabled
    buttons[4].innerHTML = isEnabled ? `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
        </svg>` : `
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-bell-slash' viewBox='0 0 16 16'>
        <path d='M5.164 14H15c-.299-.199-.557-.553-.78-1-.9-1.8-1.22-5.12-1.22-6q0-.396-.06-.776l-.938.938c.02.708.157 2.154.457 3.58.161.767.377 1.566.663 2.258H6.164zm5.581-9.91a4 4 0 0 0-1.948-1.01L8 2.917l-.797.161A4 4 0 0 0 4 7c0 .628-.134 2.197-.459 3.742q-.075.358-.166.718l-1.653 1.653q.03-.055.059-.113C2.679 11.2 3 7.88 3 7c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0c.942.19 1.788.645 2.457 1.284zM10 15a2 2 0 1 1-4 0zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75z'/>
        </svg>`;

     
})






