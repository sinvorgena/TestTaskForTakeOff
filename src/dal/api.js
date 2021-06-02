import * as axios from "axios";

const instance = axios?.create({
    baseURL: "http://localhost:5000/"
})

export const Api = {
    token:'',
    getAuth(login, password) {
        const that = this
        return instance.post('auth/login', {
            email: `${login}`,
            password: `${password}`
        }).then((response) => {
            that.token = response.data.access_token
            console.log(that.token)
            console.log(this.token)
            return response

        }).catch((e) => {
            return e.response

        })
    },
    getContacts() {
        return instance.get('posts', {
            headers: {'Authorization': `Bearer ${this.token}`}
        })
    },
    createContact(name, phone) {
        const that = this
        return instance.post('posts', {
            fullName: `${name}`,
            phoneNumber: `${phone}`,

        }, {
            headers: {'Authorization': `Bearer ${that.token}`}
        })
    },
    updateContact(id, name, phone) {
        return instance.put(`posts/${id}`, {
            fullName: `${name}`,
            phoneNumber: `${phone}`,
        },{
            headers: {'Authorization': `Bearer ${this.token}`}
        })
    },
    deleteContact(id) {
        return instance.delete(`posts/${id}`, {
            headers: {'Authorization': `Bearer ${this.token}`}
        })
    }
}