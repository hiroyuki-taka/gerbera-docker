ARG BASE_IMAGE=alpine:3.19
FROM ${BASE_IMAGE} AS builder

WORKDIR /gerbera_build
RUN apk add --no-cache build-base cmake gcc g++ pkgconf make automake autoconf libtool \
	    util-linux-dev sqlite-dev mariadb-connector-c-dev cmake zlib-dev \
	    file-dev libexif-dev curl-dev wget xz wavpack wavpack-dev ffmpegthumbnailer-dev \
	    libmatroska-dev libebml-dev taglib-dev pugixml-dev  gnu-libiconv-dev libupnp-dev \
        duktape-dev fmt-dev spdlog-dev git bash exiv2-dev ffmpeg-dev tini file jpeg-dev && \
    git clone https://github.com/gerbera/gerbera.git -b v1.12.1 && \
    wget https://distfiles.alpinelinux.org/distfiles/v3.19/gerbera-1.12.1-fmt10.patch && \
    patch -d gerbera -p1 < gerbera-1.12.1-fmt10.patch

WORKDIR /gerbera_build/gerbera
RUN cmake -S . -B build \
        -DCMAKE_BUILD_TYPE=Release \
        -DCMAKE_CXX_FLAGS=-g1 \
        -DWITH_MAGIC=1 -DWITH_MYSQL=1 -DWITH_CURL=1 -DWITH_JS=1 \
        -DWITH_TAGLIB=1 -DWITH_AVCODEC=1 -DWITH_FFMPEGTHUMBNAILER=1 \
        -DWITH_WAVPACK=1 -DWITH_EXIF=1 -DWITH-EXIV2=1 -DWITH_LASTFM=0 -DWITH_SYSTEMD=0 -DWITH_DEBUG=1 \
        -DWITH_INOTIFY=1 && \
    cmake --build build -j2

# ---------------------------------------
FROM ${BASE_IMAGE} as gerbera

RUN apk add --no-cache tini  \
        util-linux sqlite sqlite-libs zlib libupnp gnu-libiconv ffmpegthumbnailer \
        file curl ffmpeg-libs duktape fmt wavpack mariadb-connector-c \
        libmatroska libebml libexif taglib ffmpeg-libs pugixml jpeg \
        spdlog su-exec tzdata

COPY --from=builder /usr/local/bin/*  /usr/local/bin/
COPY --from=builder /usr/local/lib/libffmpegthumbnailer.so*  /usr/lib/
COPY --from=builder /gerbera_build/gerbera/build/gerbera /bin
COPY --from=builder /gerbera_build/gerbera/scripts/js /usr/local/share/gerbera/js
COPY --from=builder /gerbera_build/gerbera/web /usr/local/share/gerbera/web
COPY --from=builder /gerbera_build/gerbera/src/database/*/*.sql /gerbera_build/gerbera/src/database/*/*.xml /usr/local/share/gerbera/
COPY --from=builder /gerbera_build/gerbera/scripts/docker/docker-entrypoint.sh /usr/local/bin

RUN addgroup -S gerbera 2> /dev/null && \
    adduser -S -D -H -h /var/run/gerbera -s /sbin/nologin -G gerbera gerbera 2>/dev/null && \
    mkdir /var/run/gerbera && chmod 2775 /var/run/gerbera && \
    pwd && ls -la /usr/lib


EXPOSE 49494
EXPOSE 1900/udp

ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "gerbera","--port", "49494", "--config", "/root/.config/gerbera/config.xml" ]

FROM gerbera AS default
