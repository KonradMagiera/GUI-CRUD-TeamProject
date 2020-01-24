import Firebase from '../firebaseConfig'

export const fetchItems = (dbRef, fun) => {
  Firebase.database().ref(`/${dbRef}`).once("value", data => {
    var items = data.val()
    if (items !== null) {
      Object.keys(items).map(key => {
        return fun(key, items[key])
      })
    } else {
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