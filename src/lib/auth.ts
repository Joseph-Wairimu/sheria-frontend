import { env } from 'next-runtime-env'
import { cookies } from 'next/headers'

export async function exchangeToken() {
    console.log('Exchange Token Hit:');
    const AUTH_BASE_URL = env('AUTH_BASE_URL')
    const res = await fetch(
        `${AUTH_BASE_URL}/auth/tokens/exchange`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
    )
    console.log('Exchange Token Response:');
    console.log('Exchange Token Response:', res);
    if (!res.ok) {
        return null
    }

    const data = await res.json()

    console.log('Exchange Token Response:', data);

    const accessToken = data?.details?.token

    if (!accessToken) return null

    cookies().set({
        name: 'access_token',
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    })

    return accessToken
}
