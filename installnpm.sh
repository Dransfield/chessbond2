#!/bin/sh

# A word about this shell script:
#
# It must work everywhere, including on systems that lack
# a /bin/bash, map 'sh' to ksh, ksh97, bash, ash, or zsh,
# and potentially have either a posix shell or bourne
# shell living at /bin/sh.
#
# See this helpful document on writing portable shell scripts:
# http://www.gnu.org/s/hello/manual/autoconf/Portable-Shell.html
#
# The only shell it won't ever work on is cmd.exe.

if [ "x$0" = "xsh" ]; then
  # run as curl | sh
  # on some systems, you can just do cat>npm-install.sh
  # which is a bit cuter.  But on others, &1 is already closed,
  # so catting to another script file won't do anything.
  # Follow Location: headers, and fail on errors
  curl -f -L -s https://www.npmjs.org/install.sh > npm-install-$$.sh
  ret=$?
  if [ $ret -eq 0 ]; then
    (exit 0)
  else
    rm npm-install-$$.sh
    echo "Failed to download script" >&2
    exit $ret
  fi
  sh npm-install-$$.sh
  ret=$?
  rm npm-install-$$.sh
  exit $ret
        echo "./configure $configures"
        echo "$configures" > npmrc
      fi) \
  && (if [ "$make" = "NOMAKE" ]; then
        (exit 0)
      elif "$make" uninstall install; then
        (exit 0)
      else
        make="NOMAKE"
      fi
      if [ "$make" = "NOMAKE" ]; then
        "$node" cli.js rm npm -gf
        "$node" cli.js install -gf
      fi) \
  && cd "$BACK" \
  && rm -rf "$TMP" \
  && echo "It worked"

ret=$?
if [ $ret -ne 0 ]; then
  echo "It failed" >&2
fi
exit $ret
