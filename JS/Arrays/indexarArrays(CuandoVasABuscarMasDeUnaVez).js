//https://www.youtube.com/watch?v=VnwOnjtbYrk - HolaMundo - 5:39min
let users = []
for (let i = 9999; i >= 0; i--) {
    users[i] = {
        id: i,
        name: Math.random().toString()
    }
}
//console.log(users)

const lista = []
for (let i = 0; i < 10000; i++) {
    lista[i] = {
        id: i,
        name: Math.random(),
        created_by: Math.floor(Math.random() * 10000)
    }
}

const usersIndexados = users.reduce((acc, el) => {
    acc[el.id] = el
    return acc
}, {})
//console.log(usersIndexados)

//AQUI SE BUSCAR
console.time('usando index') 
const conUser = lista.map(elemento => {
    return {
        ...elemento,
        created_by_user: usersIndexados[elemento.created_by]
    }
})
console.timeEnd('usando index') //2.15ms

// console.time('usando find') MAL
// const conUser = lista.map(elemento => {
//     return {
//         ...elemento,
//         created_by_user: users.find(u => {
//             u.id === elemento.created_by
//         })
//     }
// })
// console.timeEnd('usando find') //460ms