import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"
import { School } from "../types/adminTypes"

export const useSchools = () => {

  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSchools = async () => {

    try {

      setLoading(true)

      const res = await apiFetch("/schools")
      const data = await res.json()

      setSchools(data)

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchSchools()
  }, [])

  return { schools, fetchSchools, loading }

}