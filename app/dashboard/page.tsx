"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BarChart2, ExternalLink, QrCode, Copy } from "lucide-react"

export default function DashboardPage() {
    const [qrs, setQrs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchQrs = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                // Handle redirect to login
                setLoading(false)
                return
            }

            // Fetch QRs
            const { data, error } = await supabase
                .from('qrs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (data) setQrs(data)
            setLoading(false)
        }

        fetchQrs()
    }, [])

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-8">
            <div className="mx-auto max-w-6xl space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Manage your QR codes and view performance.</p>
                    </div>
                    <Link href="/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New QR Code
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-48 rounded-lg border bg-white/50 animate-pulse" />
                        ))}
                    </div>
                ) : qrs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                        <QrCode className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold">No QR codes yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">Create your first Thai QR code to get started.</p>
                        <Link href="/create">
                            <Button>Create QR Code</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {qrs.map((qr) => (
                            <Card key={qr.id} className="transition-all hover:shadow-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="truncate">{qr.name}</CardTitle>
                                    <CardDescription className="truncate">{qr.original_url}</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                    <div className="flex items-center text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded w-fit">
                                        /s/{qr.short_slug}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between pt-4 border-t mt-4">
                                    <div className="flex gap-2">
                                        <Link href={`/dashboard/${qr.id}`}>
                                            <Button variant="ghost" size="sm">
                                                <BarChart2 className="mr-2 h-4 w-4" />
                                                Analytics
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="sm" onClick={() => {
                                            const url = `${window.location.origin}/s/${qr.short_slug}`
                                            navigator.clipboard.writeText(url).then(() => {
                                                alert("Copied to clipboard: " + url)
                                            })
                                        }}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Link href={`/s/${qr.short_slug}`} target="_blank">
                                        <Button variant="outline" size="sm">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
