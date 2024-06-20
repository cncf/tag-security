.PHONY: all
all: setup lint spelling links

.PHONY: setup
setup:
	@echo "Running $@...\n\n"
	@docker-compose -f ci/docker-compose.yml run setup sh ci/setup.sh
	@docker-compose -f ci/docker-compose.yml down

.PHONY: lint
lint:
	@echo "Running $@...\n\n"
	@docker-compose -f ci/docker-compose.yml run lint sh ci/lint.sh
	@docker-compose -f ci/docker-compose.yml down

.PHONY: spelling
spelling:
	@echo "Running $@...\n\n"
	@docker-compose -f ci/docker-compose.yml run spelling sh ci/spelling.sh
	@docker-compose -f ci/docker-compose.yml down

.PHONY: links
links:
	@echo "Running $@...\n\n"
	@docker-compose -f ci/docker-compose.yml run links sh ci/links.sh
	@docker-compose -f ci/docker-compose.yml down
