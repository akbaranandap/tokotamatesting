"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/api/auth";
import user from "@/api/user";
import { Alert, Button } from "react-bootstrap";
import Social, { social } from "./Social";
import http from "@/lib/http";
import Nav from 'react-bootstrap/Nav';
import Navbarr from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

const navbar = {
    socials: social,
}

const AUTH_KEY = 'auth-token_'
/**
 * @param {navbar} props 
 * @returns 
 */
export default function Navbar(props) {
    const router = useRouter()

    const [alert, setAlert] = useState(false)
    const [shown, showMenu] = useState(false)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [isAdmin, setAdmin] = useState(false)

    async function verifyUser() {
        const token = localStorage.getItem(AUTH_KEY)
        if (!token) return

        http.defaults.headers.common.Authorization = `Bearer ${token}`

        try {
            const res = await api.user()
            setAdmin(res.data.isAdmin)
            setLoggedIn(res.status === 200)

            if (router.pathname.includes('admin') && !res.data.isAdmin) {
                router.push('/login')
                return
            }

        } catch (error) {
            localStorage.removeItem(token)
            router.push('/login')
        }
    }

    useEffect(() => {
        verifyUser()
        setAlert(document.getElementById('alert'))
    }, [])

    useEffect(() => {
        if (router.query.alert) {
            const alert = document.getElementById('alert')
            if (alert) {
                alert.classList.remove('d-none')
            }
        }
    }, [router.query])

    const navigations = [
        { href: '/contact', text: 'Contact' },
    ]

    function logout() {
        localStorage.removeItem(AUTH_KEY)
        setLoggedIn(false)
        router.push('/login')
    }

    function removeAlert() {
        const alert = document.getElementById('alert')
        if (alert) {
            alert.classList.add('d-none')
        }

        router.replace({ pathname: router.asPath.split('?')[0] })
    }

    return (
        <div>
            <Navbarr collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbarr.Brand href="/">
                        <h4>
                            <b><span className="text-primary">Toko</span> Tama</b>
                        </h4>
                    </Navbarr.Brand>
                    <Navbarr.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbarr.Collapse id="responsive-navbar-nav d-flex">
                        <Nav className="mx-auto">
                            <Nav.Link href="/" active={router.pathname === '/' || router.pathname === ''}>
                                Home
                            </Nav.Link>
                            <Nav.Link href="/cart" active={router.pathname === '/cart'}>
                                Cart
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            {isLoggedIn ? (
                                <div className="d-flex gap-2">
                                    {isAdmin ? (
                                        <Nav.Link href="/admin" >
                                            <Button variant="primary">
                                                Admin
                                            </Button>
                                        </Nav.Link>
                                    ) : ('')}
                                    <Nav.Link onClick={logout} >
                                        <Button variant="danger">
                                            Logout
                                        </Button>
                                    </Nav.Link>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center gap-2">
                                    <Nav.Link href="/login" >
                                        Login
                                    </Nav.Link>
                                    <Nav.Link href="/register">
                                        <Button>Register</Button>
                                    </Nav.Link>
                                </div>
                            )}
                        </Nav>
                    </Navbarr.Collapse>
                </Container>
            </Navbarr>

            <div onClick={removeAlert} id="alert" className="container mt-3 d-none">
                <Alert variant={router.query.alert || 'danger'}>
                    {router.query.message}
                </Alert>
            </div>

        </div>
    )
}