FROM nginx

EXPOSE 80

COPY dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d