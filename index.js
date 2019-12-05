#!/usr/bin/env node
const got = require('got')
const cookieJar = new (require('tough-cookie').CookieJar)()
const FormData = require('form-data')
const fs = require('fs')
const { Script } = require('vm')
const aes = fs.readFileSync('./aes.min.js') + ' '
const { JSDOM } = require('jsdom')
const login = async () => {
  let url =
    'https://www.hostloc.com/member.php?mod=logging&action=login&loginsubmit=yes&infloat=yes&lssubmit=yes&inajax=1'
  let body = FormData()
  body.append('username', argv[0])
  body.append('password', argv[1])
  let a = await got.post(url, { body })
  a = new JSDOM(a.body, {
    runScripts: 'outside-only'
  })
  s = a.window.document.scripts[1].innerHTML
  s = s.replace('location.href', 't')
  a.runVMScript(new Script(aes + s))
  a = a.window.document.cookie
  cookieJar.setCookieSync(a, 'https://www.hostloc.com')
  body = FormData() // must renew a form data
  body.append('username', argv[0])
  body.append('password', argv[1])
  a = await got.post(url, { body, cookieJar })
  if (a.body.includes('登录失败')) throw a.body
}
const credit = async () => {
  const a = await got('https://www.hostloc.com/forum.php', { cookieJar })
  return /积分: (\d+)/.exec(a.body)[1]
}
const space = async () => {
  const start = Math.ceil(Math.random() * 32950)
  const uid = [...Array(10).keys()].map(i => i + start)
  const space = uid.map(i =>
    got(`https://www.hostloc.com/space-uid-${i}.html`, { cookieJar })
  )
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
if (argv.length !== 2) {
  console.log(`hostloc-credit username password`)
  return
}
main()
