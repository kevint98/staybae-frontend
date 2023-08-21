FROM nginx:latest

LABEL service="staybae-ui"

ENV API_URL 'http://localhost:6000'

COPY dist/ /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]