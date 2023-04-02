import React from 'react'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>SettingsLayout</div>
            <main>{children}</main>
        </>
    )
}