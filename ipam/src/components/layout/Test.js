import React from 'react'
import { sendMessage } from '../../actions/testAction'
import { connect } from 'react-redux'

const mapStateToProps = ({ testReducer }) => ({
    message: testReducer
})

const mapDispatchToProps = dispatch => ({
    sendMsg: message => dispatch(sendMessage(message))
})

export const Test = (props) => {
    props.sendMsg("Zmiana")
    return (
        <header >
            <label>{props.message}</label>
        </header>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)