// --- ১. এলিমেন্টগুলো সিলেক্ট করা (Selection) ---
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

// --- ২. ডাটা রাখার লিস্ট (State) ---
let interviewList = [];
let rejectedList = [];

// --- ৩. স্ট্যাটাস আপডেট করার ফাংশন ---
function updateJobCounts() {
    totalDisplay.innerText = jobContainer.children.length;
    interviewDisplay.innerText = interviewList.length;
    rejectedDisplay.innerText = rejectedList.length;
}

// --- ৪. কার্ড থেকে ডাটা সংগ্রহ করার ফাংশন ---
function extractJobData(cardElement) {
    return {
        cardTtitle: cardElement.querySelector(".card-title").innerText,
        cardDis: cardElement.querySelector(".text-gray-600")?.innerText || cardElement.querySelector(".cardDis")?.innerText,
        priceP: cardElement.querySelector(".priceP").innerText,
        jobDis: cardElement.querySelector(".jobDis").innerText
    };
}

// --- ৫. টগল বাটন বা নেভিগেশন লজিক ---
document.getElementById('perent').addEventListener("click", function (event) {
    const clickedBtn = event.target.closest('button');
    if (!clickedBtn) return;

    // সব বাটনের ডিজাইন রিসেট করা
    // ১. সবগুলো বাটন একটি অ্যারের মধ্যে রাখা
    const buttons = [toggleAllBtn, toggleInterviewBtn, toggleRejectedBtn];

    buttons.forEach(btn => {
        // প্রথমে সব বাটন থেকে নীল কালার সরিয়ে ধূসর কালার দেওয়া
        btn.classList.remove('bg-[#3B82F6]', 'text-white');
        btn.classList.add('bg-gray-300', 'text-[#64748B]');
    });

    // ২. শুধুমাত্র যে বাটনটি ক্লিক করা হয়েছে (clickedBtn), সেটিতে নীল কালার দেওয়া
    clickedBtn.classList.remove('bg-gray-300', 'text-[#64748B]');
    clickedBtn.classList.add('bg-[#3B82F6]', 'text-white');

    // সব সেকশন হাইড করা
    jobContainer.classList.add('hidden');
    interviewSection.classList.add('hidden');
    rejectedSection.classList.add('hidden');

    // যে বাটন ক্লিক করা হয়েছে সেই সেকশন দেখানো
    if (clickedBtn.id === 'toggle-interview') {
        renderInterviewSection();
        totalDisplay2.innerHTML = interviewList.length + " jobs";
    } else if (clickedBtn.id === 'toggle-rejected') {
        renderRejectedSection();
        totalDisplay2.innerHTML = rejectedList.length + " jobs";;

    } else {
        totalDisplay2.innerHTML = jobContainer.children.length + " jobs";;
        jobContainer.classList.remove('hidden');
    }
});

// --- ৬. ইন্টারভিউ সেকশন রেন্ডার করা ---
function renderInterviewSection() {
    interviewSection.classList.remove('hidden');
    interviewSection.innerHTML = ""; // আগের ডাটা পরিষ্কার করা

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
                <button class=" btn btn-outline btn-success">INTERVIEW</button>
                    <button class="rejectBtn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>`;
        interviewSection.appendChild(div);
    });
}

// --- ৭. রিজেক্টেড সেকশন রেন্ডার করা ---
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
                     <button class=" btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>`;
        rejectedSection.appendChild(div);
    });
}

// --- ৮. কমন হ্যান্ডলার (মুভ এবং ডিলিট করার জন্য) ---
function handleJobActions(event, source) {
    const card = event.target.closest('.card');
    if (!card) return;

    const data = extractJobData(card);
    const title = data.cardTtitle;

    // মুভ টু ইন্টারভিউ
    if (event.target.classList.contains('interviewBtn')) {
        rejectedList = rejectedList.filter(item => item.cardTtitle !== title);
        if (!interviewList.some(item => item.cardTtitle === title)) {
            interviewList.push(data);
        }
        if (source !== 'main') card.remove();
    }
    // মুভ টু রিজেক্টেড
    else if (event.target.classList.contains('rejectBtn')) {
        interviewList = interviewList.filter(item => item.cardTtitle !== title);
        if (!rejectedList.some(item => item.cardTtitle === title)) {
            rejectedList.push(data);
        }
        if (source !== 'main') card.remove();
    }
    // ডিলিট করা
    else if (event.target.classList.contains('deletebtn')) {
        card.remove();
        interviewList = interviewList.filter(item => item.cardTtitle !== title);
        rejectedList = rejectedList.filter(item => item.cardTtitle !== title);
    }

    // অল জব সেকশনে ব্যাজ আপডেট
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
}

// ১. মেইন জব কন্টেইনারের জন্য লিসেনার
jobContainer.addEventListener('click', function (e) {
    handleJobActions(e, 'main');
});

// ২. ইন্টারভিউ সেকশনের জন্য লিসেনার
interviewSection.addEventListener('click', function (e) {
    handleJobActions(e, 'interview');
});

// ৩. রিজেক্টেড সেকশনের জন্য লিসেনার
rejectedSection.addEventListener('click', function (e) {
    handleJobActions(e, 'rejected');
});
// শুরুতে একবার কাউন্ট চালানো
updateJobCounts();