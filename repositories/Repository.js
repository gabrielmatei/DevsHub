import AccountRepository from '@/repositories/AccountRepository'
import UsersRepository from '@/repositories/UsersRepository'
import ContestsRepository from '@/repositories/ContestsRepository'
import TutorialsRepository from '@/repositories/TutorialsRepository'
import TutorialCategoriesRepository from '@/repositories/TutorialCategoriesRepository'
import AnnouncementsRepository from '@/repositories/AnnouncementsRepository'

export default $axios => ({
  account: AccountRepository($axios),
  users: UsersRepository($axios),
  contests: ContestsRepository($axios),
  tutorials: TutorialsRepository($axios),
  tutorialCategories: TutorialCategoriesRepository($axios),
  announcements: AnnouncementsRepository($axios)
})
