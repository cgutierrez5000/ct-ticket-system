import { useState } from "react";
import type { SyntheticEvent } from "react";
import type { AuthenticatedUser } from "../../types/ticket";
import { API_URL } from "../config";

type LoginFormProps = {
    onLogin: (user: AuthenticatedUser) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);


    function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Login failed")
                }

                return response.json();
            })
            .then(data => {
                onLogin(data.user);
            })
            .catch(() => {
                setError("Invalid email or password.")
            })
    }

    return (
        <form onSubmit={handleSubmit}
            className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
            <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                    CT Ticket System
                </p>
                <h1 className="mt-1 text-2xl font-bold text-slate-900">
                    Sign in
                </h1>
                <p className="mt-2 text-sm text-slate-500">Enter your credentials to access your tickets.</p>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"> Email
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-500"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"> Password
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-500"
                />
            </div>
            <button className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
                type="submit"
            > Log in </button>

            {
                error && (
                    <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
                )
            }


        </form>
    );
}

