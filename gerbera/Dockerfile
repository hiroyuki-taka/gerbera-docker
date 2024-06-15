ARG BASE_IMAGE=debian:trixie-slim
FROM ${BASE_IMAGE} AS builder

WORKDIR /gerbera_build
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y git build-essential autoconf automake libtool util-linux cmake \
        dpkg-dev shtool pkg-config bsdmainutils \
        libupnp-dev  uuid-dev libpugixml-dev zlib1g-dev libfmt-dev libspdlog-dev duktape-dev libduktape207 \
        curl libcurl4-openssl-dev libavformat-dev libwavpack-dev libmagic-dev \
        libexif-dev libexiv2-dev libpugixml-dev libebml-dev libmatroska-dev libffmpegthumbnailer-dev \
        libsqlite3-dev libmariadb-dev libtag1-dev && \
    git clone https://github.com/gerbera/gerbera.git -b v2.1.0

WORKDIR /gerbera_build/gerbera
RUN cmake -S . -B build \
        -DCMAKE_BUILD_TYPE=Release \
        -DCMAKE_CXX_FLAGS=-g1 \
        -DWITH_MAGIC=1 -DWITH_MYSQL=1 -DWITH_CURL=1 -DWITH_JS=1 \
        -DWITH_TAGLIB=1 -DWITH_AVCODEC=1 -DWITH_FFMPEGTHUMBNAILER=1 \
        -DWITH_WAVPACK=1 -DWITH_EXIF=1 -DWITH_EXIV2=1 -DWITH_LASTFM=0 -DWITH_SYSTEMD=0 -DWITH_DEBUG=1 \
        -DWITH_INOTIFY=1 && \
    cmake --build build -j4 -- install

# ---------------------------------------
FROM ${BASE_IMAGE} as gerbera

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y tini util-linux \
        libupnp17t64 libixml11t64 uuid libpugixml1v5 zlib1g libfmt9 libspdlog1.12 libduktape207 \
        libcurl4 libavformat60 libwavpack1 libmagic1 \
        libexif12 libexiv2-27 libpugixml1v5 libebml5 libmatroska7 libffmpegthumbnailer4v5 \
        libsqlite3-0 libmariadb3 libtag1v5 && \
    apt-get clean

COPY --from=builder /usr/local/bin/gerbera /bin
COPY --from=builder /usr/local/share/gerbera /usr/local/share/gerbera
COPY --from=builder /gerbera_build/gerbera/scripts/docker/docker-entrypoint.sh /usr/local/bin

RUN mkdir /var/run/gerbera && chmod 2775 /var/run/gerbera && \
    adduser --home /var/run/gerbera --no-create-home --disabled-password --disabled-login gerbera && \
    chown gerbera.gerbera /var/run/gerbera

EXPOSE 49494
EXPOSE 1900/udp

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD [ "gerbera","--port", "49494", "--config", "/root/.config/gerbera/config.xml" ]

FROM gerbera AS default
