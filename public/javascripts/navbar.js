
    const profile = document.querySelector(".avatar")
    const logoutwindow= document.querySelector(".miniwindow")
   const container= document.querySelector(".container")

    profile.addEventListener("click",()=>{
 
    logoutwindow.classList.toggle('activestate')
    
    })

container.addEventListener("click",()=> {
logoutwindow.classList.remove("activestate");
})