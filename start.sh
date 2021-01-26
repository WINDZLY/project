#拉去文件
git pull

#打包文件
cnpm run build

#删除容器
docker rm -f project &> /dev/null

#启动容器
docker run -d --restart=on-failure:5\
    -p 9901:80 \
    -v $PWD/dist:/usr/share/nginx/html \
    -v /home/windzly/nginx/conf.d:/etc/nginx/conf.d \
    --name project nginx
