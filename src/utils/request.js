import axios from "axios";
const request =axios.create(
    {
        url:'http://localhost:9090/'
    }
)
export default request;
