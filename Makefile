install:
	npm ci

develop:
	npx vite

lint:
	npx eslint --fix .

build:
	rm -rf dist
	NODE_ENV=production npx vite build

test:
	npx playwright test