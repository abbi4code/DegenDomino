import  bcrypt from "bcryptjs"


export const hashpassword =async(password: string)=>{
    return await bcrypt.hash(password,10)

}

export const validpassword = async(givenpass:string, dbpass: string)=>{
    return await bcrypt.compare(givenpass,dbpass)
}