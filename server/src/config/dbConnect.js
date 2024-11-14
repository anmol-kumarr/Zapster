import mongoose from "mongoose";


const dbConnect = () => {
    mongoose.connect(process.env.DB_URL).then(() => console.log('db connected')).catch((e) => {
        console.error('db connection failed', e)
        process.exit(1)

    })
}

export default dbConnect
