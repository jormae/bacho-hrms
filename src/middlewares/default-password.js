import Cookies from "js-cookie"
import apiConfig from "src/configs/apiConfig"
import axios from 'axios'
import Swal from 'sweetalert2'

    const isDefaultPassword = async () => {

        const username = Cookies.get('bch_user')
        console.log('get username = '+username)
        let uri = apiConfig.baseURL + `/auth/default-password/${username}`
        console.log(uri)
        try {
        const { data } = await axios.get(uri)
        console.log(data)
        if (data.status == 'error') {
            Swal.fire({
            icon: 'warning',
            title: 'คำแนะนำ!',
            text: data.message
            }).then(okay => {
            if (okay) {
                window.location.href = `/staff/${username}`
            }
            })
        }
        } catch (error) {
        console.log(error)
        }
    }
    
    export default isDefaultPassword;