import Cookies from "js-cookie"

    const verifyToken = async () => {

        const cookiesToken = Cookies.get('bch_token')
        console.log('get cookiesToken = '+cookiesToken)
        if(!cookiesToken){
            window.location = `/pages/login`

        }

        let uri = apiConfig.baseURL + '/auth/token'
        fetch(uri, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookiesToken
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if (data.status !== 'success') {
                Cookies.remove('bch_token')
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                window.location = '/pages/login'
                console.log(data)
            }
          })
          .catch(error => {
            console.error('Error:', error)
            setError('Unable to connect to database, please contact administrator')
          })
      }
    
    export default verifyToken;