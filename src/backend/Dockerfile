FROM node:20-alpine

LABEL name="backend-artigianato_online"

WORKDIR /app
COPY . .
RUN dirs=$(find /app -type d); \
for dir in $dirs; do \
    if [ -f "$dir/package.json" ] && [ "$dir" != "." ]; then \
        echo "Installing dependencies in $dir"; \
        cd "$dir" && npm install && cd - > /dev/null; \
    fi; \
done
EXPOSE 8000
CMD ["npm", "run", "start"]
