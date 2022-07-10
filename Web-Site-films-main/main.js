let data = []

let divPage = document.querySelector('#div-page')
let topKinolar = document.querySelector('#top-kinolar')
let popular = document.querySelector('#popular')
let upComing = document.querySelector('#up-coming')
let nameSearch = document.querySelector('#search')
let yearSearchFirst = document.querySelector('#min')
let yearSearchSecond = document.querySelector('#max')
let searchScore = document.querySelector('#score')
let searchBtn = document.querySelector('#search-btn')
let pageNum = document.querySelector('#page-num')
let prevBtn = document.querySelector('#prev-btn')
let nextBtn = document.querySelector('#next-btn')

let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'

let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=` 
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=`

// DB
let db = window.localStorage.getItem('data')
let defaultToken = JSON.parse(db) || tokenTop

async function getData(token, page = '1') {
    let response = await fetch(token + page)
    let {results} = await response.json();
    data = results
    renderFilms(data)
}
getData(defaultToken)

function filters() {
    let arr = []
    nameSearch.value = nameSearch.value.trim()
    yearSearchFirst.value = yearSearchFirst.value.trim()
    yearSearchSecond.value = yearSearchSecond.value.trim()
    searchScore.value = searchScore.value.trim()
    
    arr = data.filter((el, i) => { 
        let name = nameSearch.value ? el.title.toLowerCase().includes(nameSearch.value.toLowerCase()) : true 
        let minDate = yearSearchFirst.value ? el.release_date.slice(0,4) >= yearSearchFirst.value : true 
        let maxDate = yearSearchSecond.value ? el.release_date.slice(0,4) <= yearSearchSecond.value : true 
        let score = searchScore.value ? el.vote_average >= searchScore.value : true 
    
        return name && minDate && maxDate && score
    })

    renderFilms(arr)
}


async function renderFilms(data) {
    divPage.textContent = ''
    for (const obj of data) {
        let [div1, img, div2, h3, span1, span2] = createElements('div', 'img', 'div', 'h3', 'span', 'span')

        div1.classList.add('movie')
        img.src = `https://image.tmdb.org/t/p/w500` + obj.poster_path
        div2.classList.add('movie-info')
        h3.textContent = obj.title
        span1.classList.add('orange')
        span1.textContent = obj.vote_average
        span2.classList.add('date')
        span2.textContent = obj.release_date

        div2.append(h3, span1)
        div1.append(img, div2, span2)
        divPage.append(div1)
    }
}

topKinolar.onclick = () => {
    window.localStorage.setItem('data', JSON.stringify(tokenTop))
    nameSearch.value = ''
    yearSearchFirst.value = ''
    yearSearchSecond.value =''
    searchScore.value = ''
    getData(tokenTop)
}

popular.onclick = () => {
    window.localStorage.setItem('data', JSON.stringify(tokenPopular))
    nameSearch.value = ''
    yearSearchFirst.value = ''
    yearSearchSecond.value =''
    searchScore.value = ''
    getData(tokenPopular)
}

upComing.onclick = () => {
    window.localStorage.setItem('data', JSON.stringify(tokenUpComing))
    nameSearch.value = ''
    yearSearchFirst.value = ''
    yearSearchSecond.value =''
    searchScore.value = ''
    getData(tokenUpComing)
}

searchBtn.onclick = () => {
    filters()
}

nextBtn.onclick = () => {
    let token_api = JSON.parse(window.localStorage.getItem('data'))
    pageNum.textContent = +pageNum.textContent + 1
    let page = pageNum.textContent
    getData(token_api, page)
}

prevBtn.onclick = () => {
    let token_api = JSON.parse(window.localStorage.getItem('data'))
    if (+pageNum.textContent > 1) {
        
        pageNum.textContent = +pageNum.textContent - 1
        let page = pageNum.textContent
        getData(token_api, page)
    }
}

