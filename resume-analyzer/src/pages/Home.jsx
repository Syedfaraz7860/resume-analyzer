import React, { useState } from "react";
import axios from "axios";

const Home = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const userId = localStorage.getItem("userId");

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");

        window.location.href = "/Login";
    };
    // File select
    const handleFileChange = (selectedFile) => {
        if (!selectedFile) return;

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            setError(
                "Only PDF, DOCX, TXT, XLSX and XLS files are supported."
            );
            setFile(null);
            return;
        }

        setError("");
        setFile(selectedFile);
    };

    // Normal file input
    const handleInputChange = (e) => {
        handleFileChange(e.target.files[0]);
    };

    // Drag events
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);

        const droppedFile = e.dataTransfer.files[0];

        handleFileChange(droppedFile);
    };

    // Upload resume
    const handleUpload = async () => {
        if (!file) {
            setError("Please select a resume first.");
            return;
        }

        if (!userId) {
            setError("User not logged in.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setResult(null);

            const formData = new FormData();

            formData.append("resume", file);
            formData.append("userId", userId);

            const response = await axios.post(
                "http://localhost:4500/api/resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Resume Response:", response.data);

            setResult(response.data);
        } catch (error) {
            console.log("Upload Error:", error);

            setError(
                error.response?.data?.message ||
                "Something went wrong while analyzing resume."
            );
        } finally {
            setLoading(false);
        }
    };

    // Score circle
    const getScoreColor = (score) => {
        if (score >= 80) {
            return "text-emerald-500";
        }

        if (score >= 60) {
            return "text-yellow-500";
        }

        return "text-red-500";
    };

    const getScoreText = (score) => {
        if (score >= 80) {
            return "Excellent";
        }

        if (score >= 60) {
            return "Good";
        }

        if (score >= 40) {
            return "Needs Improvement";
        }

        return "Poor";
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ================= NAVBAR ================= */}

            <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">

                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                    {/* Logo */}
                    <div className="flex items-center gap-3">

                        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xl text-white shadow-lg shadow-indigo-200">
                            📄

                            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></span>
                        </div>

                        <div>
                            <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                                Resume<span className="text-indigo-600">Analyzer</span>
                            </h1>

                            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                                Smart Career Tool
                            </p>
                        </div>

                    </div>


                    {/* Navigation */}
                    <div className="hidden items-center gap-2 md:flex">

                        <a
                            href="#upload"
                            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            Analyze
                        </a>

                        <a
                            href="#results"
                            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            Results
                        </a>

                    </div>


                    {/* User + Logout */}
                    <div className="flex items-center gap-3">

                        {/* User */}
                        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                                👤
                            </div>

                            <div className="hidden lg:block">
                                <p className="text-xs font-bold text-slate-800">
                                    Welcome
                                </p>

                                <p className="text-[11px] text-slate-400">
                                    Resume Analyst
                                </p>
                            </div>

                        </div>


                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="group flex items-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-sm font-semibold text-red-500 shadow-sm transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-100"
                        >

                            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
                                ↪
                            </span>

                            Logout

                        </button>

                    </div>

                </div>

            </nav>


            {/* ================= MAIN ================= */}

            <main className="mx-auto max-w-7xl px-6 py-10">


                {/* ================= HERO ================= */}

                <section className="mb-10 text-center">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">

                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

                        No AI • No Paid API • Rule Based

                    </div>

                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">

                        Analyze Your Resume
                        <span className="block text-indigo-600">
                            In Seconds
                        </span>

                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">

                        Upload your resume and get a detailed analysis of
                        skills, sections, strengths, weaknesses and
                        improvement suggestions.

                    </p>

                </section>


                {/* ================= UPLOAD ================= */}

                <section
                    id="upload"
                    className="mx-auto max-w-4xl"
                >

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">

                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`rounded-2xl border-2 border-dashed p-10 text-center transition ${dragActive
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/40"
                                }`}
                        >

                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100 text-4xl">
                                📄
                            </div>

                            <h3 className="text-xl font-bold text-slate-900">
                                Drop your resume here
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                or select a file from your computer
                            </p>

                            <p className="mt-3 text-xs text-slate-400">
                                PDF • DOCX • TXT • XLSX • XLS
                            </p>


                            <label className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-xl">

                                📁 Choose Resume

                                <input
                                    type="file"
                                    hidden
                                    accept=".pdf,.docx,.txt,.xlsx,.xls"
                                    onChange={handleInputChange}
                                />

                            </label>


                            {file && (
                                <div className="mx-auto mt-6 flex max-w-md items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-left">

                                    <div className="flex items-center gap-3">

                                        <div className="text-2xl">
                                            📎
                                        </div>

                                        <div>
                                            <p className="max-w-xs truncate text-sm font-semibold text-slate-800">
                                                {file.name}
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                {(file.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>

                                    </div>

                                    <button
                                        onClick={() => setFile(null)}
                                        className="text-sm font-bold text-red-500 hover:text-red-700"
                                    >
                                        ✕
                                    </button>

                                </div>
                            )}

                        </div>


                        {error && (
                            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                ⚠️ {error}
                            </div>
                        )}


                        <button
                            onClick={handleUpload}
                            disabled={loading || !file}
                            className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >

                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                    Analyzing Resume...
                                </span>
                            ) : (
                                "🚀 Analyze Resume"
                            )}

                        </button>

                    </div>

                </section>


                {/* ================= RESULTS ================= */}

                {result && (
                    <section
                        id="results"
                        className="mt-12 space-y-6"
                    >

                        {/* Header */}

                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

                            <div>

                                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                    Analysis Complete
                                </p>

                                <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
                                    Resume Report
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {result.resume?.originalName}
                                </p>

                            </div>

                            <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">

                                <p className="text-xs text-slate-500">
                                    Word Count
                                </p>

                                <p className="text-xl font-bold text-slate-900">
                                    {result.resume?.wordCount || 0}
                                </p>

                            </div>

                        </div>


                        {/* ================= TOP CARDS ================= */}

                        <div className="grid gap-6 md:grid-cols-3">


                            {/* SCORE */}

                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <p className="text-sm font-semibold text-slate-500">
                                    Resume Score
                                </p>

                                <div className="mt-5 flex items-center gap-5">

                                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-indigo-100">

                                        <div className="text-center">

                                            <p
                                                className={`text-3xl font-extrabold ${getScoreColor(
                                                    result.analysis?.score || 0
                                                )}`}
                                            >
                                                {result.analysis?.score || 0}
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                / 100
                                            </p>

                                        </div>

                                    </div>

                                    <div>

                                        <p className="text-lg font-bold text-slate-900">
                                            {getScoreText(
                                                result.analysis?.score || 0
                                            )}
                                        </p>

                                        <p className="mt-1 text-sm leading-5 text-slate-500">
                                            Based on your resume content,
                                            skills and important sections.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* SKILLS */}

                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <p className="text-sm font-semibold text-slate-500">
                                    Skills Found
                                </p>

                                <p className="mt-2 text-4xl font-extrabold text-slate-900">
                                    {result.analysis?.skills?.length || 0}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">

                                    {result.analysis?.skills
                                        ?.slice(0, 6)
                                        .map((skill, index) => (

                                            <span
                                                key={index}
                                                className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700"
                                            >
                                                {skill}
                                            </span>

                                        ))}

                                </div>

                            </div>


                            {/* SECTIONS */}

                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <p className="text-sm font-semibold text-slate-500">
                                    Sections Detected
                                </p>

                                <p className="mt-2 text-4xl font-extrabold text-slate-900">
                                    {result.analysis?.sections?.length || 0}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">

                                    {result.analysis?.sections?.map(
                                        (section, index) => (

                                            <span
                                                key={index}
                                                className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold capitalize text-emerald-700"
                                            >
                                                ✓ {section}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>

                        </div>


                        {/* ================= SKILLS ================= */}

                        <div className="grid gap-6 lg:grid-cols-2">


                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <div className="mb-5 flex items-center justify-between">

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            🛠️ Skills Found
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            Technical skills detected in your resume
                                        </p>
                                    </div>

                                    <span className="rounded-lg bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                                        {result.analysis?.skills?.length || 0}
                                    </span>

                                </div>


                                <div className="flex flex-wrap gap-2">

                                    {result.analysis?.skills?.length > 0 ? (
                                        result.analysis.skills.map(
                                            (skill, index) => (

                                                <span
                                                    key={index}
                                                    className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700"
                                                >
                                                    {skill}
                                                </span>

                                            )
                                        )
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            No technical skills detected.
                                        </p>
                                    )}

                                </div>

                            </div>


                            {/* MISSING SKILLS */}

                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <div className="mb-5 flex items-center justify-between">

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            🎯 Missing Skills
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            Important skills not detected
                                        </p>
                                    </div>

                                    <span className="rounded-lg bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                                        {result.analysis?.missingSkills?.length || 0}
                                    </span>

                                </div>


                                <div className="flex flex-wrap gap-2">

                                    {result.analysis?.missingSkills?.length > 0 ? (
                                        result.analysis.missingSkills.map(
                                            (skill, index) => (

                                                <span
                                                    key={index}
                                                    className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600"
                                                >
                                                    + {skill}
                                                </span>

                                            )
                                        )
                                    ) : (
                                        <p className="text-sm text-emerald-600">
                                            🎉 No important missing skills detected.
                                        </p>
                                    )}

                                </div>

                            </div>

                        </div>


                        {/* ================= STRENGTH + WEAKNESS ================= */}

                        <div className="grid gap-6 lg:grid-cols-2">


                            {/* STRENGTH */}

                            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

                                <div className="mb-5">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        💪 Strengths
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        What your resume is doing well
                                    </p>

                                </div>


                                <div className="space-y-3">

                                    {result.analysis?.strengths?.length > 0 ? (
                                        result.analysis.strengths.map(
                                            (item, index) => (

                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4"
                                                >

                                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                                                        ✓
                                                    </span>

                                                    <p className="text-sm font-medium leading-6 text-emerald-900">
                                                        {item}
                                                    </p>

                                                </div>

                                            )
                                        )
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            No strengths detected yet.
                                        </p>
                                    )}

                                </div>

                            </div>


                            {/* WEAKNESS */}

                            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">

                                <div className="mb-5">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        ⚠️ Weaknesses
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        Areas that can be improved
                                    </p>

                                </div>


                                <div className="space-y-3">

                                    {result.analysis?.weaknesses?.length > 0 ? (
                                        result.analysis.weaknesses.map(
                                            (item, index) => (

                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 rounded-xl bg-orange-50 p-4"
                                                >

                                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                                                        !
                                                    </span>

                                                    <p className="text-sm font-medium leading-6 text-orange-900">
                                                        {item}
                                                    </p>

                                                </div>

                                            )
                                        )
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            No major weaknesses detected.
                                        </p>
                                    )}

                                </div>

                            </div>

                        </div>


                        {/* ================= SUGGESTIONS ================= */}

                        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm">

                            <div className="mb-5">

                                <h3 className="text-lg font-bold text-slate-900">
                                    💡 Improvement Suggestions
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Follow these suggestions to improve your resume
                                </p>

                            </div>


                            <div className="grid gap-3 md:grid-cols-2">

                                {result.analysis?.suggestions?.map(
                                    (suggestion, index) => (

                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-white p-4"
                                        >

                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm text-white">
                                                {index + 1}
                                            </span>

                                            <p className="text-sm leading-6 text-slate-700">
                                                {suggestion}
                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>


                        {/* ================= RESUME INFO ================= */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <h3 className="text-lg font-bold text-slate-900">
                                📄 Resume Information
                            </h3>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-500">
                                        File Name
                                    </p>
                                    <p className="mt-1 truncate text-sm font-bold text-slate-800">
                                        {result.resume?.originalName}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-500">
                                        File Type
                                    </p>
                                    <p className="mt-1 text-sm font-bold uppercase text-slate-800">
                                        {result.resume?.fileType}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-500">
                                        Words
                                    </p>
                                    <p className="mt-1 text-sm font-bold text-slate-800">
                                        {result.resume?.wordCount}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-500">
                                        Characters
                                    </p>
                                    <p className="mt-1 text-sm font-bold text-slate-800">
                                        {result.resume?.characterCount}
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* ================= CONTACT STATUS ================= */}

                        <div className="grid gap-6 md:grid-cols-2">


                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <h3 className="text-lg font-bold text-slate-900">
                                    📞 Contact Information
                                </h3>

                                <div className="mt-5 space-y-3">

                                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                                        <span className="text-sm font-medium text-slate-600">
                                            Email
                                        </span>

                                        <span
                                            className={`rounded-lg px-3 py-1 text-xs font-bold ${result.analysis?.personalInfo?.email
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {result.analysis?.personalInfo?.email
                                                ? "Detected"
                                                : "Not Found"}
                                        </span>

                                    </div>


                                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                                        <span className="text-sm font-medium text-slate-600">
                                            Phone
                                        </span>

                                        <span
                                            className={`rounded-lg px-3 py-1 text-xs font-bold ${result.analysis?.personalInfo?.phone
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {result.analysis?.personalInfo?.phone
                                                ? "Detected"
                                                : "Not Found"}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <h3 className="text-lg font-bold text-slate-900">
                                    🔗 Online Profiles
                                </h3>

                                <div className="mt-5 space-y-3">

                                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                                        <span className="text-sm font-medium text-slate-600">
                                            GitHub
                                        </span>

                                        <span
                                            className={`rounded-lg px-3 py-1 text-xs font-bold ${result.analysis?.profiles?.github
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {result.analysis?.profiles?.github
                                                ? "Detected"
                                                : "Not Found"}
                                        </span>

                                    </div>


                                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                                        <span className="text-sm font-medium text-slate-600">
                                            LinkedIn
                                        </span>

                                        <span
                                            className={`rounded-lg px-3 py-1 text-xs font-bold ${result.analysis?.profiles?.linkedin
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {result.analysis?.profiles?.linkedin
                                                ? "Detected"
                                                : "Not Found"}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>


                    </section>
                )}

            </main>


            {/* ================= FOOTER ================= */}

            <footer className="mt-16 border-t border-slate-200 bg-white">

                <div className="mx-auto max-w-7xl px-6 py-8 text-center">

                    <p className="text-sm text-slate-500">
                        Resume Analyzer • Rule-based Resume Analysis
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        Built with React, Node.js, Express and MongoDB
                    </p>

                </div>

            </footer>

        </div>
    );
};

export default Home;