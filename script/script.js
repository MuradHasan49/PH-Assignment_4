//get job Container
let jobContainer = document.getElementById('jobContainer')
// interviewSection
let interviewSection = document.getElementById('interviewSection')
// rejectedSection
let rejectedSection = document.getElementById('rejectedSection')
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
function jobStatus() {
    //claculate status
    total.innerText = jobContainer.children.length
    interview.innerText = interviewCount.length;
    rejected.innerText = rejectedConunt.length;

}
jobStatus()

//toggle button function
document.getElementById('perent').addEventListener("click", function (e) {

    toggle_all.classList.add('bg-gray-300', 'text-[#64748B]')
    toggle_interview.classList.add('bg-gray-300', 'text-[#64748B]')
    toggle_rejected.classList.add('bg-gray-300', 'text-[#64748B]')

    toggle_all.classList.remove('bg-[#3B82F6]', 'text-white')
    toggle_interview.classList.remove('bg-[#3B82F6]', 'text-white')
    toggle_rejected.classList.remove('bg-[#3B82F6]', 'text-white')

    let select = e.target
    select.classList.remove('bg-gray-300', 'text-[#64748B]')
    select.classList.add('bg-[#3B82F6]', 'text-white')

    if (select.id === 'toggle-interview') {
        jobContainer.classList.add('hidden');
        interviewSection.classList.remove('hidden');
        console.log("inter")
        interviewSection.innerHTML = "";
        interviewCount.forEach(interview => {
            let newDiv = document.createElement("div");
            newDiv.className = 'card bg-white shadow-md border  ';
            newDiv.innerHTML = `
                 <div class="card-body">
                    <div class="flex justify-between items-start">
                        <div>
                            <h2 class="card-title text-xl">${interview.cardTtitle}</h2>
                            <p class="text-gray-600">${interview.cardDis}</p>
                        </div>
                        <div class="grid gap-2">
                             <span class="badge badge-outline py-4 text-green-600 font-semibold">INTERVIEW</span>
                             <button class="btn btn-outline btn-error btn-sm deletebtn">
                                <i class="fa-solid fa-trash-can"></i> Delete
                             </button>
                        </div>
                    </div>
                     <p class="priceP text-sm text-gray-500 mt-2">
                        ${interview.priceP}
                    </p>
                    <p class="jobDis mt-4 text-gray-700">
                        ${interview.jobDis}
                    </p>
                    <div class="card-actions mt-6">
                        <button id="interviewBtn" class="interviewBtn btn btn-outline btn-success">INTERVIEW</button>
                        <button id="rejectBtn" class="rejectBtn btn btn-outline btn-error">REJECTED</button>
                    </div>
                    </div>`;
            interviewSection.appendChild(newDiv);
        });
        rejectedSection.classList.add('hidden');

    } else if ((select.id === 'toggle-rejected')) {
        jobContainer.classList.add('hidden');
        interviewSection.classList.add('hidden');

        rejectedSection.innerHTML='';

        rejectedConunt.filter(reject=>{
            let rejectDiv = document.createElement('div')
            rejectDiv.className= 'card bg-white shadow-md border  '
            rejectDiv.innerHTML=`
             <div class="card-body">
                    <div class="flex justify-between items-start">
                        <div>
                            <h2 class="card-title text-xl">${reject.cardTtitle}</h2>
                            <p class="text-gray-600">${reject.cardDis}</p>
                        </div>
                        <div class="grid gap-2">
                             <span class="badge badge-outline py-4 text-green-600 font-semibold">INTERVIEW</span>
                             <button class="btn btn-outline btn-error btn-sm deletebtn">
                                <i class="fa-solid fa-trash-can"></i> Delete
                             </button>
                        </div>
                    </div>
                     <p class="priceP text-sm text-gray-500 mt-2">
                        ${reject.priceP}
                    </p>
                    <p class="jobDis mt-4 text-gray-700">
                        ${reject.jobDis}
                    </p>
                    <div class="card-actions mt-6">
                        <button id="interviewBtn" class="interviewBtn btn btn-outline btn-success">INTERVIEW</button>
                        <button id="rejectBtn" class="rejectBtn btn btn-outline btn-error">REJECTED</button>
                    </div>
                    </div>
            `
            rejectedSection.appendChild(rejectDiv)
        })


        console.log('rej')
        rejectedSection.classList.remove('hidden');

    }
    else if (select.id === 'toggle-all') {
        jobContainer.classList.remove('hidden');
        interviewSection.classList.add('hidden');
        rejectedSection.classList.add('hidden')
        console.log('all')
    }
})


jobContainer.addEventListener("click", function (e) {
    let parenNode = e.target.parentNode.parentNode
    let statusOf = parenNode.querySelector('.badge')

    if (e.target.classList.contains('interviewBtn')) {
        statusOf.style.color = 'green';
        statusOf.innerText = "INTERVIEW"
    } else if (e.target.classList.contains('rejectBtn')) {
        statusOf.style.color = 'red';
        statusOf.innerText = "REJECTED"
    }


    if (e.target.classList.contains('deletebtn')) {
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
    }
    jobStatus()


    let cardTtitle = parenNode.querySelector(".card-title").innerText
    let cardDis = parenNode.querySelector(".cardDis").innerText
    let deletebtn = parenNode.querySelector(".deletebtn").innerText
    let priceP = parenNode.querySelector(".priceP").innerText
    let jobDis = parenNode.querySelector(".jobDis").innerText
    let interviewBtn = parenNode.querySelector(".interviewBtn").innerText
    let rejectBtn = parenNode.querySelector(".rejectBtn").innerText

    let cardD = {
        cardTtitle,
        cardDis,
        statusOf,
        deletebtn,
        priceP,
        jobDis,
        interviewBtn,
        rejectBtn

    }
    let validation = interviewCount.find(item => item.cardTtitle == cardD.cardTtitle)
    let validation2 = rejectedConunt.find(item => item.cardTtitle == cardD.cardTtitle)

    if (!validation && e.target.classList.contains('interviewBtn')) {
        interviewCount.push(cardD)
        console.log(interviewCount)
    } else if (!validation2 && e.target.classList.contains('rejectBtn')) {
        rejectedConunt.push(cardD)
    }

    jobStatus()
})

// push new el

