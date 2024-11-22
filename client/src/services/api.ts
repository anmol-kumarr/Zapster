

const VITE_BASE_URL=import.meta.env.VITE_BASE_URL
console.log(VITE_BASE_URL)

interface Api{
    loginRoute:string,
    otpRoute:string,
    signUpRoute:string,
    userNameCheck:string,
    getUsersList:string
}



const apiRoutes:Api={
    loginRoute:VITE_BASE_URL+'/auth/login',
    otpRoute:VITE_BASE_URL+'/auth/otp',
    signUpRoute:VITE_BASE_URL+'/auth/signup',
    userNameCheck:VITE_BASE_URL+'/auth/check-username',
    getUsersList:VITE_BASE_URL+'/user/list/username'
}

export default apiRoutes