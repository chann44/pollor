
export const useSignup = async ({ username, password }: FormValues) => {
  const res = await instance.post('/auth/signup', {
    username: username,
    password: password,
  })
  console.log(res.status, res.data)
}

export const useLogout = async () => {
  const res = await instance.post('/signup', null, {
    withCredentials: true,
  })
  console.log(res.status)
}
