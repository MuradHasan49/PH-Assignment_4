// element selection
const jobContainer = document.getElementById('jobContainer');
const interviewSection = document.getElementById('interviewSection');
const rejectedSection = document.getElementById('rejectedSection');

const toggleAllBtn = document.getElementById('toggle-all');
const toggleInterviewBtn = document.getElementById('toggle-interview');
const toggleRejectedBtn = document.getElementById('toggle-rejected');

const totalDisplay = document.getElementById('total');
const totalDisplay2 = document.getElementById('total2');
const interviewDisplay = document.getElementById('interview');
const rejectedDisplay = document.getElementById('rejected');


const noJobSection = document.getElementById('noJobSection');


let interviewList = [];
let rejectedList = [];


function updateJobCounts() {
    totalDisplay.innerText = jobContainer.children.length;
    interviewDisplay.innerText = interviewList.length;
    rejectedDisplay.innerText = rejectedList.length;
}


function updateNoJobStatus() {
    const isInterviewActive = !interviewSection.classList.contains('hidden');
    const isRejectedActive = !rejectedSection.classList.contains('hidden');
    const isMainActive = !jobContainer.classList.contains('hidden');

    if (isInterviewActive) {
        noJobSection.classList.toggle('hidden', interviewList.length > 0);
    }
    else if (isRejectedActive) {
        noJobSection.classList.toggle('hidden', rejectedList.length > 0);
    }
    else if (isMainActive) {
        const mainJobCount = jobContainer.querySelectorAll('.card').length;
        noJobSection.classList.toggle('hidden', mainJobCount > 0);
    }
    else {
        noJobSection.classList.add('hidden');
    }
}

function extractJobData(cardElement) {
    return {
        cardTtitle: cardElement.querySelector(".card-title").innerText,
        cardDis: cardElement.querySelector(".text-gray-600")?.innerText || cardElement.querySelector(".cardDis")?.innerText,
        priceP: cardElement.querySelector(".priceP").innerText,
        jobDis: cardElement.querySelector(".jobDis").innerText
    };
}


document.getElementById('perent').addEventListener("click", function (event) {
    const clickedBtn = event.target.closest('button');
    if (!clickedBtn) return;


    const buttons = [toggleAllBtn, toggleInterviewBtn, toggleRejectedBtn];
    buttons.forEach(btn => {
        btn.classList.remove('bg-[#3B82F6]', 'text-white');
        btn.classList.add('bg-gray-300', 'text-[#64748B]');
    });

    clickedBtn.classList.remove('bg-gray-300', 'text-[#64748B]');
    clickedBtn.classList.add('bg-[#3B82F6]', 'text-white');


    jobContainer.classList.add('hidden');
    interviewSection.classList.add('hidden');
    rejectedSection.classList.add('hidden');


    if (clickedBtn.id === 'toggle-interview') {
        renderInterviewSection();
        totalDisplay2.innerHTML = interviewList.length + " of 8 jobs";
    } else if (clickedBtn.id === 'toggle-rejected') {
        renderRejectedSection();
        totalDisplay2.innerHTML = rejectedList.length + " of 8 jobs";
    } else {
        jobContainer.classList.remove('hidden');
        totalDisplay2.innerHTML = jobContainer.children.length + " jobs";
    }

    updateNoJobStatus();
});


function renderInterviewSection() {
    interviewSection.classList.remove('hidden');
    interviewSection.innerHTML = "";

    interviewList.forEach(job => {
        const div = document.createElement("div");
        div.className = 'card bg-white shadow-md border mb-4';
        div.innerHTML = `
            <div class="card-body">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="card-title text-xl">${job.cardTtitle}</h2>
                        <p class="text-gray-600">${job.cardDis}</p>
                    </div>
                    <div class="grid gap-2 text-right">
                        <span class="badge badge-success py-4 text-white font-semibold">INTERVIEW</span>
                        <button class="btn btn-outline btn-error btn-sm deletebtn"><i class="fa-solid fa-trash"></i> Delete</button>
                    </div>
                </div>
                <p class="priceP text-sm text-gray-500 mt-2">${job.priceP}</p>
                <p class="jobDis mt-4 text-gray-700">${job.jobDis}</p>
                <div class="card-actions mt-6">
                    <button class="btn btn-outline btn-success">INTERVIEW</button>
                    <button class="rejectBtn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>`;
        interviewSection.appendChild(div);
    });
}


function renderRejectedSection() {
    rejectedSection.classList.remove('hidden');
    rejectedSection.innerHTML = "";

    rejectedList.forEach(job => {
        const div = document.createElement("div");
        div.className = 'card bg-white shadow-md border mb-4';
        div.innerHTML = `
            <div class="card-body">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="card-title text-xl">${job.cardTtitle}</h2>
                        <p class="text-gray-600">${job.cardDis}</p>
                    </div>
                    <div class="grid gap-2 text-right">
                        <span class="badge badge-error py-4 text-white font-semibold">REJECTED</span>
                        <button class="btn btn-outline btn-error btn-sm deletebtn"><i class="fa-solid fa-trash"></i> Delete</button>
                    </div>
                </div>
                <p class="priceP text-sm text-gray-500 mt-2">${job.priceP}</p>
                <p class="jobDis mt-4 text-gray-700">${job.jobDis}</p>
                <div class="card-actions mt-6">
                    <button class="interviewBtn btn btn-outline btn-success">INTERVIEW</button>
                    <button class="btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>`;
        rejectedSection.appendChild(div);
    });
}

function handleJobActions(event, source) {
    const card = event.target.closest('.card');
    if (!card) return;

    const data = extractJobData(card);
    const title = data.cardTtitle;


    if (event.target.classList.contains('interviewBtn')) {
        rejectedList = rejectedList.filter(item => item.cardTtitle !== title);
        if (!interviewList.some(item => item.cardTtitle === title)) {
            interviewList.push(data);
        }
        if (source !== 'main') card.remove();
    }

    else if (event.target.classList.contains('rejectBtn')) {
        interviewList = interviewList.filter(item => item.cardTtitle !== title);
        if (!rejectedList.some(item => item.cardTtitle === title)) {
            rejectedList.push(data);
        }
        if (source !== 'main') card.remove();
    }

    else if (event.target.classList.contains('deletebtn')) {
        card.remove();
        interviewList = interviewList.filter(item => item.cardTtitle !== title);
        rejectedList = rejectedList.filter(item => item.cardTtitle !== title);
    }


    if (source === 'main') {
        const badge = card.querySelector('.badge');
        if (event.target.classList.contains('interviewBtn')) {
            badge.className = "badge badge-success py-4 text-white font-semibold";
            badge.innerText = "INTERVIEW";
        } else if (event.target.classList.contains('rejectBtn')) {
            badge.className = "badge badge-error py-4 text-white font-semibold";
            badge.innerText = "REJECTED";
        }
    }

    updateJobCounts();
    updateNoJobStatus();

    if (source === 'interview') totalDisplay2.innerHTML = interviewList.length + " of 8 jobs";
    if (source === 'rejected') totalDisplay2.innerHTML = rejectedList.length + " of 8 jobs";
    if (source === 'main') totalDisplay2.innerHTML = jobContainer.children.length + " jobs";
}

// All EventListener
jobContainer.addEventListener('click', function (event) {
    handleJobActions(event, 'main');
});

interviewSection.addEventListener('click', function (event) {
    handleJobActions(event, 'interview');
});

rejectedSection.addEventListener('click', function (event) {
    handleJobActions(event, 'rejected');
});

updateJobCounts();
updateNoJobStatus();