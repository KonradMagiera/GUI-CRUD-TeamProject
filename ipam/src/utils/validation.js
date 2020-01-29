export function validateIPaddress(ipaddress) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    .test(ipaddress)) {
    return true
  }
  return false
}

export function validateNetmask(netmask) {
  if (/^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/
    .test(netmask)) {
    return true
  }
  return false
}

export function validateMACAddress(mac) {
  if(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(mac)) {
    return true
  }
  return false
}