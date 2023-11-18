'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import FirebaseClient from '@/clients/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
    const router = useRouter()
    const auth = FirebaseClient.auth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in, redirect to dashboard or desired page
                router.push('/')
            }
        })

        return () => unsubscribe()
    }, [])

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log('Logged in user:', user)
                toast.success('Login successful!')
            })
            .catch((error) => {
                console.error('Login error:', error)
                toast.error('Login failed!')
            })
    }

    const handleRegister = () => {
        router.push('/register')
    }

    return (
        <div className="m-auto shadow-xl card w-96 bg-base-100">
            <ToastContainer position="top-right" />
            <div className="card-body">
                <h2 className="mx-auto card-title">Swing</h2>
                <div className="w-full max-w-xs form-control">
                    <label className="label">
                        <span className="label-text">Email Address</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full max-w-xs input input-bordered"
                    />
                </div>
                <div className="w-full max-w-xs form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full max-w-xs input input-bordered"
                    />
                </div>
                <div className="justify-center w-full mt-3 card-actions">
                    <button
                        className="w-full btn btn-primary"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <p>
                        {/* Don't have an account?{' '} */}
                        <a className="cursor-pointer" onClick={handleRegister}>
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
