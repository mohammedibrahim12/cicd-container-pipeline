.PHONY: test lint build up down scan

test:
	npm test

lint:
	npm run lint

build:
	docker build -t cicd-pipeline-app:latest .

up:
	docker-compose up -d --build

down:
	docker-compose down

scan:
	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image cicd-pipeline-app:latest
