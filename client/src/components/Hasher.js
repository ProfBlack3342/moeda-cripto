const bcrypt = require('bcrypt');

export async function bcryptHasher(senha){
    const hash = await bcrypt.hash(senha, 12);
    return hash;
}