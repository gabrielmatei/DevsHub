import UsersRepository from '@/repositories/UsersRepository'

export default $axios => ({
  users: UsersRepository($axios)
})
