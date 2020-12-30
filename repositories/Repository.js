import UsersRepository from '@/repositories/UsersRepository'
import AnnouncementsRepository from '@/repositories/AnnouncementsRepository'

export default $axios => ({
  users: UsersRepository($axios),
  announcements: AnnouncementsRepository($axios)
})
