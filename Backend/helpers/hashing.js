import bcrypt from 'bcrypt';
class Hashing{
    constructor(password){
        this.pswd = password;
    }

    async generateHash(){
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(this.pswd, salt);
        return hashedPassword;
    }
    
}

export default Hashing;