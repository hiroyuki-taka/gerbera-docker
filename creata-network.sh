#!/usr/bin/env bash

docker network create -d macvlan \
  --subnet=192.168.0.0/24
  --ip-range=192.168.0.64/30 \
  --gateway=192.168.0.66 \
  -o parent=enp4s0 gerbera-vlan
