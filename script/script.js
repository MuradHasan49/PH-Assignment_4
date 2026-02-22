//get job Container
let jobContainer = document.getElementById('jobContainer')
//toggle button 
let toggle_all = document.getElementById('toggle-all')
let toggle_interview = document.getElementById('toggle-interview')
let toggle_rejected = document.getElementById('toggle-rejected')

//get the status

let total = document.getElementById('total')
let interview = document.getElementById('interview')
let rejected = document.getElementById('rejected')

// empty array
let interviewCount = [];
let rejectedConunt = [];

//status function
function jobStatus(){
    //claculate status
    total.innerText = jobContainer.children.length
    interview.innerText = interviewCount.length;
    rejected.innerText= rejectedConunt.length;

}
jobStatus()

//toggle button function
document.getElementById('perent').addEventListener("click",function(e){

    toggle_all.classList.add('bg-gray-300', 'text-[#64748B]')
    toggle_interview.classList.add('bg-gray-300', 'text-[#64748B]')
    toggle_rejected.classList.add('bg-gray-300', 'text-[#64748B]')

    toggle_all.classList.remove('bg-[#3B82F6]' , 'text-white')
    toggle_interview.classList.remove('bg-[#3B82F6]','text-white')
    toggle_rejected.classList.remove('bg-[#3B82F6]','text-white')

    let select = e.target
    select.classList.remove('bg-gray-300', 'text-[#64748B]')
    select.classList.add('bg-[#3B82F6]' , 'text-white')
})


jobContainer.addEventListener("click",function(e){
    let parenNode = e.target.parentNode.parentNode
    let statusOf = parenNode.querySelector('.badge')

    if(e.target.classList.contains('interviewBtn')){
        statusOf.style.color = 'green';
    statusOf.innerText = "INTERVIEW"
    }else if(e.target.classList.contains('rejectBtn')){
        statusOf.style.color = 'red';
        statusOf.innerText = "REJECTED"
    }


   if(e.target.classList.contains('deletebtn')){
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
    }
    jobStatus()
})