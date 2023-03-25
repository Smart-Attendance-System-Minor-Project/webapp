import axios from 'axios';




const login = async (userData) => {
            
           const response = await axios.post("https://wellattend.pythonanywhere.com/attendance/login/",userData);

         
           if(response.data)
           {
            localStorage.setItem("token",response.data.access)
            localStorage.setItem('username',response.data.username);
            localStorage.setItem("fullName",response.data.full_name);
           }
    
           return response.data

}

const authService = {
    login

}

export default authService