.PHONY: all
all: setup lint spelling links

.PHONY: setup
setup:
	@echo "Running $@...\n\n"
	@docker-compose -f docker-compose.yml run $@ bash setup.sh
	@docker-compose -f docker-compose.yml down

.PHONY: lint
lint:
	@echo "Running $@...\n\n"
	@docker-compose -f docker-compose.yml run $@ bash lint.sh
	@docker-compose -f docker-compose.yml down

.PHONY: spelling
spelling:
	@echo "Running $@...\n\n"
	@docker-compose -f docker-compose.yml run $@ bash spelling.sh
	@docker-compose -f docker-compose.yml down

.PHONY: links
links:
	@echo "Running $@...\n\n"
	@docker-compose -f docker-compose.yml run $@ bash links.sh
	@docker-compose -f docker-compose.yml down