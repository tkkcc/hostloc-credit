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
# 每天3点3分2秒
hostloc-credit username password 2 3 3 \* \* \*
# 每天1,9,17点3分2秒, 多次避免502时没刷到
hostloc-credit username password '2 3 1,9,17'
# 后台
nohup hostloc-credit username password '59 59 */8 * * *'&
```
```
# *    *    *    *    *    *
# ┬    ┬    ┬    ┬    ┬    ┬
# │    │    │    │    │    │
# │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
# │    │    │    │    └───── month (1 - 12)
# │    │    │    └────────── day of month (1 - 31)
# │    │    └─────────────── hour (0 - 23)
# │    └──────────────────── minute (0 - 59)
# └───────────────────────── second (0 - 59, OPTIONAL)
```

## install node&npm on debian

```sh
curl -sL https://deb.nodesource.com/setup_11.x | bash -
apt-get install -y nodejs
```

