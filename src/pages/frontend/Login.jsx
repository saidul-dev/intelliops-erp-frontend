import { Link, useLocation, useNavigate } from "react-router";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Store } from "lucide-react";
import { Button, Form, Input } from "antd";
// import {
// normalizeUserRole,
// roleMap,
// setUser,
// } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";


const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = async (values) => {

        try {

            const res = await login(values).unwrap();

            if (res?.user && res?.token) {
                dispatch(
                    setUser({
                        user: res.user,
                        token: res.token,
                    }),
                );

                toast.success("Login successful!");

                form.resetFields();

                navigate(from, { replace: true });
            }
        } catch (error) {
            toast.error(error?.data?.message || error?.error || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
                <div className="max-w-md text-center">
                    <Link to="/" className="flex items-center gap-2 mb-6 justify-center">
                        <Store className="h-16 w-16 mx-auto mb-6 text-primary" />
                    </Link>

                    <h2
                        className="text-3xl font-bold mb-4"
                    >
                        Welcome Back
                    </h2>

                    <p style={{ color: "hsl(220,14%,70%)" }}>
                        Please enter your credentials to sign in.
                    </p>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    <div className="mb-8">
                        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
                            <Store className="h-7 w-7 text-primary" />
                            <span className="text-xl font-bold">Intelliops</span>
                        </Link>

                        <h1 className="text-2xl font-bold">Sign In</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Enter your email and password to continue
                        </p>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleLogin}
                        requiredMark={false}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Email is required" },
                                { type: "email", message: "Enter a valid email address" },
                            ]}
                        >
                            <Input placeholder="you@example.com" size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Password is required" },
                                { min: 6, message: "Password must be at least 6 characters" },
                            ]}
                        >
                            <Input.Password
                                placeholder="Enter your password"
                                size="large"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                        </Form.Item>

                        <Form.Item className="mb-0">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                                block
                                size="large"
                            >
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>

                    <p className="text-sm text-center text-muted-foreground mt-6">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary font-medium hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
