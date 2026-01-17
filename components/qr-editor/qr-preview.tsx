"use client"

import React from "react"
import QRCode from "react-qr-code"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface QRPreviewProps {
    value: string
    fgColor: string
    bgColor: string
}

export function QRPreview({ value, fgColor, bgColor }: QRPreviewProps) {
    const downloadQR = () => {
        const svg = document.getElementById("qr-code-svg")
        if (!svg) return
        const svgData = new XMLSerializer().serializeToString(svg)
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const img = new Image()
        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx?.drawImage(img, 0, 0)
            const pngFile = canvas.toDataURL("image/png")
            const downloadLink = document.createElement("a")
            downloadLink.download = "qr-code.png"
            downloadLink.href = pngFile
            downloadLink.click()
        }
        img.src = "data:image/svg+xml;base64," + btoa(svgData)
    }

    return (
        <div className="sticky top-24 space-y-4">
            <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl border-0 ring-1 ring-black/5">
                <CardHeader className="bg-gradient-to-br from-indigo-50 to-white pb-8 text-center border-b">
                    <CardTitle className="text-xl text-slate-800">Live Preview</CardTitle>
                    <CardDescription>Scan to test your dynamic link</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-12 bg-white">
                    <div className="relative group">
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                            <QRCode
                                id="qr-code-svg"
                                value={value || "https://example.com"}
                                size={200}
                                fgColor={fgColor}
                                bgColor={bgColor}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </div>
                </CardContent>
                <div className="p-4 bg-slate-50 text-center text-xs text-muted-foreground border-t">
                    {value ? "Ready to launch" : "Enter a destination URL"}
                </div>
            </Card>

            <div className="flex justify-center">
                <button
                    onClick={downloadQR}
                    className="text-sm font-medium text-primary hover:underline"
                >
                    Download PNG
                </button>
            </div>
        </div>
    )
}
