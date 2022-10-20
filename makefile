COMPOSE := docker-compose -f docker-compose.yaml

install: 
	${COMPOSE} run --rm app sh -c "npm install"

run:
	${COMPOSE} run --rm --service-ports app sh -c "npm run dev --watch"

build:
	${COMPOSE} run --rm app sh -c "npm run build"

lint: 
	${COMPOSE} run --rm app sh -c "npm run lint"

test: 
	${COMPOSE} run --rm app sh -c "npm run test"
