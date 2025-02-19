
docker run --rm \
             --volume "$(pwd):/data" \
	     --user $(id -u):$(id -g) \
	     pandoc/extra fuzzing-handbook.md \
	     -o handbook-fuzzing.pdf \
	     --template eisvogel --listings
