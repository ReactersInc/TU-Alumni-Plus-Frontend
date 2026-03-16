export interface School {
  _id: string
  name: string
}

export interface Department {
  _id: string
  name: string
  schoolId: string
}

export interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  registrationLink: string
  imageBase64?: string
}

export interface Report {
  _id: string
  postId: string
  name: string
  email: string
  reason: string
  created_at?: string
}