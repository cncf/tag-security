.PHONY: all
all: setup lint spelling links

.PHONY: setup
setup:
	@echo "Running $@...\n\n"
	@docker-compose run setup ci/$@.sh
	@docker-compose down

.PHONY: lint
lint:
	@echo "Running $@...\n\n"
	@docker-compose run lint ci/$@.sh
	@docker-compose down

.PHONY: spelling
spelling:
	@echo "Running $@...\n\n"
	@docker-compose run spelling ci/$@.sh
	@docker-compose down

.PHONY: links
links:
	@echo "Running $@...\n\n"
	@docker-compose run links ci/$@.sh
	@docker-compose down