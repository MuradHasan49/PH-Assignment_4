rejectedSection.innerHTML = '';
        rejectedSection.find(reject => {
            let newRejectdiv = document.createElement('div')
            newRejectdiv.className = 'card bg-white shadow-md border';
            newRejectdiv.innerHTML = `
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
        `
            rejectedSection.appendChild(newRejectdiv)

        })