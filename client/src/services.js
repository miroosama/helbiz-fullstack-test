import client from 'axios'
const api = 'https://cors-anywhere.herokuapp.com/http://hbz-listen-test.us-west-2.elasticbeanstalk.com/api'
const token = 'HBZ90468f48ff6136f1'

 export const axiosInstance = client.create({
    baseURL: api,
    headers: {
        'Authorization': `bearer ${token}`,
    }
})

// export const axiosMongoInstance = client.create({
//    baseURL: 'https://cors-anywhere.herokuapp.com/http://localhost:5000',
// })
