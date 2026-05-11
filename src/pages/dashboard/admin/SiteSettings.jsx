import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    Breadcrumb,
    Card,
    Input,
    message,
    Upload,
    Skeleton,
} from "antd";

import {
    SettingOutlined,
    UploadOutlined,
} from "@ant-design/icons";

import {
    useGetSiteSettingsQuery,
    useStoreSiteSettingsMutation,
} from "../../../redux/features/siteSettings/siteSettingsApi";

const { TextArea } = Input;

const SiteSettings = () => {

    const navigate = useNavigate();

    const { data, isLoading } =
        useGetSiteSettingsQuery();

    const [
        storeSiteSettings,
        { isLoading: updating },
    ] = useStoreSiteSettingsMutation();

    const [logoPreview, setLogoPreview] =
        useState(null);

    const [faviconPreview, setFaviconPreview] =
        useState(null);

    const [form, setForm] = useState({
        site_name: "",
        site_description: "",
        site_keywords: "",
        site_author: "",
        site_email: "",
        site_phone: "",
        site_address: "",
        site_logo: null,
        site_favicon: null,
    });

    /* ================= LOAD DATA ================= */
    useEffect(() => {
        if (data) {

            setForm((prev) => ({
                ...prev,
                site_name:
                    data.site_name || "",
                site_description:
                    data.site_description || "",
                site_keywords:
                    data.site_keywords || "",
                site_author:
                    data.site_author || "",
                site_email:
                    data.site_email || "",
                site_phone:
                    data.site_phone || "",
                site_address:
                    data.site_address || "",
            }));

            // Existing image preview
            setLogoPreview(
                data.site_logo || null
            );

            setFaviconPreview(
                data.site_favicon || null
            );
        }
    }, [data]);

    /* ================= INPUT CHANGE ================= */
    const handleChange = (
        key,
        value
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    /* ================= LOGO CHANGE ================= */
    const handleLogoChange = ({
        file,
    }) => {

        const imageFile =
            file?.originFileObj ||
            file;

        setForm((prev) => ({
            ...prev,
            site_logo: imageFile,
        }));

        if (imageFile) {
            setLogoPreview(
                URL.createObjectURL(
                    imageFile
                )
            );
        }
    };

    /* ================= FAVICON CHANGE ================= */
    const handleFaviconChange = ({
        file,
    }) => {

        const imageFile =
            file?.originFileObj ||
            file;

        setForm((prev) => ({
            ...prev,
            site_favicon:
                imageFile,
        }));

        if (imageFile) {
            setFaviconPreview(
                URL.createObjectURL(
                    imageFile
                )
            );
        }
    };

    /* ================= SAVE ================= */
    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        try {
            const formData =
                new FormData();

            Object.entries(
                form
            ).forEach(
                ([key, value]) => {
                    if (
                        value !==
                        null &&
                        value !==
                        undefined &&
                        value !== ""
                    ) {
                        formData.append(
                            key,
                            value
                        );
                    }
                }
            );

            await storeSiteSettings(
                formData
            ).unwrap();

            message.success(
                "Site settings updated successfully"
            );

        } catch (error) {

            console.error(error);

            message.error(
                error?.data
                    ?.message ||
                "Update failed"
            );
        }
    };

    if (isLoading) {
        return (
            <Skeleton active />
        );
    }

    return (
        <div className="space-y-6">

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    {
                        title: (
                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                        ),
                    },
                    {
                        title:
                            "Site Settings",
                    },
                ]}
            />

            {/* Header */}
            <div className="flex justify-between items-center">

                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <SettingOutlined />
                        Site Settings
                    </h1>
                </div>

            </div>

            {/* Form */}
            <Card className="rounded-2xl border-0 shadow-sm">

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="space-y-8"
                >

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Site Name */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Site Name
                            </label>

                            <Input
                                size="large"
                                value={
                                    form.site_name
                                }
                                onChange={(
                                    e
                                ) =>
                                    handleChange(
                                        "site_name",
                                        e.target
                                            .value
                                    )
                                }
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Site Email
                            </label>

                            <Input
                                size="large"
                                type="email"
                                value={
                                    form.site_email
                                }
                                onChange={(
                                    e
                                ) =>
                                    handleChange(
                                        "site_email",
                                        e.target
                                            .value
                                    )
                                }
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Phone
                            </label>

                            <Input
                                size="large"
                                value={
                                    form.site_phone
                                }
                                onChange={(
                                    e
                                ) =>
                                    handleChange(
                                        "site_phone",
                                        e.target
                                            .value
                                    )
                                }
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Author
                            </label>

                            <Input
                                size="large"
                                value={
                                    form.site_author
                                }
                                onChange={(
                                    e
                                ) =>
                                    handleChange(
                                        "site_author",
                                        e.target
                                            .value
                                    )
                                }
                            />
                        </div>

                        {/* Keywords */}
                        <div className="lg:col-span-2">
                            <label className="mb-2 block font-medium">
                                Keywords
                            </label>

                            <Input
                                size="large"
                                value={
                                    form.site_keywords
                                }
                                onChange={(
                                    e
                                ) =>
                                    handleChange(
                                        "site_keywords",
                                        e.target
                                            .value
                                    )
                                }
                            />
                        </div>

                        {/* Description */}
                        <div className="lg:col-span-2">
                            <label className="mb-2 block font-medium">
                                Description
                            </label>

                            <TextArea
                                rows={4}
                                value={
                                    form.site_description
                                }
                                onChange={(
                                    e
                                ) =>
                                    handleChange(
                                        "site_description",
                                        e.target
                                            .value
                                    )
                                }
                            />
                        </div>

                        {/* Address */}
                        <div className="lg:col-span-2">
                            <label className="mb-2 block font-medium">
                                Address
                            </label>

                            <TextArea
                                rows={3}
                                value={
                                    form.site_address
                                }
                                onChange={(
                                    e
                                ) =>
                                    handleChange(
                                        "site_address",
                                        e.target
                                            .value
                                    )
                                }
                            />
                        </div>

                        {/* Logo */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Site Logo
                            </label>

                            <div className="flex gap-4 items-start">

                                <Upload
                                    beforeUpload={() => false}
                                    showUploadList={
                                        false
                                    }
                                    maxCount={
                                        1
                                    }
                                    accept="image/*"
                                    onChange={
                                        handleLogoChange
                                    }
                                >
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-outline btn-lg h-11 flex items-center gap-2"
                                    >
                                        <UploadOutlined />
                                        Upload Logo
                                    </button>
                                </Upload>

                                {logoPreview && (
                                    <img
                                        src={
                                            logoPreview
                                        }
                                        alt="logo"
                                        className="w-32 h-32 rounded-xl object-cover border"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Favicon */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Favicon
                            </label>

                            <div className="flex gap-4 items-start">

                                <Upload
                                    beforeUpload={() => false}
                                    showUploadList={
                                        false
                                    }
                                    maxCount={
                                        1
                                    }
                                    accept="image/*"
                                    onChange={
                                        handleFaviconChange
                                    }
                                >
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-outline btn-lg h-11 flex items-center gap-2"
                                    >
                                        <UploadOutlined />
                                        Upload Favicon
                                    </button>
                                </Upload>

                                {faviconPreview && (
                                    <img
                                        src={
                                            faviconPreview
                                        }
                                        alt="favicon"
                                        className="w-20 h-20 rounded-xl object-cover border"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t pt-6 flex justify-end gap-3">

                        <button
                            type="button"
                            className="btn"
                            onClick={() =>
                                navigate(
                                    "/dashboard"
                                )
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={
                                updating
                            }
                        >
                            {updating
                                ? "Saving..."
                                : "Save Settings"}
                        </button>

                    </div>

                </form>

            </Card>

        </div>
    );
};

export default SiteSettings;