"use client"
import api from "@/api/auth"
import Main from "@/components/Main"
import http from "@/lib/http"
import { useRouter } from "next/router"
import { useState } from "react"
import { Button } from "react-bootstrap"

const AUTH_KEY = 'auth-token_'

export default function Login() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login(e) {
        e.preventDefault()

        try {
            const res = await api.login(email, password)

            if (res.status === 200) {
                localStorage.setItem(AUTH_KEY, res.data.token)
                http.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
                router.push('/')
            }

        } catch (error) {
            router.push({ pathname: router.pathname, query: { message: 'Wrong email or password', alert: 'danger' } }, undefined)
        }
    }

    return (
        <Main noFooter title='Login' description="Login page">
            <div className="my-5 container">
                <div className="card mx-auto" style={{ width: '20rem' }}>
                    <div className="card-body">
                        <div className="text-center">
                            <h5 className="card-title fw-medium">Login</h5>
                            <p style={{ marginTop: '-5px'}}>Login as admin</p>
                        </div>
                        <form onSubmit={login} className="mt-4 d-flex flex-column gap-2">
                            <div className="d-flex flex-column">
                                <label htmlFor="email">Email</label>
                                <input onChange={e => setEmail(e.target.value)} id="email" type="email" className="rounded border px-2" />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="password">Password</label>
                                <input onChange={e => setPassword(e.target.value)} id="password" type="password" className="rounded border px-2" />
                            </div>
                            <Button type="submit" className="btn btn-primary mt-1">Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </Main>
    )
}