import React from 'react'
import styles from './template.module.css'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.container}>{children}</div>
    )
}
