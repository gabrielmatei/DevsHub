import UsersRepository from '@/repositories/UsersRepository'
import ContestsRepository from '@/repositories/ContestsRepository'
import TutorialsRepository from '@/repositories/TutorialsRepository'
import AnnouncementsRepository from '@/repositories/AnnouncementsRepository'

export default $axios => ({
  users: UsersRepository($axios),
  contests: ContestsRepository($axios),
  tutorials: TutorialsRepository($axios),
  announcements: AnnouncementsRepository($axios)
})
