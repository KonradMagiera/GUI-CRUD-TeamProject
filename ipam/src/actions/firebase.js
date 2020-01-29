import Firebase from '../firebaseConfig'
import { addHostInfo, addLocationInfo, addNatInfo, addSubnetInfo, addVlanInfo } from './index'

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

export const fetchAll = () => {
  const references = ["hosts", "locations", "nats", "subnets", "vlans"]
  const methods = [addHostInfo, addLocationInfo, addNatInfo, addSubnetInfo, addVlanInfo]
  for(var i = 0; i < methods.length; i++){
    console.log(references[i], methods[i])
    fetchItems(references[i], methods[i])
  }
  
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

export const exportDB = (download) => {
  Firebase.database().ref('/').once('value', (ipam) => {
    download("ipam.json", JSON.stringify(ipam.val()))
  })
}