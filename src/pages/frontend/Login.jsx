import React, { useState } from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                
                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-900 text-white font-bold text-xl shadow-md">
                        ERP
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mt-4">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Login to access your ERP dashboard
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="example@company.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none text-slate-800 text-sm"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none text-slate-800 text-sm pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500 text-sm hover:text-slate-900"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                            />
                            Remember me
                        </label>

                        <a
                            href="#"
                            className="text-sm font-medium text-slate-900 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-slate-800 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>
                        © {new Date().getFullYear()} ERP Management System. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;