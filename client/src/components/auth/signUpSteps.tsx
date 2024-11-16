import { TextField } from "@mui/material";
import React, { SetStateAction } from "react";
import { SignUpDetails } from "../../pages/signUp";

interface FullNameProps {
    fullName: string,
    setDetails: React.Dispatch<React.SetStateAction<SignUpDetails>>
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

