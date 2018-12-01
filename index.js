#!/usr/bin/env node
const got = require('got')
const cookieJar = new (require('tough-cookie')).CookieJar()
const body = new require('form-data')()
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
  const start = Math.ceil(Math.random() * 32950)
  const uid = [...Array(10).keys()].map(i => i + start)
  const space = uid.map(i => got(`https://www.hostloc.com/space-uid-${i}.html`, { cookieJar }))
  await Promise.all(space)
}
const main = async () => {
  try {
    await login()
    const a = await credit()
    await space()
    console.log(a + '=>' + (await credit()))
  } catch (e) {
    console.log(e)
  }
}
const argv = process.argv.slice(2)
if (argv.length < 2) {
  console.log(`# 立即刷分
hostloc-credit username password
# 每天3点3分2秒
hostloc-credit username password 2 3 3 \\* \\* \\*
# 每天1,9,17点3分2秒, 多次避免502时没刷到
hostloc-credit username password '2 3 1,9,17 * * *'
# 后台
nohup hostloc-credit username password '59 59 */8 * * *'&`)
  return
}
body.append('username', argv[0])
body.append('password', argv[1])
if (argv.length > 2) {
  const cron = require('node-schedule').scheduleJob
  cron(argv.slice(2).join(' '), () => main())
} else {
  main()
}
