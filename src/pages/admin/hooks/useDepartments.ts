import { useState } from "react"
import { apiFetch } from "@/lib/api"
import { Department } from "../types/adminTypes"

export const useDepartments = () => {

  const [departments, setDepartments] =
    useState<Record<string, Department[]>>({})

  const fetchDepartments = async (schools:any[]) => {

    const temp: Record<string, Department[]> = {}

    for (const school of schools) {

      try {

        const res = await apiFetch(`/departments/${school._id}`)
        const data = await res.json()

        temp[school._id] = data

      } catch {

        temp[school._id] = []

      }

    }

    setDepartments(temp)

  }

  return { departments, fetchDepartments }

}