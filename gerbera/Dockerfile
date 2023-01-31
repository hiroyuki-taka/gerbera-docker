ARG BASE_IMAGE=alpine:3.17
FROM ${BASE_IMAGE} AS builder

WORKDIR /gerbera_build
RUN apk add --no-cache gcc g++ pkgconf make automake autoconf libtool \
	    util-linux-dev sqlite-dev mariadb-connector-c-dev cmake zlib-dev \
	    file-dev libexif-dev curl-dev wget xz wavpack-dev \
	    libmatroska-dev libebml-dev taglib-dev pugixml-dev \
        duktape-dev fmt-dev spdlog-dev git bash ffmpeg4-dev && \
    git clone https://github.com/gerbera/gerbera.git -b v1.12.1 

WORKDIR /ffmpegthumbnailer_build
RUN pwd && ls -la /gerbera_build/gerbera/scripts && \
    cp /gerbera_build/gerbera/scripts/install-ffmpegthumbnailer.sh . && \
    cp /gerbera_build/gerbera/scripts/versions.sh . && \
    ./install-ffmpegthumbnailer.sh

WORKDIR /libupnp_build
RUN cp /gerbera_build/gerbera/scripts/install-pupnp.sh . && \
    cp /gerbera_build/gerbera/scripts/versions.sh . && \
    ./install-pupnp.sh

WORKDIR /gerbera_build/gerbera
RUN cmake -S . -B build \
        -DCMAKE_BUILD_TYPE=Release \
        -DCMAKE_CXX_FLAGS=-g1 \
        -DWITH_MAGIC=1 -DWITH_MYSQL=1 -DWITH_CURL=1 -DWITH_JS=1 \
        -DWITH_TAGLIB=1 -DWITH_AVCODEC=1 -DWITH_FFMPEGTHUMBNAILER=1 \
        -DWITH_WAVPACK=1 -DWITH_EXIF=1 -DWITH_LASTFM=0 -DWITH_SYSTEMD=0 -DWITH_DEBUG=1 \
        -DWITH_INOTIFY=1 && \
    cmake --build build -j2

# ---------------------------------------
FROM ${BASE_IMAGE} as gerbera
COPY . .

RUN apk add --no-cache tini  \
        util-linux sqlite sqlite-libs mariadb-connector-c zlib \
        file curl ffmpeg4-libs duktape fmt wavpack mariadb-connector-c \
        libmatroska libebml libexif taglib ffmpeg4-libs wavpack pugixml \
        spdlog su-exec tzdata

COPY --from=builder /usr/local/lib/libixml.so* /usr/local/lib/libupnp.so* /usr/lib/
COPY --from=builder /usr/local/lib/libffmpegthumbnailder.so* /usr/lib/
COPY --from=builder /gerbera_build/gerbera/build/gerbera /bin
COPY --from=builder /gerbera_build/gerbera/scripts/js /usr/local/share/gerbera/js
COPY --from=builder /gerbera_build/gerbera/web /usr/local/share/gerbera/web
COPY --from=builder /gerbera_build/gerbera/src/database/*/*.sql /gerbera_build/gerbera/src/database/*/*.xml /usr/local/share/gerbera/
COPY --from=builder /gerbera_build/gerbera/scripts/docker/docker-entrypoint.sh /usr/local/bin

RUN addgroup -S gerbera 2> /dev/null && \
    adduser -S -D -H -h /var/run/gerbera -s /sbin/nologin -G gerbera gerbera 2>/dev/null && \
    mkdir /var/run/gerbera && chmod 2775 /var/run/gerbera && \
    pwd && ls -la


EXPOSE 49494
EXPOSE 1900/udp

ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "gerbera","-port", "49494" ]
