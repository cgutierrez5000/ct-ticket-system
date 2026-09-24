import { useState } from "react";
import type { SyntheticEvent } from "react";

type RegistrationFormProps = {
    onRegistered: () => void;
}



export default function RegistrationForm({ onRegistered }: RegistrationFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                return data;
            })
            .then(() => {
                onRegistered();
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Could not create account.")
                }

            });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm" >

            <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                    CT Ticket System
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-900">
                    Create account
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Create an account to start managing tickets.
                </p>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Name
                </label>

                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-500"
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Email
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
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    minLength={8}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-500"
                />
            </div>


            <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700">
                Create account
            </button>

            {error && (
                <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >{error}</p>
            )}


        </form >
    );
}