FROM node:10.9.0

LABEL maintainer="Shiqan"
LABEL description="Docker image for building jekyll site with gulp"

ENV NODE_ENV=development

RUN \
  apt-get update && apt-get install -y --no-install-recommends --no-install-suggests \
  curl \
  bzip2 \
  build-essential \
  libssl-dev \
  libreadline-dev \
  zlib1g-dev && \
  rm -rf /var/lib/apt/lists/* && \
  curl -L https://github.com/sstephenson/ruby-build/archive/v20180329.tar.gz | tar -zxvf - -C /tmp/ && \
  cd /tmp/ruby-build-* && ./install.sh && cd / && \
  ruby-build -v 2.5.1 /usr/local && rm -rfv /tmp/ruby-build-* && \
  gem install bundler --no-rdoc --no-ri

WORKDIR /app

COPY package.json /app/package.json
COPY Gemfile /app/Gemfile
RUN \
  npm install -g gulp && \
  npm install
RUN gem install bundler
RUN bundle install

COPY . /app

RUN gulp build

EXPOSE 3000
ENTRYPOINT [ "gulp", "serve"]