'use client'
import React, { useState } from 'react'

export default function DashboardPage() {
    const [count, setCount] = useState(0)
    return (
        <>
            <div>DashboardPage</div>
            <p>Template will create a new instance for each of their children —— so that the counnt will be reset when the route switch back: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </>
    )
}
