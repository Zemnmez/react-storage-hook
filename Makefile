.PHONY: build

build: src $(wildcard src/*) tsconfig.json
	tsc

