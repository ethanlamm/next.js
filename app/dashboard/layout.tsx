import React from 'react'

import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>DashboardLayout</div><br />
            <Link href={'/dashboard'}>Dashboard</Link>&nbsp;&nbsp;&nbsp;
            <Link href={'/dashboard/settings'}>Setings</Link>&nbsp;&nbsp;&nbsp;
            <Link href={'/'}>Home</Link>
            <main>{children}</main>
        </>
    )
}