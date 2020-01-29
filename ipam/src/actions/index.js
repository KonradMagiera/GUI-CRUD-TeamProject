import { login } from "./authentication"
import { setSubnetItem, resetSubnet, setSubnet, addSubnetInfo, deleteSubnetInfo, addSubnetVlan } from "./subnet"
import { setVlanItem, resetVlan, setVlan, addVlanInfo, deleteVlanInfo, addVlanSubnet } from "./vlan"
import { setLocation, setLocationItem, resetLocation, deleteLocationInfo, addLocationInfo } from './location'
import { fetchItems, deleteItem, addItem, updateItem, fetchAll } from './firebase'
import { setNatItem, resetNat, setNat, addNatInfo, deleteNatInfo, addNatDevice } from "./nat"
import { setHostItem, resetHost, setHost, addHostInfo, deleteHostInfo } from "./host"

export {
    login,
    setSubnetItem, resetSubnet, setSubnet, addSubnetInfo, deleteSubnetInfo, addSubnetVlan,
    setVlanItem, resetVlan, setVlan, addVlanInfo, deleteVlanInfo, addVlanSubnet,
    setLocation, setLocationItem, resetLocation, deleteLocationInfo, addLocationInfo,
    fetchItems, deleteItem, addItem, updateItem, fetchAll,
    setNatItem, resetNat, setNat, addNatInfo, deleteNatInfo, addNatDevice,
    setHostItem, resetHost, setHost, addHostInfo, deleteHostInfo
}