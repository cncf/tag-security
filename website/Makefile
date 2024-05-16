deps:
	git submodule update --init --recursive # TODO: the hugo theme doesn't need to live in this directory

	# Move select content from the root level into the website directory.
	rsync -avv ../ root/ \
	--include='assessments' --include='assessments/**' \
	--include='governance' --include='governance/**' \
	--include='supply-chain-security' --include='supply-chain-security/**' \
	--include='*.md' --exclude='*'

	# Move over content such as graphics and logos
	rsync -av '../design/' 'static/design/' --exclude='#*'

	# Update all imported markdown files to work as standalone hugo pages (except READMEs, see below)
	# sed command is configured for the Netlify ubuntu env
	find root -type f -name '*.md' | while IFS= read -r file; do \
		base_name=$$(basename "$$file" .md); \
		if [ "$$file" = "/_index.md" -o "$$base_name" = "README" ]; then \
			continue; \
		fi; \
		text_to_prepend="---\ntitle: \"$$base_name\"\n---\n"; \
		sed -i "1s/^/$$text_to_prepend/" "$$file"; \
	done

	# Set up Navbar and Sidebar contents
	# Add top level dirs to the navbar
	# Add all subdirectories to the sidebar
	# If a README is in the dir, copy its contents to the front page for that dir
	find root -type d -exec sh -c '\
		base_title=$$(basename "$$1"); \
		spaced_title=$$(echo "$$base_title" | sed "s/-/ /g" | tr "[:lower:]" "[:upper:]"); \
		title=$$(echo "$$spaced_title" | awk "{for(i=1; i<=NF; i++) \$$i = toupper(substr(\$$i, 1, 1)) tolower(substr(\$$i, 2)); print}"); \
		if [ $$1 = "root/$$base_title" ]; then \
			echo "---\ntitle: $$title\nmenu:\n  main:\n    weight: 20\n---" > "$$1/_index.md"; \
		else \
			echo "---\ntitle: $$title\n---" > "$$1/_index.md"; \
		fi; \
		echo "{{< include-markdown \"$$1/README.md\" >}}" >> "$$1/_index.md"; \
	' sh {} \;

	# Move everything but README files over to content dir
	# This excludes READMEs to avoid them being duplicated on the sidebar
	# Exclude any _index files that need customized in the `website/` in this rsync to avoid autogen overwrite
	rsync -avv --exclude='README.md' --exclude='/_index.md' root/ content/

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