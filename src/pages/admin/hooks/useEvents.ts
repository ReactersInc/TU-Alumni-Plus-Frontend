import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"
import { Event } from "../types/adminTypes"

export const useEvents = () => {

  const [events, setEvents] = useState<Event[]>([])

  const fetchEvents = async () => {

    try {

      const res = await apiFetch("/upcoming")
      const data = await res.json()

      setEvents(data.events || [])

    } catch (err) {
      console.error(err)
    }

  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return { events, fetchEvents }

}