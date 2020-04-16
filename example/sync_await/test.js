const getUsers = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve([{ id: 'jon' }, { id: 'andrey' }, { id: 'tania' }]), 2000)
  })
}

const getIdFromUser = users => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(users.id), 1000)
  })
}

const capitalizeIds = id => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(id.toUpperCase()), 100)
  })
}

const runAsyncFunctions = async () => {
  console.log("> ##### TEST1");
  const users = await getUsers()
  console.log(users)

  for (let user of users) {
    const userId = await getIdFromUser(user)
    console.log("1:" + userId)

    const capitalizedId = await capitalizeIds(userId)
    console.log("1:" + capitalizedId)
  }

  console.log("< ##### TEST1");
}


runAsyncFunctions()


const runAsyncFunctionsAll = async () => {
  console.log("> ##### TEST2");
  const users = await getUsers()
  console.log(users)

  Promise.all(
    users.map(async user => {
      const userId = await getIdFromUser(user)
      console.log("2:" + userId)

      const capitalizedId = await capitalizeIds(userId)
      console.log("2:" + capitalizedId)
    })
  )

  console.log("< ##### TEST2");
}

runAsyncFunctionsAll()

