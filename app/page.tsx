import Link from "next/link";
import Image from "next/image";
import { ArrowRight, QrCode, BarChart3, Globe } from "lucide-react";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Image src="/logo.png" alt="Thai QR Logo" width={32} height={32} className="object-contain" />
                        <span>Thai QR</span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                            Login
                        </Link>
                        <Link
                            href="/create"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            Get Started
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                    <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                        <Link
                            href="https://twitter.com"
                            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                            target="_blank"
                        >
                            Follow on Twitter
                        </Link>
                        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                            The Next Generation of <br /> Thai QR Codes
                        </h1>
                        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-balance">
                            Create beautiful, trackable QR codes in seconds. Real-time analytics,
                            custom designs, and seamless redirection. Built for modern brands.
                        </p>
                        <div className="space-x-4">
                            <Link
                                href="/create"
                                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                            >
                                Create QR Code
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link
                                href="#features"
                                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 rounded-3xl">
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                            Features
                        </h2>
                        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                            Everything you need to manage your QR campaigns.
                        </p>
                    </div>
                    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                                <QrCode className="h-12 w-12 text-primary" />
                                <div className="space-y-2">
                                    <h3 className="font-bold">Dynamic Setup</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Change the destination URL anytime without re-printing.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                                <BarChart3 className="h-12 w-12 text-primary" />
                                <div className="space-y-2">
                                    <h3 className="font-bold">Real-time Analytics</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Track scans, device types, and user locations instantly.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                                <Globe className="h-12 w-12 text-primary" />
                                <div className="space-y-2">
                                    <h3 className="font-bold">Custom Designs</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Add logos, change colors, and style your QR codes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-6 md:px-8 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by Antigravity. The source code is available on <a href="#" className="font-medium underline underline-offset-4">GitHub</a>.
                    </p>
                </div>
            </footer>
        </div>
    );
}
