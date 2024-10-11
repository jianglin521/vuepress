# homeassistant

## 安装

```shell
docker pull homeassistant/home-assistant:stable

docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=Asia/Shanghai \
  -v /docker/homeassistant:/config \
  --network=host \
  homeassistant/home-assistant:stable
```
