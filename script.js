const url = 'https://openapi.programming-hero.com/api/levels/all'
const loadLevels = () => {
    fetch(url)
        .then((res) => res.json())
        .then((levels) => displayLessons(levels.data));
}
// Level Section
const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = '';

    for (const lesson of lessons) {
        const btnDiv = document.createElement('div')

        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary border-[#422AD5] rounded lessonBtnClass">
        <i class="fa-solid fa-bookmark"></i>Lesson - ${lesson.level_no}
        </button>
        `
        levelContainer.appendChild(btnDiv);
    }
}
// lesson Button
const removeActive = () => {
    const lessonBtnClass = document.querySelectorAll(".lessonBtnClass")
    lessonBtnClass.forEach(btn => {
        btn.classList.remove("active");
    })

}
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove("hidden");
        document.getElementById('word-container').classList.add("hidden");
    }
    else {
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}
// Words Of Level Section
const loadLevelWord = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then(words => {
            removeActive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add('active');
            displayWords(words.data)
        });
}

const displayWords = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';
    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div id="info" class=" col-span-3  bg-[#F8F8F8] p-8 m-2 space-y-4">
            <img class="mx-auto" src="assets/alert-error.png" alt="">
            <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-2xl">নেক্সট Lesson এ যান</h1>
        </div>
        `;
        manageSpinner(false);
        return;
    }

    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML = `
                <div class="card-body w-full conatiner mx-auto  md:w-80 md:h-60 bg-[#FFFFFF] rounded shadow-md flex justify-center gap-2 p-10 text-center">
                    <h2 class="card-title-center text-2xl">
                        ${word.word ? word.word : "No Word Is Found"}
                    </h2>
                    <p class="text-md">Meaning /Pronounciation</p>
                    <p class="text-2xl">${word.meaning ? word.meaning : "No Meaning Is Found"}/${word.pronunciation}</p>
                    <div class="flex justify-between items-center">
                        <div onclick="loadWordDetails(${word.id})" class="btn btn-soft btn-primary hover:bg-primary bg-[#1A91FF1A] w-14 h-14 rounded-lg flex justify-center items-center"><i
                                class="fa-solid fa-circle-info"></i></div>
                        <div class="btn btn-soft btn-primary hover:bg-primary bg-[#1A91FF1A] w-14 h-14 rounded-lg flex justify-center items-center"><i
                                class=" fa-solid fa-volume-high"></i></div>
                    </div>
                </div>
        `

        wordContainer.append(card)
    });
    manageSpinner(false)


}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails = (word) => {
    console.log(word);
    const detailContainer = document.getElementById("detail-container");
    detailContainer.innerHTML = `
    <div class="">
            <h1 class="text-3xl">${word.word} (<i class="fa-solid fa-microphone"></i>: ${word.pronunciation} )</h1>
            <div class="">
                <h3 class="text-2xl">Meaning</h3>
                <p class="text-xl">${word.meaning}</p>
            </div>
        </div>
        <div class="">
            <h1 class="text-2xl">Example</h1>
            <p class="text-xl text-neutral-700">${word.sentence}</p>
        </div>
        <div>
            <h1 class=" text-xl">সমার্থক শব্দ গুলোসমার্থক শব্দ গুলো</h1>
            <div class="flex items-center gap-3">
                <p class="bg-[#EDF7FF] border rounded-lg p-2 m-2]">${word.synonyms[0] ? word.synonyms[0] : "Not Available To The Database"}</p>
                <p class="bg-[#EDF7FF] border rounded-lg p-2 m-2]">${word.synonyms[1] ? word.synonyms[0] : "Not Available To The Database"}</p>
                <p class="bg-[#EDF7FF] border rounded-lg p-2 m-2]">${word.synonyms[2] ? word.synonyms[0] : "Not Available To The Database"}</p>
            </div>
        </div>
    `
    document.getElementById("my_modal_5").showModal();

}



loadLevels()