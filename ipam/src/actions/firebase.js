import  Firebase  from '../firebaseConfig'

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