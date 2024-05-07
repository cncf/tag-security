deps:
	rsync -av ../ content/ --include='assessments' --include='governance' --include='governance/related-groups' --include='supply-chain-security' --include='*.md' --exclude='*'
	rsync -av '../design/' 'static/design/' --exclude='#*'
	git submodule update --init --recursive

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