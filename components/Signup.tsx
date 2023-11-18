'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged
} from 'firebase/auth'
import FirebaseClient from '@/clients/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RegisterPage = () => {
    const router = useRouter()
    const auth = FirebaseClient.auth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
        router.push('/login')
    }

    const handleRegister = () => {
        if (password !== confirmPassword) {
            console.error('Password and confirm password do not match.')
            toast.error('Password and confirm password do not match.')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User registration successful
                const user = userCredential.user
                console.log('Registered user:', user)
                toast.success('Registration successful!')
            })
            .catch((error) => {
                // Handle registration error
                console.error('Registration error:', error)
                toast.error('Registration failed!')
            })
    }

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    return (
        <div className="m-auto shadow-xl card w-96 bg-base-100">
            <ToastContainer position="top-right" />
            <div className="card-body">
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
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                    <p>
                        <a className="cursor-pointer" onClick={handleLogin}>
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
