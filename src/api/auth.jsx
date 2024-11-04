import axios from 'axios'

export const currentAdmin = async(token) => {
    return await axios.post('http://localhost:8099/api/current-admin',{},{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const searchFilters = async(arg) => {
    //code body
    return axios.post('http://localhost:8099/api/admin/search/post/',arg)
}