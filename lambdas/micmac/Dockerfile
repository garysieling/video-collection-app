FROM ubuntu:16.04

RUN apt-get update -qq && apt-get install -qq

RUN apt-get install -y make imagemagick libimage-exiftool-perl exiv2 proj-bin qt5-default git build-essential cmake

RUN git clone https://github.com/micmacIGN/micmac.git && \
    cd micmac && \
    mkdir build && \
    cd build && \
    cmake ../ && \
    make install -j8

CMD bash
