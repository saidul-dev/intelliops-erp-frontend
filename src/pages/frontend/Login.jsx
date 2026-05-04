import { Link, useNavigate } from "react-router";
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

// const getRedirectPath = (role) => {
//     switch (normalizeUserRole(role)) {
//         case roleMap.PROVIDER:
//             return "/provider/dashboard";
//         case roleMap.CUSTOMER:
//             return "/";
//         case roleMap.ADMIN:
//             return "/admin/dashboard";
//         case roleMap.SUPER_ADMIN:
//             return "/super-admin/dashboard";
//         default:
//             return "/";
//     }
// };

// {
//     "token": "11|V5iWbf0GSIKkSyAZG7EZ3R1JvAj8CBOk7e9IZ0dl3d316853",
//     "user": {
//         "id": 1,
//         "name": "Admin User",
//         "email": "admin@example.com",
//         "email_verified_at": null,
//         "created_at": "2026-04-23T14:34:39.000000Z",
//         "updated_at": "2026-04-23T14:34:39.000000Z",
//         "roles": [
//             {
//                 "id": 1,
//                 "name": "admin",
//                 "guard_name": "web",
//                 "created_at": "2026-04-23T14:34:38.000000Z",
//                 "updated_at": "2026-04-23T14:34:38.000000Z",
//                 "pivot": {
//                     "model_type": "App\\Models\\User",
//                     "model_id": 1,
//                     "role_id": 1
//                 }
//             }
//         ]
//     },
//     "roles": [
//         "admin"
//     ]
// }


const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [login, { isLoading }] = useLoginMutation();

    // const role = useCurrentUserRole();
    // console.log("Current user role in Login component:", role);

    // const from = location?.state?.from || "/";

    const onFinish = async (values) => {
        const loginUrl = `${import.meta.env.VITE_BASE_URL}/api/login`;

        try {
            const userInfo = {
                email: values.email,
                password: values.password,
            };

            console.log("Login request:", {
                url: loginUrl,
                payload: {
                    ...userInfo,
                    password: "********",
                },
            });

            const result = await login(userInfo);

            console.log("Login mutation result:", result);

            if (result.error) {
                throw result.error;
            }

            const res = result.data;
            // const userRole = normalizeUserRole(res?.data?.user?.role);

            console.log("Login response:", res);

            if (res?.user && res?.token) {
                console.log("Login successful, user data:", res);
                dispatch(
                    setUser({
                        user: res.user,
                        token: res.token,
                    }),
                );

                toast.success("Login successful!");

                form.resetFields();

                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login request failed:", error);
            toast.error(error?.data?.message || error?.error || "Login failed");
        }
    };

    const onFinishFailed = ({ errorFields }) => {
        console.warn("Login form validation failed:", errorFields);
        toast.error("Please enter a valid email and password.");
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
                        style={{ color: "hsl(0,0%,100%)" }}
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
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        requiredMark={false}
                    >
                        <Form.Item
                            label={<div className="text-sm font-medium text-white">Email</div>}
                            name="email"
                            rules={[
                                { required: true, message: "Email is required" },
                                { type: "email", message: "Enter a valid email address" },
                            ]}
                        >
                            <Input placeholder="you@example.com" size="large" />
                        </Form.Item>

                        <Form.Item
                            label={<div className="text-sm font-medium text-white">Password</div>}
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
