export const emailChecker = (email: string): boolean => {

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);


}

export const passwordChecker = (password: string): boolean => {
    if (password?.length === 0) {
        return false
    }
    else if (password?.length < 8) {
        return false
    }
    else return true
}