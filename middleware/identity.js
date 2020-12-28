export default ({ store, route, redirect }) => {
  const roles = route.meta[0].roles

  if (roles.includes('any')) {
    return
  }

  if (!store.state.auth.loggedIn) {
    return redirect('/')
  }

  if (roles.includes('user')) {
    return
  }

  const userRole = store.state.auth.user.role
  if (roles.includes(userRole)) {
    return
  }

  return redirect('/error')
}
