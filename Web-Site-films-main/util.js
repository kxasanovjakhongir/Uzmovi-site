function createElements(...arr) {
    return arr.map(el => {
        return document.createElement(el)
    })
}