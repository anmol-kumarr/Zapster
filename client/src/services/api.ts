const BASE_URL=process.env.BASE_URL

interface Api{
    loginRoute:string,
    otpRoute:string,
    signUpRoute:string,
    userNameCheck:string,
}



const apiRoutes:Api={
    loginRoute:BASE_URL+'/auth/login',
    otpRoute:BASE_URL+'/auth/otp',
    signUpRoute:'/auth/signup',
    userNameCheck:'/auth/check-username'
}

export default apiRoutes