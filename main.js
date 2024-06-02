let fixedNav = document.querySelector(".header")
let scrollBtn = document.querySelector(".scrollBtn")
window.addEventListener("scroll",() => {
    window.scrollY > 100 ? fixedNav.classList.add("active") : fixedNav.classList.remove("active")
    window.scrollY > 500 ? scrollBtn.classList.add("active") : scrollBtn.classList.remove("active")
})
scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})


let exploreBtn = document.querySelector(".title .btn")
let hadithSection = document.querySelector(".hadith")
exploreBtn.addEventListener("click", ()=>{
    hadithSection.scrollIntoView({
        behavior : "smooth"
    })
})



// Hadith Change
let hadithContainer = document.querySelector(".hadithContainer")
let next = document.querySelector(".buttons .next")
let prev = document.querySelector(".buttons .prev")
let number = document.querySelector(".buttons .number")
let hadithIndex = 0
HadithChanger()
function HadithChanger (){
    // axios.get("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    axios.get("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.json")
        .then(function (response) {
            // handle success
            // console.log(response.data)
            // console.log(response.data.hadiths[0].text);
            let hadiths = response.data.hadiths
            hadithContainer.innerText = hadiths[hadithIndex].text
            number.innerText = `7589 / ${hadithIndex + 1}`
            next.addEventListener("click",()=>{
                hadithIndex == 7588 ? hadithIndex = 0 : hadithIndex++
                hadithContainer.innerText = hadiths[hadithIndex].text
                number.innerText = `7589 / ${hadithIndex + 1}`
            })
            prev.addEventListener("click",()=>{
                hadithIndex == 0 ? hadithIndex = 7588 : hadithIndex--
                hadithContainer.innerText = hadiths[hadithIndex].text
                number.innerText = `7589 / ${hadithIndex + 1}`
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
    })
}

let sections = document.querySelectorAll("section")
let links = document.querySelectorAll(".header ul li")
links.forEach(link => {
    link.addEventListener("click", () =>{
        document.querySelector(".header ul li.active").classList.remove("active")
        link.classList.add("active")
        let target = link.dataset.filter
        sections.forEach(section => {
            if(section.classList.contains(target)){
                section.scrollIntoView({
                    behavior: "smooth"
                })
            }
        })
    })
})

// Surah Api

let surhsContainer = document.querySelector(".surahsContainer")
function getSurahs(){
    surhsContainer.innerHTML = ""
    axios.get(" https://api.alquran.cloud/v1/meta")
        .then(function (response) {
            // handle success
            // console.log(response)
            let surahs = response.data.data.surahs.references
            let numberOfSurahs = 114
            for(let i = 0; i < numberOfSurahs ; i++){
                surhsContainer.innerHTML += `
                <div class="surah">
                    <p>${surahs[i].name}</p>
                    <p>${surahs[i].englishName}</p>
                </div>
                `
            }
            let surahTitles = document.querySelectorAll(".surah")
            let popup = document.querySelector(".surah-popup")
            let ayatContainer = document.querySelector(".ayat")

            surahTitles.forEach((title,index) => {
                title.addEventListener("click", () => {
                    axios.get(`https://api.alquran.cloud/v1/surah/${index + 1}`)
                        .then(function (response){
                            ayatContainer.innerHTML = ""
                            let ayat = response.data.data.ayahs
                            if(index != 0){
                                ayat[0].text = ayat[0].text.slice(38)
                            }
                            if(index == 0){
                                document.querySelector(".basmala").style.display = "none"
                            }else{
                                document.querySelector(".basmala").style.display = "block"
                            }
                            ayat.forEach(aya => {
                                popup.classList.add("active")
                                ayatContainer.innerHTML += `
                                    <p>${aya.numberInSurah} - ${aya.text}</p>
                                `
                            })
                        })
                        .catch(function (error){
                            console.log(error)
                        })
                })
            })

            let closePopup = document.querySelector(".close-popup")
            closePopup.addEventListener("click",()=>{
                popup.classList.remove("active")
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
    })
}
getSurahs()


// PrayTime Api
let getPrayerBtn = document.querySelector(".prayerInputContainer button")
let cityInput = document.querySelector("#cityInput")
let countryInput = document.querySelector("#countryInput")
let city = ""
let country = ""



let cards = document.querySelector(".cards")
function getPrayTime(){
    axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8`)
    .then(function (response){
        let times = response.data.data.timings
        cards.innerHTML = ""
        for(let time in times){
            if(time == "Firstthird" || time == "Imsak" || time == "Midnight" || time == "Lastthird"){
                continue
            }else{
                cards.innerHTML += `
                <div class="card">
                    <div class="circle">
                        <svg>
                            <Circle cx="100" cy="100" r="100"></Circle>
                        </svg>
                        <div class="praytime">
                            ${times[time]}
                        </div>
                    </div>
                    <p>${time}</p>
                </div>
                `
            }
        }
    })
    .catch(function(error){
        console.log(error)
    })
}



getPrayerBtn.addEventListener("click", () =>{
    city = cityInput.value
    country = countryInput.value
    cityInput.value = ""
    countryInput.value = ""
    if(city != "" && country != ""){
        getPrayTime()
    }else{
        alert("Renter The City & Country You Want To get Prayer Times")
    }
})
// getPrayTime()







// Show and Hide Side Bar
let bars = document.querySelector(".bars")
let sideBar = document.querySelector(".header ul")
bars.addEventListener("click", () => {
    sideBar.classList.toggle("active")
})