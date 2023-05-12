---
layout: "@layouts/BlogPost.astro"
title: Why You Should Never Store Derived State
date: "2019-11-04"
description: "The quickest way to have corrupt out of sync state is by storing derived state."
tags: ["React"]
---

We have all done it. You are working on a React app when all of a sudden your state becomes out of sync. There are many reasons for this problem, but incorrectly storing derived state is one of the most common and hardest to spot causes.

## What Is Derived State?

So it is bad to mishandle derived state, but what exactly is derived state. In essence, derived state is some state in an application that can be derived or created from the already stored state of that application. Since this definition is pretty vague, here is a concrete example of derived state. Imagine an app with 3 counters that all store their count in state. The total of adding those 3 counters together would be derived state since that total value is derived from the counter values in the state. Storing that total in the state is what needs to be avoided, because when derived state is stored in state it makes it very easy for state to become out of sync. Let's look at a more concrete example.

## How To Spot Derived State

Imagine a component that has state for a list of users with a name and id.

```javascript
function User() {
  const [users, setUsers] = useState([
    { id: 1, name: "Kyle" },
    { id: 2, name: "John" },
  ])

  function updateUser(id, name) {
    setUsers(prevUsers => {
      const newUsers = [...prevUsers]
      const user = newUsers.find(user => user.id === id)
      user.name = name
      return newUsers
    })
  }

  return users.map(user => user.name).join(", ")
}
```

This is all good and there is no derived state, but what if this app needed to account for the `selectedUser` as well. One way that many people tackle this problem is by doing this.

```javascript
function User() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Kyle' },
    { id: 2, name: 'John' }
  ])
  const [selectedUser, setSelectedUser] = useState()

  function selectUser(id) {
    const user = users.find(user => user.id === id)
    setSelectedUser({ ...user }
  }

  function updateUser(id, name) {
    setUsers(prevUsers => {
      const newUsers = [...prevUsers]
      const user = newUsers.find(user => user.id === id)
      user.name = name
      return newUsers
    })
  }

  return users.map(user => user.name).join(', ')
}
```

At first glance this code may look correct, and it most likely will work when you test it, but there is a huge problem. This code is storing derived state. At first it isn't obvious any derived state is stored since none of the state directly adds up into any of the other state, but the `selectedUser` is derived state from the `users` array. This is because the `name` of the `selectedUser` is defined in the `users` array and should not be duplicated in the `selectedUser` variable. By having this duplication the app needs to update the `selectedUser` every time that user is changed in the `users` array. To illustrate why this is a problem here is some code that sets the `selectedUser` and then updates that user in the `users` array.

```javascript
function User() {
  const [users, setUsers] = useState([
    { id: 1, name: "Kyle" },
    { id: 2, name: "John" },
  ])
  const [selectedUser, setSelectedUser] = useState()

  useEffect(() => {
    selectUser(1)
    updateUser(1, "Kate")
  }, [])

  function selectUser(id) {
    const user = users.find(user => user.id === id)
    setSelectedUser({ ...user })
  }

  function updateUser(id, name) {
    setUsers(prevUsers => {
      const newUsers = [...prevUsers]
      const user = newUsers.find(user => user.id === id)
      user.name = name
      return newUsers
    })
  }

  return users.map(user => user.name).join(", ")
}
```

After this component runs it will set the `selectedUser` to a copy of user 1 which has a name of Kyle. It will then update user 1 to give them a name of Kate. This leaves the state of the application out of sync since the `selectedUser` has a name of Kyle still since it was not updated, but the `users` array has the correct name of Kate for that user. Luckily, this is incredibly easy to fix. All the component needs to do is store the id of the selected user instead of a copy of the entire user.

```javascript
function User() {
  const [users, setUsers] = useState([
    { id: 1, name: "Kyle" },
    { id: 2, name: "John" },
  ])
  const [selectedUserId, setSelectedUserId] = useState()
  const selectedUser = users.find(user => {
    return user.id === selectedUserId
  })

  useEffect(() => {
    selectUser(1)
    updateUser(1, "Kate")
  }, [])

  function selectUser(id) {
    setSelectedUserId(id)
  }

  function updateUser(id, name) {
    setUsers(prevUsers => {
      const newUsers = [...prevUsers]
      const user = newUsers.find(user => user.id === id)
      user.name = name
      return newUsers
    })
  }

  return users.map(user => user.name).join(", ")
}
```

Now the `selectedUser` is being derived from the state instead of being stored in the state. This means the component never has to worry about updating the `users` array without updating the `selectedUser`.

## Bonus Tip (useMemo)

The one big downside to not storing data in state is that the data needs to be recomputed every render. Luckily, React has thought of this already and has a hook called `useMemo` for this exact problem. When state is derived that is slow and/or cpu intensive the `useMemo` hook can be used to only recompute the value when the state it is derived from is changed. In our previous example the code that sets the `selectedUser` would look like this if it used `useMemo`.

```javascript
const selectedUser = useMemo(() => {
  return users.find(user => user.id === selectedUserId)
}, [users, selectedUserId])
```

This hook works very similar to `useEffect` in that the first parameter is a function that is run every time the dependencies in the second argument array change. This means that to use this hook the first parameter should be the function that derives the state just as if `useMemo` was not being used. Then the second parameter is an array of all the state that this variable is derived from. It is as simple as that. React will take care of all the memoization for you.

As a reminder, `useMemo` should only be used with values that are slow to calculate. In this example the selectedUser is quick to calculate so the extra overhead of `useMemo` will not give any speed increases and may actually slow the app down.
