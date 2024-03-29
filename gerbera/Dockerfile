ARG BASE_IMAGE=alpine:3.19
FROM ${BASE_IMAGE} AS builder

WORKDIR /gerbera_build
RUN apk add --no-cache build-base cmake gcc g++ pkgconf make automake autoconf libtool \
	    util-linux-dev sqlite-dev mariadb-connector-c-dev cmake zlib-dev \
	    file-dev libexif-dev curl-dev wget xz wavpack wavpack-dev ffmpegthumbnailer-dev \
	    libmatroska-dev libebml-dev taglib-dev pugixml-dev gnu-libiconv-dev libupnp-dev \
        duktape-dev fmt-dev spdlog-dev git bash exiv2-dev ffmpeg-dev tini file jpeg-dev && \
    git clone https://github.com/gerbera/gerbera.git -b v2.0.0

WORKDIR /gerbera_build/gerbera
RUN cmake -S . -B build \
        -DCMAKE_BUILD_TYPE=Release \
        -DCMAKE_CXX_FLAGS=-g1 \
        -DWITH_MAGIC=1 -DWITH_MYSQL=1 -DWITH_CURL=1 -DWITH_JS=1 \
        -DWITH_TAGLIB=1 -DWITH_AVCODEC=1 -DWITH_FFMPEGTHUMBNAILER=1 \
        -DWITH_WAVPACK=1 -DWITH_EXIF=1 -DWITH_EXIV2=1 -DWITH_LASTFM=0 -DWITH_SYSTEMD=0 -DWITH_DEBUG=1 \
        -DWITH_INOTIFY=1 && \
    cmake --build build -j4

# ---------------------------------------
FROM ${BASE_IMAGE} as gerbera

RUN apk add --no-cache tini  \
        util-linux sqlite sqlite-libs zlib libupnp gnu-libiconv ffmpegthumbnailer \
        file curl ffmpeg-libs duktape fmt wavpack mariadb-connector-c \
        libmatroska libebml libexif exiv2 taglib ffmpeg-libs pugixml jpeg \
        spdlog su-exec tzdata

COPY --from=builder /gerbera_build/gerbera/build/gerbera /bin
COPY --from=builder /gerbera_build/gerbera/scripts/js /usr/local/share/gerbera/js
COPY --from=builder /gerbera_build/gerbera/web /usr/local/share/gerbera/web
COPY --from=builder /gerbera_build/gerbera/src/database/*/*.sql  /usr/local/share/gerbera/
COPY --from=builder /gerbera_build/gerbera/src/database/*/*-upgrade.xml  /usr/local/share/gerbera/
COPY --from=builder /gerbera_build/gerbera/scripts/docker/docker-entrypoint.sh /usr/local/bin

RUN addgroup -S gerbera 2> /dev/null && \
    adduser -S -D -H -h /var/run/gerbera -s /sbin/nologin -G gerbera gerbera 2>/dev/null && \
    mkdir /var/run/gerbera && chmod 2775 /var/run/gerbera 


EXPOSE 49494
EXPOSE 1900/udp

ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "gerbera","--port", "49494", "--config", "/root/.config/gerbera/config.xml" ]

FROM gerbera AS default
