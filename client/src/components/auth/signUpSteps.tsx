import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { SetStateAction } from "react";
import { SignUpDetails } from "../../pages/signUp";
import { CheckBox } from "@mui/icons-material";


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
                label='Enter your Full name' variant='outlined'
                fullWidth
                margin='normal'
                type="text"
            ></TextField>
        </div>
    )
}

interface Gender {
    gender: string,
    setDetails: SetDetails
}

export const Gender: React.FC<Gender> = (gender, setDetails) => {

    const handler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDetails((prev: SignUpDetails) => ({ ...prev, gender: e.target.value }))
        console.log(e.target.value)
    }

    return (
        <div>
            <RadioGroup row value={gender} onChange={handler}>
            <FormControlLabel value='Male' control={<Radio />} label='Male'></FormControlLabel>
            <FormControlLabel value='Female' control={<Radio />} label='Female'></FormControlLabel>
            <FormControlLabel value='Others' control={<Radio />} label='Others'></FormControlLabel>
        </RadioGroup>
        </div >
    )
}
export default Gender