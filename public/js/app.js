const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let msg1 = document.querySelector('#msg1')
let msg2 = document.querySelector('#msg2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    msg1.textContent='Loading.........................'
    msg2.textContent=''
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error)
            //console.log(data)
            msg1.textContent=data.error
        else {
           // console.log(data.location)
            msg1.textContent=data.location
            msg2.textContent=data.forecast
            //console.log(data.forecast)
        }
    })

})
        

})

