#!/bin/bash

while true; do
  for i in {1..3}; do
    curl -s http://level9/reset_discussions.php
    sleep 20
  done
done
