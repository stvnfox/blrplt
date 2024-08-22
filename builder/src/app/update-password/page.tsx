"use client"

import { Suspense } from "react"

import UpdatePasswordComponent from "./components/UpdatePassword"

export default function UpdatePasswordPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePasswordComponent />
        </Suspense>
    )
}
