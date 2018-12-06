# hostloc-credit

hostloc空间刷分

## install

```sh
npm i -g hostloc-credit
```

## run

```sh
# 立即刷分
hostloc-credit username password
# 计划任务
(crontab -l 2>/dev/null; echo "59 */8+2 * * * hostloc-credit username password") | crontab -
```

## install node&npm on debian

```sh
curl -sL https://deb.nodesource.com/setup_11.x | bash -
apt-get install -y nodejs
```

