export interface BaseUser {
  first_name: string
  last_name: string
  email: string
  username: string
  role: string
}

export interface StudentProfile {
  user: BaseUser
  id: number
  instrument: string
  grade_level: number
  location: string
  bio: string
  profile_picture: string
}

export interface TeacherProfile {
  user: BaseUser
  id: number
  instrument: string
  years_experience: number
  location: string
  bio: string
  rate: number
  profile_picture: string
}
