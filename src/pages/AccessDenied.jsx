import React from "react";
import { Link } from "react-router";
import {
    Result,
    Button,
    Card,
} from "antd";
import {
    SafetyCertificateOutlined,
} from "@ant-design/icons";

const AccessDenied = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">

            <Card className="max-w-lg w-full rounded-3xl shadow-lg border-0">

                <Result
                    status="403"
                    icon={
                        <SafetyCertificateOutlined />
                    }
                    title="Access Denied"
                    subTitle="You do not have permission to access this page. Please contact your administrator if you believe this is a mistake."
                    extra={[
                        <Link
                            to="/dashboard"
                            key="dashboard"
                        >
                            <Button
                                type="primary"
                                size="large"
                            >
                                Back to Dashboard
                            </Button>
                        </Link>,

                        <Link
                            to="/"
                            key="home"
                        >
                            <Button
                                size="large"
                            >
                                Go Home
                            </Button>
                        </Link>,
                    ]}
                />

            </Card>

        </div>
    );
};

export default AccessDenied;