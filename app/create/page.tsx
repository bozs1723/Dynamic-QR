"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Loader2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { QRPreview } from "@/components/qr-editor/qr-preview"
import { createClient } from "@/lib/supabase"
// import { toast } from "sonner" // Assuming we might add toast later

export default function CreateQRPage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "My First QR",
        destinationUrl: "",
        shortSlug: "",
        fgColor: "#000000",
        bgColor: "#ffffff",
    })

    // Auto-generate slug from name if empty (simple version)
    useEffect(() => {
        if (!formData.shortSlug && formData.name) {
            // Simple slugify just for suggestion, user can override
            // Not implementing heavy logic here to keep it simple
        }
    }, [formData.name])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleCreate = async () => {
        if (!formData.destinationUrl) {
            alert("Please enter a destination URL") // Minimalist validation for now
            return
        }

        setLoading(true)
        try {
            const supabase = createClient()
            // Auth check - for now assuming user is logged in or we allow anon (based on RLS)
            // But the schema implies user_id is required. 
            // For this demo, let's assume we need to handle the 'not logged in' case or just try insert.

            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                alert("You must be logged in to create a QR code.")
                setLoading(false)
                return
            }

            const { error } = await supabase.from('qrs').insert({
                user_id: user.id,
                name: formData.name,
                original_url: formData.destinationUrl,
                short_slug: formData.shortSlug || Math.random().toString(36).substring(7), // Random if empty
                design_settings: {
                    fgColor: formData.fgColor,
                    bgColor: formData.bgColor
                }
            })

            if (error) throw error

            alert("QR Code Created Successfully!")
            // Redirect or clear
            // router.push('/dashboard')
        } catch (error: any) {
            console.error("Error creating QR:", error)
            alert("Error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Top Bar */}
            <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-6 shadow-sm">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => { }}>
                        Cancel
                    </Button>
                    <Button size="sm" onClick={handleCreate} disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save QR Code
                    </Button>
                </div>
            </header>

            <main className="container grid max-w-6xl grid-cols-1 gap-8 py-8 md:grid-cols-12 md:py-12">
                {/* Left Panel: Editor */}
                <div className="md:col-span-7 lg:col-span-8 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Create QR Code</h1>
                        <p className="text-muted-foreground">Configure the destination and design of your dynamic QR code.</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Where should this QR code take people?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">QR Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g. Summer Campaign 2024"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="destinationUrl">Destination URL</Label>
                                <Input
                                    id="destinationUrl"
                                    name="destinationUrl"
                                    placeholder="https://example.com/landing-page"
                                    value={formData.destinationUrl}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-muted-foreground">The content you want to link to. You can change this later.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="shortSlug">Custom Back-half (Optional)</Label>
                                <div className="flex">
                                    <div className="flex items-center border border-r-0 rounded-l-md bg-muted px-3 text-sm text-muted-foreground">
                                        qr.app/s/
                                    </div>
                                    <Input
                                        id="shortSlug"
                                        name="shortSlug"
                                        className="rounded-l-none"
                                        placeholder="summer-sale"
                                        value={formData.shortSlug}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Design Customization</CardTitle>
                            <CardDescription>Make it match your brand.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="fgColor">Foreground Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="fgColor"
                                            name="fgColor"
                                            type="color"
                                            className="h-10 w-20 p-1 cursor-pointer"
                                            value={formData.fgColor}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            value={formData.fgColor}
                                            onChange={handleChange}
                                            name="fgColor"
                                            className="uppercase"
                                            maxLength={7}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bgColor">Background Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="bgColor"
                                            name="bgColor"
                                            type="color"
                                            className="h-10 w-20 p-1 cursor-pointer"
                                            value={formData.bgColor}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            value={formData.bgColor}
                                            onChange={handleChange}
                                            name="bgColor"
                                            className="uppercase"
                                            maxLength={7}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel: Preview */}
                <div className="md:col-span-5 lg:col-span-4">
                    <QRPreview
                        value={formData.destinationUrl}
                        fgColor={formData.fgColor}
                        bgColor={formData.bgColor}
                    />
                </div>
            </main>
        </div>
    )
}
