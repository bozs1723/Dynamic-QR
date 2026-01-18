import { createClient } from "@/lib/supabase"
import { ArrowLeft, Download, ExternalLink, Calendar, Smartphone, Globe } from "lucide-react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScanTrendChart, DeviceChart } from "@/components/dashboard/analytics-charts"

// NOTE: In a real app, complex aggregation is better done via Supabase RPC or dedicated implementation
// For this MVP, we fetch scans and aggregate in JS (not scalable for millions, but fine for demo)

export default async function AnalyticsPage({ params }: { params: { id: string } }) {
    const supabase = createClient()
    const { id } = params

    // Auth Check
    // const { data: { session } } = await supabase.auth.getSession()
    // if (!session) redirect('/login')

    // 1. Fetch QR Details
    const { data: qr } = await supabase.from('qrs').select('*').eq('id', id).single()

    if (!qr) return notFound()

    // 2. Fetch Scans
    const { data: scans } = await supabase.from('scans').select('*').eq('qr_id', id)

    // 3. Aggregate Data
    const totalScans = scans?.length || 0

    // Trend Data (Last 7 days mock or real)
    // Group scans by date
    const scansByDate = (scans || []).reduce((acc: any, scan: any) => {
        const date = new Date(scan.scanned_at).toLocaleDateString()
        acc[date] = (acc[date] || 0) + 1
        return acc
    }, {})

    const trendData = Object.keys(scansByDate).map(date => ({
        date: date,
        count: scansByDate[date]
    })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Device Data
    const deviceCounts = (scans || []).reduce((acc: any, scan: any) => {
        const type = scan.device_type || 'Unknown'
        acc[type] = (acc[type] || 0) + 1
        return acc
    }, {})

    const deviceData = Object.keys(deviceCounts).map(type => ({
        name: type,
        value: deviceCounts[type]
    }))

    // Location Data (Top Cities)
    const cityCounts = (scans || []).reduce((acc: any, scan: any) => {
        const city = scan.city || 'Unknown'
        acc[city] = (acc[city] || 0) + 1
        return acc
    }, {})

    const topCities = Object.keys(cityCounts)
        .map(city => ({ city, count: cityCounts[city] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)


    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-8">
            <div className="mx-auto max-w-6xl space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight">{qr.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-muted-foreground">{qr.original_url}</span>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" /> Export Data
                        </Button>
                        <Button>
                            Download QR
                        </Button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalScans}</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    {/* Add more metric cards if needed */}
                </div>

                {/* Charts Section */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Trend Chart */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Scan Trends</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            {totalScans > 0 ? (
                                <ScanTrendChart data={trendData} />
                            ) : (
                                <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                                    No scan data available yet
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Device Chart */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Device Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {totalScans > 0 ? (
                                <DeviceChart data={deviceData} />
                            ) : (
                                <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                                    No device data
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Top Locations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Locations</CardTitle>
                        <CardDescription>Where your audience is scanning from.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topCities.length > 0 ? topCities.map((item: any, i: number) => (
                                <div key={i} className="flex items-center">
                                    <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{item.city}</p>
                                        <p className="text-sm text-muted-foreground">Country</p>
                                    </div>
                                    <div className="ml-auto font-medium">{item.count} scans</div>
                                </div>
                            )) : (
                                <div className="text-sm text-muted-foreground">No location data available</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
