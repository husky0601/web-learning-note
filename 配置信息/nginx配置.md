# Nginx理解    
> 参考文章：  

> [nginx官网](https://nginx.org/en/docs/)    
[Nginx能为前端开发带来什么](http://imweb.io/topic/56386972d12b230c26e1a17d)   
[nginx服务器安装及配置文件详情](https://segmentfault.com/a/1190000002797601) 
[nginx基本入门](https://ivweb.io/topic/58427dfb270eedfd10a0f5ea)   
[做个前端，来点Nginx吧](http://www.imooc.com/article/20200)

## 一、什么是Nginx 

## 二、如何使用Nginx

## 三、了解Nginx的配置

## 四、Nginx在前端的应用  

## 五、项目的配置信息解读   

- **site.conf**
```
server {
    listen 80;
    expires 1h;

    # auth_basic "Restricted Content";
    # auth_basic_user_file /etc/nginx/.htpasswd;

    location / {
        if ($http_x_forwarded_proto = "http") {
            rewrite ^(.*)$ https://$host$1 permanent;
        }
        root   /usr/share/nginx/html;
        index  index.html index.htm;

    }

    location /help/ {
        if ($http_x_forwarded_proto = "http") {
            rewrite ^(.*)$ https://$host$1 permanent;
        }
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        auth_basic off;
    }

    location /share/ {
        if ($http_x_forwarded_proto = "http") {
            rewrite ^(.*)$ https://$host$1 permanent;
        }
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        auth_basic off;
    }

    location /reset {
        if ($http_x_forwarded_proto = "http") {
            rewrite ^(.*)$ https://$host$1 permanent;
        }
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        auth_basic off;
    }

    location /forgot/ {
        if ($http_x_forwarded_proto = "http") {
            rewrite ^(.*)$ https://$host$1 permanent;
        }
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        auth_basic off;
    }

    location /error {
        if ($http_x_forwarded_proto = "http") {
            rewrite ^(.*)$ https://$host$1 permanent;
        }
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        auth_basic off;
    }

    location /privacy/ {
        if ($http_x_forwarded_proto = "http") {
            rewrite ^(.*)$ https://$host$1 permanent;
        }
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        auth_basic off;
    }

    location /static/ {
        if ($http_x_forwarded_proto = "http") {
            rewrite ^(.*)$ https://$host$1 permanent;
        }
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        auth_basic off;
    }

    location /ping {
      access_log off;
      add_header Content-Length 0;
      add_header Content-Type text/plain;
      return 200;
    }
}

```  
- **nginx.conf**   
``` 
user  nginx;
worker_processes  1;
daemon off;

error_log   /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}

```
