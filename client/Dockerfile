# ----- BASE -----
FROM alpine:3.19.1 AS base


# ----- BUILD -----
FROM base AS builder

RUN apk update \
  && apk add --no-cache nodejs yarn

WORKDIR /app

COPY *.json .

RUN yarn install

COPY . .

RUN yarn build


# ----- RUN -----
FROM base AS release

RUN apk update \
  && apk add --no-cache nginx \
  && addgroup -S app \
  && adduser -S app -G app \
  && touch /run/nginx/nginx.pid \
  && chown -R app:app /var/log/nginx /var/lib/nginx /run/nginx/nginx.pid

USER app

RUN chmod -R 700 /var/log/nginx /var/lib/nginx /run/nginx/nginx.pid

COPY --chown=app:app --from=builder /app/dist /usr/share/nginx/html
COPY --chown=app:app --from=builder /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]