"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { APP_TITLE } from "@/lib/config/config";
import { countries as countryList } from "@/assets/data/countries";

const TARGET_DASHBOARD = "ati-teas";

interface Role {
    id: string;
    name: string;
    rank: number;
}

interface Privilege {
    id: string;
    name: string;
}

interface Country {
    Name: string;
    CountryCode: string;
    DialCode: string;
}

export default function RegisterSystemUserPage() {
    /* ------------------------------------------------------------------ */
    /* State                                                              */
    /* ------------------------------------------------------------------ */

    const [isAuthenticated] = useState(false); // replace with real auth
    const [now, setNow] = useState("");

    const [loginMethod, setLoginMethod] = useState<"password" | "pin" | "both">(
        "password"
    );

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPin, setShowPin] = useState(false);
    const [showConfirmPin, setShowConfirmPin] = useState(false);

    const [form, setForm] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        pin: "",
        confirmPin: "", // <-- add this
        acceptTerms: false,
        selectedRoles: [] as string[],
        selectedPrivileges: [] as string[],
    });

    const [roleSearch, setRoleSearch] = useState("");
    const [privilegeSearch, setPrivilegeSearch] = useState("");

    const [countries, setCountries] = useState<Country[]>([]);
    const [dialCode, setDialCode] = useState("+1"); // default to USA

    /* ------------------------------------------------------------------ */
    /* Mock data (replace with API)                                        */
    /* ------------------------------------------------------------------ */

    // Roles array wrapped in useMemo
    const roles = useMemo<Role[]>(() => [
        { id: "1", name: "Admin", rank: 100 },
        { id: "2", name: "Editor", rank: 50 },
    ], []); // empty dependency → only created once

    // Privileges array wrapped in useMemo
    const privileges = useMemo<Privilege[]>(() => [
        { id: "p1", name: "Create Users" },
        { id: "p2", name: "Delete Users" },
    ], []); // empty dependency → only created once

    /* ------------------------------------------------------------------ */
    /* Effects                                                            */
    /* ------------------------------------------------------------------ */

    useEffect(() => {
        setNow(new Date().toLocaleString());
    }, []);

    useEffect(() => {
        setCountries(countryList);

        const defaultCountry = countryList.find(c => c.CountryCode === "US"); // USA
        if (defaultCountry) {
            setDialCode(defaultCountry.DialCode); // set default dial code to +1
            setForm((p) => ({ ...p, phoneNumber: "" })); // optional
        }
    }, []);


    /* ------------------------------------------------------------------ */
    /* Helpers                                                            */
    /* ------------------------------------------------------------------ */

    const generatePassword = () => {
        const chars =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$%&#_+";
        let pwd = "";
        for (let i = 0; i < 16; i++) {
            pwd += chars[Math.floor(Math.random() * chars.length)];
        }
        setForm((p) => ({ ...p, password: pwd, confirmPassword: pwd }));
    };

    const generatePin = () => {
        let pin = "";
        for (let i = 0; i < 16; i++) pin += Math.floor(Math.random() * 10);
        setForm((p) => ({ ...p, pin, confirmPin: pin }));
    };

    const filteredRoles = useMemo(() => {
        const q = roleSearch.toLowerCase();

        return roles
            .filter((r) =>
                `${r.rank} ${r.name}`.toLowerCase().includes(q)
            )
            .sort((a, b) => b.rank - a.rank);
    }, [roles, roleSearch]);

    const filteredPrivileges = useMemo(() => {
        const q = privilegeSearch.toLowerCase();

        return privileges.filter((p) =>
            p.name.toLowerCase().includes(q)
        );
    }, [privileges, privilegeSearch]);


    /* ------------------------------------------------------------------ */
    /* Render                                                             */
    /* ------------------------------------------------------------------ */

    return (
        <main className="pt-16 px-8 bg-gradient-to-br from-gray-300 to-green-300 min-h-screen">
            {/* Header */}
            <div className="text-center mb-2 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 border border-indigo-400 rounded-xl shadow-md py-1">
                <h2 className="text-xl font-bold text-indigo-900">{APP_TITLE}</h2>
                <p className="text-sm text-indigo-700">{now}</p>
            </div>

            {/* Auth banner */}
            {!isAuthenticated && (
                <div className="flex justify-center mb-2">
                    <div className="px-4 py-1 rounded-full shadow-md border border-red-300 bg-gradient-to-r from-red-100 via-rose-100 to-pink-100 text-red-700 text-sm font-semibold">
                        You are Not Logged In — Kindly Sign In 🏌️‍♂️
                    </div>
                </div>
            )}

            {/* Card */}
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-200 via-purple-300 to-blue-300 shadow-2xl rounded-2xl p-8 border border-blue-800">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Create New System Users Accounts
                </h1>

                {/* Form */}
                <form className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Enter Username
                        </label>
                        <input
                            value={form.userName}
                            required
                            onChange={(e) =>
                                setForm((p) => ({ ...p, userName: e.target.value }))
                            }
                            className="mt-1 w-full rounded-md border text-black border-gray-900 px-3 py-2"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Enter Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            required
                            onChange={(e) =>
                                setForm((p) => ({ ...p, email: e.target.value }))
                            }
                            className="mt-1 w-full rounded-md border text-black border-gray-900 px-3 py-2
                        focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Country + Phone */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900">
                            Enter Phone Number
                        </label>

                        <div className="flex gap-2">
                            {/* Country selector */}
                            <select
                                value={countries.find(c => c.DialCode === dialCode)?.CountryCode || ""}
                                className="w-1/3 rounded-md text-black border-gray-900 shadow-sm
                                focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => {
                                    const selected = countries.find(
                                        (c) => c.CountryCode === e.target.value
                                    );
                                    if (selected) setDialCode(selected.DialCode);
                                }}
                            >
                                {countries.map((c) => (
                                    <option key={c.CountryCode} value={c.CountryCode}>
                                        {c.Name} ({c.DialCode})
                                    </option>
                                ))}
                            </select>

                            {/* Dial code + phone input */}
                            <div className="flex flex-1">
                                <span className="px-3 flex items-center bg-gray-200 border border-gray-900 rounded-l-md text-gray-700">
                                    {dialCode}
                                </span>

                                <input
                                    type="tel"
                                    placeholder="Enter phone number"
                                    value={form.phoneNumber}
                                    required
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(/\D/g, "");
                                        setForm((p) => ({ ...p, phoneNumber: raw }));
                                    }}
                                    className="w-full rounded-r-md border-gray-900 text-black shadow-sm px-3 py-2
                                    focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Login Method Tabs */}
                    <div className="mt-4 w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select a Login Method
                        </label>

                        <div className="flex w-full rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                            {["password", "pin", "both"].map((m) => {
                                const isActive = loginMethod === m;
                                return (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => setLoginMethod(m as never)}
                                        className={`flex-1 py-2 text-center font-medium transition-all duration-200
                                            ${isActive
                                                ? "bg-indigo-400 text-white shadow-md"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                            }
                                            `}
                                    >
                                        {m === "password" ? "Use Password 💁‍♂️" :
                                            m === "pin" ? "Use PIN 🔒" : "Use Both 🔑"}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Password / PIN Inputs */}
                    {(loginMethod === "password" || loginMethod === "both") && (
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            {/* Password */}
                            <div>
                                <label className="text-sm text-black font-medium">Enter Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        required
                                        onChange={(e) =>
                                            setForm((p) => ({ ...p, password: e.target.value }))
                                        }
                                        className="w-full border text-black rounded-md px-3 py-2 pr-24"
                                    />
                                    {/* Toggle visibility */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((p) => !p)}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-600"
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                    {/* Generate Password */}
                                    <button
                                        type="button"
                                        onClick={generatePassword}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-900"
                                    >
                                        Gen
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="text-sm text-black font-medium">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={form.confirmPassword}
                                        required
                                        onChange={(e) =>
                                            setForm((p) => ({ ...p, confirmPassword: e.target.value }))
                                        }
                                        className="w-full border text-black rounded-md px-3 py-2 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((p) => !p)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                                    >
                                        {showConfirmPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {(loginMethod === "pin" || loginMethod === "both") && (
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            {/* PIN */}
                            <div>
                                <label className="text-sm text-black font-medium">Enter PIN</label>
                                <div className="relative">
                                    <input
                                        type={showPin ? "text" : "password"}
                                        value={form.pin}
                                        required
                                        onChange={(e) => setForm((p) => ({ ...p, pin: e.target.value }))}
                                        className="w-full border text-black rounded-md px-3 py-2 pr-24"
                                    />
                                    {/* Toggle visibility */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPin((p) => !p)}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-600"
                                    >
                                        {showPin ? "🙈" : "👁️"}
                                    </button>
                                    {/* Generate PIN */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            generatePin(); // use your existing helper
                                            setForm((p) => ({ ...p, confirmPin: p.pin })); // auto populate confirmPin
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-700"
                                    >
                                        Gen
                                    </button>
                                </div>
                            </div>

                            {/* Confirm PIN */}
                            <div>
                                <label className="text-sm text-black font-medium">Confirm PIN</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPin ? "text" : "password"}
                                        value={form.confirmPin || ""}
                                        required
                                        onChange={(e) =>
                                            setForm((p) => ({ ...p, confirmPin: e.target.value }))
                                        }
                                        className="w-full border text-black rounded-md px-3 py-2 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPin((p) => !p)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                                    >
                                        {showConfirmPin ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Roles */}
                    <div>
                        <label className="text-sm text-black font-medium">Assign Roles</label>
                        <input
                            placeholder="Search roles..."
                            className="w-full p-2 border text-black rounded mb-2"
                            onChange={(e) => setRoleSearch(e.target.value)}
                        />
                        <div className="max-h-48 overflow-y-auto text-black border rounded p-2 grid md:grid-cols-2 gap-2">
                            {filteredRoles.map((r) => (
                                <label key={r.id} className="flex gap-2 items-center">
                                    <input
                                        type="checkbox"
                                        checked={form.selectedRoles.includes(r.id)}
                                        onChange={() =>
                                            setForm((p) => ({
                                                ...p,
                                                selectedRoles: p.selectedRoles.includes(r.id)
                                                    ? p.selectedRoles.filter((x) => x !== r.id)
                                                    : [...p.selectedRoles, r.id],
                                            }))
                                        }
                                    />
                                    <span>
                                        [{r.rank}] {r.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Privileges */}
                    <div className="mt-4">
                        <label className="text-sm text-black font-medium">Assign Privileges</label>

                        <input
                            placeholder="Search privileges..."
                            className="w-full p-2 border text-black rounded mb-2 focus:ring-indigo-500"
                            value={privilegeSearch}
                            onChange={(e) => setPrivilegeSearch(e.target.value)}
                        />

                        <div className="max-h-48 overflow-y-auto border text-black rounded p-2 grid md:grid-cols-2 gap-2">
                            {filteredPrivileges.map((p) => (
                                <label key={p.id} className="flex gap-2 items-center">
                                    <input
                                        type="checkbox"
                                        checked={form.selectedPrivileges.includes(p.id)}
                                        onChange={() =>
                                            setForm((f) => ({
                                                ...f,
                                                selectedPrivileges: f.selectedPrivileges.includes(p.id)
                                                    ? f.selectedPrivileges.filter((x) => x !== p.id)
                                                    : [...f.selectedPrivileges, p.id],
                                            }))
                                        }
                                    />
                                    <span>{p.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Submit & Register
                    </button>
                </form>

                {/* Links */}
                <div className="flex justify-between mt-3 text-sm font-bold">
                    <Link href={`/dashboards/${TARGET_DASHBOARD}/pages/help-center`} className="hover:underline text-emerald-800">
                        Having Issues On Sign Up?
                    </Link>
                    <Link href={`/dashboards/${TARGET_DASHBOARD}/auth/login`} className="hover:underline text-emerald-800">
                        Login Instead?
                    </Link>
                </div>
            </div>
        </main>
    );
}
