import Firebase from '../firebaseConfig'

export const fetchItems = (dbRef, fun) => {
  Firebase.database().ref(`/${dbRef}`).once("value", data => {
    var items = data.val()
    if (items !== null) {
      Object.keys(items).map(key => {
        return fun(key, items[key])
      })
      document.body.style.cursor='default'
    } else {
      document.body.style.cursor='default'
      return items
    }
  })
  
}

export const deleteItem = (uniqueValue, dbRef, key, fun) => {
  var accpeted = window.confirm(`Delete ${uniqueValue}`)
  if (accpeted === true) {
    Firebase.database().ref(`/${dbRef}/${key}`).remove()
    fun(key)
  }
}

export const addItem = (dbRef, item) => {
  Firebase.database().ref(`/${dbRef}`).push(item)
}

export const updateItem = (dbRef, key, item) => {
  Firebase.database().ref(`/${dbRef}`).child(key)
    .update(item).then(() => {
      return {}
    }).catch(error => {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    })
}