.PHONY: all
all: setup lint spelling links

.PHONY: setup
setup:
	@echo "Running $@...\n\n"
	@docker-compose run $@ ci/$@.sh || true
	@docker-compose down

.PHONY: lint
lint:
	@echo "Running $@...\n\n"
	@docker-compose run $@ ci/$@.sh || true
	@docker-compose down

.PHONY: spelling
spelling:
	@echo "Running $@...\n\n"
	@docker-compose run $@ ci/$@.sh || true
	@docker-compose down

.PHONY: links
links:
	@echo "Running $@...\n\n"
	@docker-compose run $@ ci/$@.sh || true
	@docker-compose down

