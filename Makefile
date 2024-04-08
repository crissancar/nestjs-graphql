.PHONY = build deps migrations migrations_tests seeds seeds_tests start start_infrastructure

# Build project
build:
	npm run build

# Install dependencies
deps:
	npm install

# Run TypeOrm migrations
migrations:
	npm run typeorm:migration:run

# Run TypeOrm seeds
seeds:
	npm run typeorm:seed:run

# Start app in dev environment
start:
	npm run start:dev:swc

# Build and start infrastructure
start_infrastructure:
	npm run docker:env
