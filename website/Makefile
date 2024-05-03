deps:
	git submodule update --init --recursive
	rsync -av ../ root/ --include='assessments' --include='governance' --include='governance/related-groups' --include='supply-chain-security' --include='*.md' --exclude='*'
	rsync -av '../design/' 'static/design/' --exclude='#*'

	cd root/ && \
	find . -mindepth 2 -type f -name '*.md' | while IFS= read -r file; do \
		BASE_NAME=$$(basename "$$file" .md); \
		TEXT_TO_PREPEND="---\ntitle: \"$$BASE_NAME\"\n---\n"; \
		sed -i '' '1s/^/$(TEXT_TO_PREPEND)/' "$$file"; \
	done
	for dir in root/* ; do \
		if [ -d "$$dir" ]; then \
			base_name=$${dir%/}; \
			echo "---\ntitle: $$base_name\n---" > "$$dir/_index.md"; \
		fi; \
	done
	mv root/* content/

serve: deps
	hugo server \
		--disableFastRender \
		--buildDrafts \
		--buildFuture \
		--ignoreCache
		--printI18nWarnings \
		--printMemoryUsage \
		--printPathWarnings \
		--printUnusedTemplates \
		--templateMetrics \
		--templateMetricsHints \
		--gc

production-build: deps
	hugo \
		--minify
	npx -y pagefind --site public

preview-build: deps
	hugo \
		--baseURL $(DEPLOY_PRIME_URL) \
		--buildDrafts \
		--buildFuture \
		--minify
	npx -y pagefind --site public