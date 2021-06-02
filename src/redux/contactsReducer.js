import {Api} from "../dal/api";

let CREATE_CONTACT = "app/CREATE_CONTACT"
let DELETE_CONTACT = "app/DELETE_CONTACT"
let SET_CONTACTS = 'app/contacts/SET_CONTACTS'

let contactsState = {
    contactsData: []
}

export const contactsReducer = (state = contactsState, action) => {
    let copyState;
    switch (action.type) {
        case CREATE_CONTACT:
            copyState = {
                ...state,
                contactsData: [...state.contactsData, action.contact]
            }
            return copyState
        case DELETE_CONTACT:
            copyState = {
                ...state
            }
            let newArray =[]
            copyState.contactsData.forEach(el => {
                if (el.id !== action.contactId) {
                    newArray.push(el)
                }
            })
            copyState.contactsData = newArray
            return copyState
        case SET_CONTACTS:
            return {
                ...state,
                contactsData: action.contactsData
            }
        default:
            return state
    }
}

export let createContactSuccess = (contact) => ({
    type: CREATE_CONTACT,
    contact
})
export let deleteContactSuccess = (contactId) => ({
    type: DELETE_CONTACT,
    contactId
})
export let setContacts = (contactsData) => ({
    type: SET_CONTACTS,
    contactsData
})

export let createContact = (contact) => async (dispatch, getState) => {
    let response = await Api.createContact(contact.name, contact.phone)
    console.log(response)
    dispatch(createContactSuccess(response.data))
}

export let deleteContact = (contactId) => async (dispatch, getState) => {
    await Api.deleteContact(contactId)
    let response = await Api.getContacts()
    console.log(response)
    dispatch(setContacts(response.data))
}

export let updateContact = (contactId, phone, name) => async (dispatch, getState) => {
    await Api.updateContact(contactId, name, phone)
    let response = await Api.getContacts()
    console.log(response)
    dispatch(setContacts(response.data))
}
