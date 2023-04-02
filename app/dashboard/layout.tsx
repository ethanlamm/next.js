import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>DashboardLayout</div>
            <main>{children}</main>
        </>
    )
}