#!/usr/bin/env node
const got = require('got')
const cookieJar = new (require('tough-cookie')).CookieJar()
const body = new require('form-data')()
body.append('username', process.argv[2])
body.append('password', process.argv[3])
const login = async () => {
  const url = 'https://www.hostloc.com/member.php?mod=logging&action=login&loginsubmit=yes&infloat=yes&lssubmit=yes&inajax=1'
  const a = await got.post(url, { body, cookieJar })
  if (a.body.includes('登录失败')) throw a.body
}
const credit = async () => {
  const a = await got('https://www.hostloc.com/forum.php', { cookieJar })
  return /积分: (\d+)/.exec(a.body)[1]
}
const space = async () => {
  const start = Math.ceil(Math.random() * 32960)
  const uid = [...Array(10).keys()].map(i => i + start)
  const space = uid.map(i => got(`https://www.hostloc.com/space-uid-${i}.html`))
  await Promise.all(space)
}
const main = async () => {
  await login()
  const a = await credit()
  await space()
  console.log(a + '=>' + (await credit()))
}
if (process.argv.length > 5) {
  const schedule = require('schedule')
  schedule.scheduleJob(process.argv.slice(4).join(' '), () => main())
} else {
  main()
}