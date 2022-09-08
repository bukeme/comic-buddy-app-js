const superheroName = document.querySelector('.superhero-name')
const superheroUniverse = document.querySelector('.superhero-universe')
const superheroPower = document.querySelector('.superhero-power')
const form = document.querySelector('form')
const listItems = document.querySelector('.list__items')

let superherosData = JSON.parse(localStorage.getItem('superheros')) || []



class SuperheroEntry {
    constructor(superheroName, superheroUniverse, superheroPower) {
        this.superheroName = superheroName
        this.superheroUniverse = superheroUniverse
        this.superheroPower = superheroPower
    }
}

class StoreSuperheros {
    static displaySuperheros() {
        listItems.innerHTML = ''
        if (!superherosData) return
        superherosData.forEach(function(data) {
            listItems.innerHTML += `<div id='${data.id}'>
                        <p>${data.superheroName}</p>
                        <p>${data.superheroUniverse}</p>
                        <p>${data.superheroPower}</p>
                        <i class="fa fa-trash" aria-hidden="true"></i>
                       </div> `
        })
    }

    static addSuperheros() {
        localStorage.setItem('superheros', JSON.stringify(superherosData))
    }

    static updateSuperherosIds() {
        if (!superherosData) return
        superherosData.forEach(function(item, index) {
            item.id = index
        })
    }

    static removeSuperhero(superhero) {
        superherosData.splice(superhero.id, 1)
        StoreSuperheros.updateSuperherosIds()
        StoreSuperheros.addSuperheros()
        StoreSuperheros.displaySuperheros()

    }
}

class SuperheroList {
    addEntry(entry) {
        superherosData.push({
            id: superherosData.length,
            superheroName: entry.superheroName,
            superheroUniverse: entry.superheroUniverse,
            superheroPower: entry.superheroPower
        })
        StoreSuperheros.addSuperheros()

    }

    clearInputs(entry) {
        superheroName.value = ''
        superheroUniverse.value = ''
        superheroPower.value = ''
    }

}

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let entry = new SuperheroEntry(superheroName.value, superheroUniverse.value, superheroPower.value)
    let list = new SuperheroList()
    if (superheroName.value && superheroUniverse.value && superheroPower.value) {
        list.addEntry(entry)
        list.clearInputs(entry)
    }
    StoreSuperheros.displaySuperheros()

})

listItems.addEventListener('click', function(e) {
    if (e.target.className === 'fa fa-trash') {
        const parent = e.target.parentElement
        StoreSuperheros.removeSuperhero(parent)
    }
})
StoreSuperheros.displaySuperheros()