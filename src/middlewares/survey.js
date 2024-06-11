import Cookies from "js-cookie"
import apiConfig from "src/configs/apiConfig"
import axios from 'axios'
import Swal from 'sweetalert2'

    const newSurvey = async () => {

        const username = Cookies.get('bch_user')
        console.log('get username = '+username)
        let uri = `https://survey.bachohospital.org/public/apis/activeSurveys/${username}`
        console.log(uri)
        try {
        const { data } = await axios.get(uri)
        console.log(data)
        if (data.count >= 1) {
            Swal.fire({
            icon: 'warning',
            title: 'คำแนะนำ!',
            text: `คุณมีแบบประเมินที่ยังไม่ดำเนินการ \n ระบบจะนำคุณเข้าสู่ระบบประเมินออนไลน์`
            }).then(okay => {
            if (okay) {
                window.location.href = `https://survey.bachohospital.org`
            }
            })
        }
        } catch (error) {
        console.log(error)
        }
    }
    
    export default newSurvey;