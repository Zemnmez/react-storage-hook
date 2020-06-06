.PHONY: build deploy start

%/node_modules:
	cd $* && yarn

dist: src ./node_modules $(wildcard src/*) tsconfig.json 
	yarn tsc

example/build: example/node_modules $(wildcard src/*) $(wildcard example/src/*)
	cd example && yarn build

deploy: dist example/build
	cd example && yarn gh-pages --dist build

upgrade:
	cd example && yarn upgrade
	yarn upgrade && make -B example/build

start: example/node_modules dist
	cd example && yarn start