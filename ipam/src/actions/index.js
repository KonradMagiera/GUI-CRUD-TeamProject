import { login } from "./authentication"
import { setSubnetItem, resetSubnet, setSubnet, addSubnetInfo, deleteSubnetInfo } from "./subnet"
import { setVlanItem, resetVlan, setVlan, addVlanInfo, deleteVlanInfo, addVlanSubnet } from "./vlan"
import { setLocation, setLocationItem, resetLocation, deleteLocationInfo, addLocationInfo } from './location'
import { fetchItems, deleteItem, addItem, updateItem } from './firebase'
import { setNatItem, resetNat, setNat, addNatInfo, deleteNatInfo } from "./nat"
import { setHostItem, resetHost, setHost, addHostInfo, deleteHostInfo } from "./host"

export {
    login,
    setSubnetItem, resetSubnet, setSubnet, addSubnetInfo, deleteSubnetInfo,
    setVlanItem, resetVlan, setVlan, addVlanInfo, deleteVlanInfo, addVlanSubnet,
    setLocation, setLocationItem, resetLocation, deleteLocationInfo, addLocationInfo,
    fetchItems, deleteItem, addItem, updateItem,
    setNatItem, resetNat, setNat, addNatInfo, deleteNatInfo,
    setHostItem, resetHost, setHost, addHostInfo, deleteHostInfo
}