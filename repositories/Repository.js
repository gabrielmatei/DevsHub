import UsersRepository from '@/repositories/UsersRepository'
import ContestsRepository from '@/repositories/ContestsRepository'
import AnnouncementsRepository from '@/repositories/AnnouncementsRepository'

export default $axios => ({
  users: UsersRepository($axios),
  contests: ContestsRepository($axios),
  announcements: AnnouncementsRepository($axios)
})
