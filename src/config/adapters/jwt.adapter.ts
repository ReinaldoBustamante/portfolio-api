import { sign, verify } from 'jsonwebtoken'

export class JwtAdapter {

    public static sign(payload: { id: number, email: string }) {
        return new Promise((resolve, reject) => {
            sign(payload, 'seed', { expiresIn: '1h' }, (error, token) => {
                if (error) return reject(error);
                resolve(token)
            })
        })
    }

    public static decoded(token: string) {
        return new Promise((resolve, reject) => {
            verify(token, 'seed', (error, decoded) => {
                if (error) return reject(error)
                resolve(decoded)
            })
        })
    }
}