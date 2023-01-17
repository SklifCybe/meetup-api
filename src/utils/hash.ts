import * as bcrypt from 'bcrypt';

export const hash = async (text: string, salt: number): Promise<string> =>
    bcrypt.hash(text, salt);
