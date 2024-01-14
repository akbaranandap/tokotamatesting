"use client"
import Main from "@/components/Main"
import { use, useState } from "react"
import api from "@/api/auth"
import { useRouter } from "next/router"
import { Button } from "react-bootstrap"

export default function Signup() {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function signup(e) {
        e.preventDefault()
        if (username === '') {
            router.replace({ pathname: router.pathname, query: { alert: 'danger', message: 'Username is required' }})
            return
        }
        if (email === '') {
            router.replace({ pathname: router.pathname, query: { alert: 'danger', message: 'Username is required' }})
            return
        }
        if (password === '') {
            router.replace({ pathname: router.pathname, query: { alert: 'danger', message: 'Username is required' }})
            return
        }

        try {
            const res = await api.signup({ username, email, password })
            if (res.status === 200) {
                router.replace({ pathname: '/login', query: { alert: 'success', message: 'Sign up success. Please log in' }})
            }

        } catch (error) {
            router.replace({ pathname: router.pathname, query: { message: error.response.data.message, alert: 'danger' }})
        }
    }

    return (
        <Main noFooter title='Register' description="Register page">
            <div className="my-5 container">
                <div className="card mx-auto" style={{ width: '20rem' }}>
                    <div className="card-body">
                        <div className="text-center">
                            <h5 className="card-title fw-medium">Register</h5>
                            <p style={{ marginTop: '-5px' }}>Register admin</p>
                        </div>
                        <form onSubmit={signup} className="mt-4 d-flex flex-column gap-2">
                            <div className="d-flex flex-column">
                                <label htmlFor="username">Username</label>
                                <input onChange={e => setUsername(e.target.value)} id="username" type="username" className="rounded border px-2" />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="email">Email</label>
                                <input onChange={e => setEmail(e.target.value)} id="email" type="email" className="rounded border px-2" />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="password">Password</label>
                                <input onChange={e => setPassword(e.target.value)} id="password" type="password" className="rounded border px-2" />
                            </div>
                            <Button type="submit" className="btn btn-primary mt-1">Register</Button>
                        </form>
                    </div>
                </div>
            </div>
        </Main>
    )
}