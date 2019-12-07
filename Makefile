.PHONY: build deploy

build: src $(wildcard src/*) tsconfig.json
	tsc

deploy: build example $(wildcard example/*)
	gh-pages --dist build
