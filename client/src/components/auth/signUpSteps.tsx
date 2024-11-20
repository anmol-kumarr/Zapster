import { Box, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

import { SignUpDetails } from "../../pages/signUp";
import { Label } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";



type SetDetails = React.Dispatch<React.SetStateAction<SignUpDetails>>

interface FullNameProps {
    fullName: string,
    setDetails: SetDetails
}

interface EmailProps {
    email: string,
    setDetails: SetDetails
}

export const FullName: React.FC<FullNameProps> = ({ fullName, setDetails }) => {
    return (
        <div>
            <TextField
                onChange={(e) => setDetails(prev => ({ ...prev, fullName: e.target.value }))}
                value={fullName}
                sx={{
                    '& .MuiInputBase-root': { height: 50, color: '#6E00FF' },
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#6E00FF' },
                        '&.Mui-focused fieldset': { borderColor: '#6E00FF' },
                        '& input': { color: '#6E00FF' },
                        '&::placeholder': { fontSize: '2px' }
                    },
                    '& .MuiInputLabel-root': { color: '#6E00FF' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#6E00FF' }
                }}
                label='Enter your Full name' variant='outlined'
                fullWidth
                margin='normal'
                type="text"
            ></TextField>
        </div>
    )
}




export const Email: React.FC<EmailProps> = ({ email, setDetails }) => {
    return (
        <div>
            <TextField
                onChange={(e) => setDetails(prev => ({ ...prev, email: e.target.value }))}
                value={email}
                sx={{
                    '& .MuiInputBase-root': { height: 50, color: '#6E00FF' },
                    '& .MuiInputLabel-root': { color: '#6E00FF' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#6E00FF' },
                        '&:hover fieldset': { borderColor: '#6E00FF' },
                        '&.Mui-focused fieldset': { borderColor: '#6E00FF' },
                        '& input': { color: '#6E00FF' },
                        '&::placeholder': { fontSize: '2px' }
                    }
                }}
                label='Enter your email' variant='outlined'
                fullWidth
                margin='normal'
                type="email"
            ></TextField>
        </div>
    )
}

interface GenderProps {
    gender: string,
    setDetails: React.Dispatch<React.SetStateAction<SignUpDetails>>
}

export const Gender: React.FC<GenderProps> = ({ gender, setDetails }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDetails((prev: SignUpDetails) => ({ ...prev, gender: event.target.value }));
    };

    return (
        <div>
            <h3 className="text-lg font-medium text-textBlack font-inter">Enter your gender</h3>
            <RadioGroup row value={gender} onChange={handleChange}>
                <FormControlLabel value='Male' control={<Radio sx={{ color: '#6E00FF', '&.Mui-checked': { color: '#6E00FF' } }} />} label='Male'></FormControlLabel>


                <FormControlLabel value='Female' control={<Radio sx={{ color: '#6E00FF', '&.Mui-checked': { color: '#6E00FF' } }} />} label='Female'></FormControlLabel>


                <FormControlLabel value='Others' control={<Radio sx={{ color: '#6E00FF', '&.Mui-checked': { color: '#6E00FF' } }} />} label='Others'></FormControlLabel>
            </RadioGroup>
        </div >
    )
}
export default Gender


interface UserNameProps {
    userName: string,
    setDetails: SetDetails
}


export const UserName: React.FC<UserNameProps> = ({ userName, setDetails }) => {
    return (
        <div>
            <TextField
                onChange={(e) => setDetails(prev => ({ ...prev, userName: e.target.value }))}
                value={userName}
                sx={{
                    '& .MuiInputBase-root': { height: 50, color: '#6E00FF' },
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#6E00FF' },
                        '&.Mui-focused fieldset': { borderColor: '#6E00FF' },
                        '& input': { color: '#6E00FF' },
                        '&::placeholder': { fontSize: '2px' }
                    },
                    '& .MuiInputLabel-root': { color: '#6E00FF' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#6E00FF' }
                }}
                label='Enter your Username' variant='outlined'
                fullWidth
                margin='normal'
                type="text"
            ></TextField>
        </div>
    )
}



interface PasswordProps {
    password: string,
    confirmPassword: string,
    setDetails: SetDetails
}


export const Password: React.FC<PasswordProps> = ({ password, confirmPassword, setDetails }) => {
    return (
        <div>
            <TextField
                onChange={(e) => setDetails(prev => ({ ...prev, password: e.target.value }))}
                value={password}
                sx={{
                    '& .MuiInputBase-root': { height: 50, color: '#6E00FF' },
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#6E00FF' },
                        '&.Mui-focused fieldset': { borderColor: '#6E00FF' },
                        '& input': { color: '#6E00FF' },
                        '&::placeholder': { fontSize: '2px' }
                    },
                    '& .MuiInputLabel-root': { color: '#6E00FF' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#6E00FF' }
                }}
                label='Enter your Password' variant='outlined'
                fullWidth
                margin='normal'
                type="password"
            ></TextField>


            <TextField
                onChange={(e) => setDetails(prev => ({ ...prev, confirmPassword: e.target.value }))}
                value={confirmPassword}
                sx={{
                    '& .MuiInputBase-root': { height: 50, color: '#6E00FF' },
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#6E00FF' },
                        '&.Mui-focused fieldset': { borderColor: '#6E00FF' },
                        '& input': { color: '#6E00FF' },
                        '&::placeholder': { fontSize: '2px' }
                    },
                    '& .MuiInputLabel-root': { color: '#6E00FF' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#6E00FF' }
                }}
                label='Enter Confirm password' variant='outlined'
                fullWidth
                margin='normal'
                type="password"
            ></TextField>
        </div>
    )
}


interface OtpProps {
    otp: string,
    setDetails: SetDetails
}

export const Otp: React.FC<OtpProps> = ({ otp, setDetails }) => {
    const [newOtp, setNewOtp] = useState<string>('')
    useEffect(()=>{
        setDetails(prev=>({...prev,otp:newOtp}))
    },[newOtp])
    return (
        <div>
            <OTPInput value={newOtp} onChange={setNewOtp}

                numInputs={6}

                renderSeparator={<span className="mx-2"> </span>}
                renderInput={(props) => (
                    <div className='h-11 rounded-md w-11 flex justify-center items-center'>
                        <input
                            {...props}
                            className='h-full outline-[1px] outline-themeBlue focus:outline-themeBlue min-w-full text-xl p-1 border border-themeBlue text-center text-themeBlue rounded-md
                            
                            '
                            placeholder="*"
                        />
                    </div>)}
            />
        </div >
    )
}