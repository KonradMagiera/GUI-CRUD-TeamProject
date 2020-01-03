import React from 'react';
import Firebase from '../../firebaseConfig';

class RegisterSubnet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routable: false,
            public_or_dmz: false,
            ip_assignment: false
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        Firebase.database().ref('/subnets').push({
            "ip_address": e.target.ip_address.value,
            "netmask": e.target.netmask.value,
            "vlan": e.target.vlan.value,
            "nameservers": e.target.nameservers.value,
            "location": e.target.location.value,
            "is_routable": e.target.is_routable.checked,
            "public_or_dmz": e.target.public_or_dmz.checked ? "Public" : "DMZ",
            "ip_assignment": e.target.ip_assignment.checked ? "Static" : "Dynamic",
            "description": e.target.description.value
        })
    }

    handleCheckboxChange = e => {
        const item_name = e.target.name;
        
        if (item_name === "is_routable") {
            this.setState(prevState => ({
                routable: !prevState.routable
            }))
        } else if (item_name === "public_or_dmz") {
            this.setState(prevState => ({
                public_or_dmz: !prevState.public_or_dmz
            }))
        } else if (item_name === "ip_assignment") {
            this.setState(prevState => ({
                ip_assignment: !prevState.ip_assignment
            }))
        }
    }

    render() {
        return (
            <form onSubmit={(e) => { this.handleSubmit(e) }}>
            <div>
                <h2>Register subnet</h2>
            </div>
            <div>
                <label>IP address</label>
            </div>
            <div>
                <input type="text" name="ip_address" placeholder="ip_address"/>
            </div>
            <div>
                <label>Netmask</label>
            </div>
            <div>
                <input type="text" name="netmask" placeholder="netmask"/>
            </div>
            <div>
                <label>VLAN</label>
            </div>
            <div>
                <input type="text" name="vlan" placeholder="vlan"/>
            </div>
            <div>
                <label>Nameservers</label>
            </div>
            <div>
                <input type="text" name="nameservers" placeholder="nameservers"/>
            </div>
            <div>
                <label>Location</label>
            </div>
            <div>
                <input type="text" name="location" placeholder="location"/>
            </div>
            <div>
                <label>Is routable?</label>
            </div>
            <div>
                <input type="checkbox" value="routable" name="is_routable" checked={this.state.routable} onChange={e => this.handleCheckboxChange(e)}/>Yes
                <input type="checkbox" value="not_routable" checked={!this.state.routable} onChange={e => this.handleCheckboxChange(e)}/>No
            </div>
            <div>
                <label>Public / DMZ</label>
            </div>
            <div>
                <input type="checkbox" value="public" name="public_or_dmz" checked={this.state.public_or_dmz} onChange={e => this.handleCheckboxChange(e)}/>Public
                <input type="checkbox" value="dmz" checked={!this.state.public_or_dmz} onChange={e => this.handleCheckboxChange(e)}/>DMZ
            </div>
            <div>
                <label>IP assignment?</label>
            </div>
            <div>
                <input type="checkbox" value="static" name="ip_assignment" checked={this.state.ip_assignment} onChange={e => this.handleCheckboxChange(e)}/>Static
                <input type="checkbox" value="dynamic" checked={!this.state.ip_assignment} onChange={e => this.handleCheckboxChange(e)}/>Dynamic
            </div>
            <div>
                <label>Description</label>
            </div>
            <div>
                <input type="text" name="description" placeholder="description"/>
            </div>
            <div>
                <button>Register</button>
            </div>
        </form>
        )
    }
}

export default RegisterSubnet