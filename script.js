const url = 'https://openapi.programming-hero.com/api/levels/all'
const loadLevels = () => {
    fetch(url)
        .then((res) => res.json())
        .then(levels => displayLessons(levels.data));
}
// Level Section
const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = '';

    for (const lesson of lessons) {
        const btnDiv = document.createElement('div')

        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary border-[#422AD5] rounded">
        <i class="fa-solid fa-bookmark"></i>Lesson - ${lesson.level_no}
        </button>
        `
        levelContainer.appendChild(btnDiv);
    }
}
// Words Of Level Section
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then(words => displayWords(words.data));
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
        return;
    }



    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML = `
                <div class="card-body  w-80 bg-[#FFFFFF] rounded shadow-md flex justify-center gap-2 p-10 text-center">
                    <h2 class="card-title-center text-2xl">
                        ${word.word ? word.word :"No Word Is Found"}
                    </h2>
                    <p class="text-md">Meaning /Pronounciation</p>
                    <p class="text-2xl">${word.meaning ? word.meaning:"No Meaning Is Found"}/${word.pronunciation}</p>
                    <div class= flex justify-between items-center">
                        <div class="bg-[#1A91FF1A] w-14 h-14 rounded-lg flex justify-center items-center"><i
                                class="fa-solid fa-circle-info"></i></div>
                        <div class="bg-[#1A91FF1A] w-14 h-14 rounded-lg flex justify-center items-center"><i
                                class="fa-solid fa-volume-high"></i></div>
                    </div>
                </div>
        `
        wordContainer.appendChild(card)
    });


}
loadLevels()